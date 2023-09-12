import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Button,
    Input,
    List,
    ListItem,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import axios from "axios";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { baseUrl } from "../Utils/baseURL";
import { ReceivedData } from "./Tabs";
import { fetchAllTeams } from "../fetchAllTeams";

interface Data {
    teamname: string;
    teamcaptain: string;
    teamplayer1: string;
    teamplayer2: string;
    teamplayer3: string;
    teamplayer4: string;
    teamplayer5: string;
    teamplayer6: string;
}
interface importTeamViewProps {
    teamOptions: ReceivedData[];
    setTeamOptions: React.Dispatch<React.SetStateAction<ReceivedData[]>>;
}

export function ImportTeamsPage({
    teamOptions,
    setTeamOptions,
}: importTeamViewProps): JSX.Element {
    //State to store table Column name
    const [tableRows, setTableRows] = useState<string[]>([]);
    //State to store the values
    const [values, setValues] = useState<string[]>([]);

    const [isClicked, setIsClicked] = useState(false);

    function handleUploadCSV(event) {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results: Papa.ParseResult<[Data]>) {
                const rowsArray: string[] = [];
                const valuesArray: string[] = [];

                // Iterating data to get column name and their values
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });

                // Filtered Column Names
                setTableRows(rowsArray[0]);

                // Filtered Values
                setValues(valuesArray);
            },
        });
    }

    useEffect(() => {
        fetchAllTeams().then((uploadedTeams) => setTeamOptions(uploadedTeams));
    }, [isClicked === true]);

    async function handleSumbitTeams() {
        setIsClicked(true);
        await addNewTeams();
        setIsClicked(false);
    }

    async function addNewTeams() {
        for (let i = 0; i < values.length; i++) {
            await axios.post(`${baseUrl}/teams`, generateTeams(i));
        }
    }
    function generateTeams(i: number) {
        return {
            teamname: values[i][0],
            teamcaptain: values[i][1],
            teamplayer1: values[i][2],
            teamplayer2: values[i][3],
            teamplayer3: values[i][4],
            teamplayer4: values[i][5],
            teamplayer5: values[i][6],
            teamplayer6: values[i][7],
        };
    }

    async function handleDeleteTeams() {
        setIsClicked(true);
        await deleteTeams();
        setIsClicked(false);
    }
    async function deleteTeams() {
        await axios.delete(`${baseUrl}/teams`);
    }

    return (
        <div>
            <Input
                type="file"
                accept=".csv"
                onChange={handleUploadCSV}
                margin={"1em"}
                variant="flushed"
            />
            {values.length > 0 && (
                <div>
                    <TableContainer marginTop={"1em"}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    {tableRows.map((rows, index) => {
                                        return <Th key={index}>{rows}</Th>;
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {values.map((value, index) => {
                                    return (
                                        <Tr key={index}>
                                            {value.map((rowValues, index) => {
                                                return (
                                                    <Td key={index}>
                                                        {rowValues}
                                                    </Td>
                                                );
                                            })}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Button
                        margin={"1em"}
                        rightIcon={<ArrowForwardIcon />}
                        onClick={handleSumbitTeams}
                        isLoading={isClicked}
                        loadingText={isClicked && "Submitting"}
                        variant={isClicked ? "outline" : "solid"}
                    >
                        Submit Teams
                    </Button>
                </div>
            )}
            <Text margin={"1em"}>Currently uploaded teams: </Text>
            <List margin={"1em"}>
                {teamOptions.map((team) => (
                    <ListItem key={team.id}>{team.teamname}</ListItem>
                ))}
            </List>
            {teamOptions.length > 0 && (
                <Button
                    margin={"1em"}
                    onClick={handleDeleteTeams}
                    isLoading={isClicked}
                    loadingText={isClicked && "Deleting"}
                    variant={isClicked ? "outline" : "solid"}
                >
                    Delete
                </Button>
            )}
        </div>
    );
}
