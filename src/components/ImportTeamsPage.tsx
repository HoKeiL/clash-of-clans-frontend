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
import { fetchAllTeams } from "../fetchAllTeams";
import { ReceivedData } from "./Tabs";

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
    const [columnName, setColumnName] = useState<string[]>([]);
    //State to store the values
    const [allTeams, setAllTeams] = useState<string[]>([]);

    const [isClicked, setIsClicked] = useState(false);

    function handleUploadCSV(event) {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results: Papa.ParseResult<[Data]>) {
                const columnNameArray: string[] = [];
                const teamsArray: string[] = [];

                // Iterating data to get column name and their values
                results.data.map((d) => {
                    columnNameArray.push(Object.keys(d));
                    teamsArray.push(Object.values(d));
                });

                // Filtered Column Names
                setColumnName(columnNameArray[0]);

                // Filtered Values
                setAllTeams(teamsArray);
            },
        });
    }

    useEffect(() => {
        fetchAllTeams().then((uploadedTeams) => setTeamOptions(uploadedTeams));
    }, [isClicked === true, setTeamOptions]);

    async function handleSumbitAllTeam() {
        setIsClicked(true);
        for (let i = 0; i < allTeams.length; i++) {
            await axios.post(`${baseUrl}/teams`, generateTeam(i));
        }
        setIsClicked(false);
    }

    function generateTeam(i: number) {
        return {
            teamname: allTeams[i][0],
            teamcaptain: allTeams[i][1],
            teamplayer1: allTeams[i][2],
            teamplayer2: allTeams[i][3],
            teamplayer3: allTeams[i][4],
            teamplayer4: allTeams[i][5],
            teamplayer5: allTeams[i][6],
            teamplayer6: allTeams[i][7],
        };
    }

    async function handleDeleteAllTeams() {
        setIsClicked(true);
        await axios.delete(`${baseUrl}/teams`);
        setIsClicked(false);
    }
    return (
        <div>
            <Input
                type="file"
                accept=".csv"
                onChange={() => handleUploadCSV}
                margin={"1em"}
                variant="flushed"
            />
            {allTeams.length > 0 && (
                <div>
                    <TableContainer marginTop={"1em"}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    {columnName.map((rows, index) => {
                                        return <Th key={index}>{rows}</Th>;
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {allTeams.map((value, index) => {
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
                        onClick={() => handleSumbitAllTeam}
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
                    onClick={() => handleDeleteAllTeams}
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
