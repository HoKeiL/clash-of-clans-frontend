import {
    Box,
    Button,
    Container,
    Divider,
    Select,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { DisplayTeamPlayers } from "./DisplayTeamPlayers";
import { ReceivedData } from "./Tabs";

interface teamBuilderProps {
    teamOptions: ReceivedData[];
}

export function TeamBuilderPage({
    teamOptions,
}: teamBuilderProps): JSX.Element {
    const [chosenTeam, setChosenTeam] = useState<ReceivedData[]>();
    const [teamPlayers, setTeamPlayers] = useState<string[]>([]);

    function handleChosenTeam(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value);
        const team = teamOptions.filter((x) => x.id === value);
        const valueArray = Object.values(team[0]);
        const playersOnlyArray = valueArray.slice(2);
        setChosenTeam(team);
        setTeamPlayers(playersOnlyArray);
    }

    return (
        <Container>
            <Box>
                <Select
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
                    <DisplayTeamPlayers teamPlayers={teamPlayers} />
                    <DisplayTeamPlayers teamPlayers={teamPlayers} />
                    <DisplayTeamPlayers teamPlayers={teamPlayers} />
                    <DisplayTeamPlayers teamPlayers={teamPlayers} />
                    <DisplayTeamPlayers teamPlayers={teamPlayers} />
                    <DisplayTeamPlayers teamPlayers={teamPlayers} />

                    <Button ml="10em">Check my team</Button>
                </Box>
            )}
        </Container>
    );
}
