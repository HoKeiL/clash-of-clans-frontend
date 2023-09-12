import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Select,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ReceivedData } from "./Tabs";

export interface teamBuilderProps {
    teamOptions: ReceivedData[];
}

export function TeamBuilderPage({
    teamOptions,
}: teamBuilderProps): JSX.Element {
    const [chosenTeam, setChosenTeam] = useState<ReceivedData[]>();
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    function handleChosenTeam(event) {
        const value = parseInt(event.target.value);
        const team = teamOptions.filter((x) => x.id === value);
        const valueArray = Object.values(team[0]);
        const playersOnlyArray = valueArray.slice(2);
        setChosenTeam(team);
        setSelectedPlayers(playersOnlyArray);
    }

    function DisplaySelectedPlayers(): JSX.Element {
        return (
            <Select mt="0.5em" placeholder="Select player">
                {selectedPlayers.map((player, index) => {
                    return (
                        <option key={index} value={player}>
                            {player}
                        </option>
                    );
                })}
            </Select>
        );
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
                    <FormControl m="1em" pr="2em">
                        <FormLabel>First</FormLabel>
                        <DisplaySelectedPlayers />
                        <DisplaySelectedPlayers />
                        <FormLabel mt="1em">Second</FormLabel>
                        <DisplaySelectedPlayers />
                        <DisplaySelectedPlayers />
                        <FormLabel mt="1em">Third</FormLabel>
                        <DisplaySelectedPlayers />
                        <DisplaySelectedPlayers />
                        <FormLabel mt="1em">Forth</FormLabel>
                        <DisplaySelectedPlayers />
                        <DisplaySelectedPlayers />
                        <FormLabel mt="1em">Fifth</FormLabel>
                        <DisplaySelectedPlayers />
                        <DisplaySelectedPlayers />
                        <FormLabel mt="1em">Sixth</FormLabel>
                        <DisplaySelectedPlayers />
                        <DisplaySelectedPlayers />
                        <FormLabel mt="1em">Seventh</FormLabel>
                        <DisplaySelectedPlayers />
                        <DisplaySelectedPlayers />
                    </FormControl>
                    <Button ml="10em">Check my team</Button>
                </Box>
            )}
        </Container>
    );
}
