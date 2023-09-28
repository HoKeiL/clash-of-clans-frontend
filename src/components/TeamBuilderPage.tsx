import { Box, Container, Divider, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ReceivedData } from "../Utils/interfaces";
import { DisplayTeamPlayers } from "./DisplayTeamPlayers";

export interface teamBuilderProps {
    teamOptions: ReceivedData[];
}

export function TeamBuilderPage(props: teamBuilderProps): JSX.Element {
    const { teamOptions } = props;
    const [chosenTeam, setChosenTeam] = useState<ReceivedData[]>();
    const [teamPlayers, setTeamPlayers] = useState<string[]>([]);

    function handleChosenTeam(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value);
        const team = teamOptions.filter((x) => x.id === value);
        const playersOnlyArray = Object.values(team[0]).slice(2);

        setChosenTeam(team);
        setTeamPlayers(playersOnlyArray);
    }

    return (
        <Container minWidth={"100vw"} minHeight={"100vh"} bg={"#FBFEFD"}>
            <Box>
                <Select
                    m={"1em auto"}
                    placeholder="Select teams"
                    onChange={(event) => {
                        handleChosenTeam(event);
                    }}
                >
                    {teamOptions.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.teamname}
                        </option>
                    ))}
                </Select>
            </Box>
            {chosenTeam && (
                <Box
                    mt="1em"
                    p="1em"
                    border="1px"
                    borderRadius="16px"
                    borderColor="black"
                >
                    <Text m="1em">Team: {chosenTeam[0].teamname}</Text>
                    <Text m="1em">
                        Team Captain: {chosenTeam[0].teamcaptain}{" "}
                    </Text>
                    <Divider mt="1em" mb="1em" orientation="horizontal" />
                    <Text textAlign="center">Order of play</Text>

                    <DisplayTeamPlayers teamPlayers={teamPlayers} />
                </Box>
            )}
        </Container>
    );
}
