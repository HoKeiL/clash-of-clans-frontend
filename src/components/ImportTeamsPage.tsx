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
import { useState } from "react";
import { fetchAllTeams } from "../fetchAllTeams";
import { baseUrl } from "../Utils/baseURL";
import { Data, ReceivedData } from "../Utils/interfaces";

interface importTeamViewProps {
    teamOptions: ReceivedData[];
    setTeamOptions: React.Dispatch<React.SetStateAction<ReceivedData[]>>;
}

export function ImportTeamsPage({
    teamOptions,
    setTeamOptions,
}: importTeamViewProps): JSX.Element {
    //State to store table Column name
    const [allTeams, setAllteams] = useState<[Data][]>([]);
    const [columnName, setColumnName] = useState<string[] | [Data]>([]);

    const [isClicked, setIsClicked] = useState(false);

    function handleUploadCSV(e: React.ChangeEvent<HTMLInputElement>) {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        const file = e.target.files![0];
        Papa.parse(file, {
            complete: function (results: Papa.ParseResult<[Data]>) {
                setAllteams(results.data.slice(1));
                console.log("Data: " + results.data[0]);

                setColumnName(results.data[0]);
            },
        });
    }

    async function handleSumbitAllTeam() {
        setIsClicked(true);
        for (let i = 0; i < allTeams.length; i++) {
            await axios.post(`${baseUrl}/teams`, generateTeam(i));
            console.log("posted");
            fetchAllTeams().then((uploadedTeams) =>
                setTeamOptions(uploadedTeams)
            );
        }
        setIsClicked(false);
    }

    function generateTeam(i: number) {
        const eachTeamArray = allTeams[i].map((element) => element);
        const dataObject = {
            teamname: eachTeamArray[0],
            teamcaptain: eachTeamArray[1],
            teamplayer1: eachTeamArray[2],
            teamplayer2: eachTeamArray[3],
            teamplayer3: eachTeamArray[4],
            teamplayer4: eachTeamArray[5],
            teamplayer5: eachTeamArray[6],
            teamplayer6: eachTeamArray[7],
        };
        return dataObject;
    }

    async function handleDeleteAllTeams() {
        setIsClicked(true);
        await axios.delete(`${baseUrl}/teams`);
        fetchAllTeams().then((uploadedTeams) => setTeamOptions(uploadedTeams));
        console.log("delete button clicked");
        setIsClicked(false);
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
            <div>
                <TableContainer marginTop={"1em"}>
                    <Table>
                        <Thead>
                            {columnName.map((eachColumnName, index) => (
                                <Th key={index}>{eachColumnName}</Th>
                            ))}
                        </Thead>
                        <Tbody>
                            {allTeams.map((eachTeam, index) => (
                                <Tr key={index}>
                                    {eachTeam.map((value, index) => (
                                        <Td key={index}>{value}</Td>
                                    ))}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Button
                    margin={"1em"}
                    rightIcon={<ArrowForwardIcon />}
                    onClick={handleSumbitAllTeam}
                    isLoading={isClicked}
                    loadingText={isClicked && "Submitting"}
                    variant={isClicked ? "outline" : "solid"}
                    isDisabled={teamOptions.length > 0}
                >
                    Submit Teams
                </Button>
            </div>
            <Text margin={"1em"}>Currently uploaded teams: </Text>
            <List margin={"1em"}>
                {teamOptions.map((team) => (
                    <ListItem key={team.id}>{team.teamname}</ListItem>
                ))}
            </List>
            {teamOptions.length > 0 && (
                <Button
                    margin={"1em"}
                    onClick={handleDeleteAllTeams}
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
