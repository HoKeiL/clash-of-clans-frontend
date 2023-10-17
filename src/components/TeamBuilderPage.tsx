import {
    Box,
    Button,
    Container,
    Divider,
    Heading,
    ListItem,
    OrderedList,
    Select,
    Stack,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";
import { ReceivedData } from "../Utils/interfaces";
import {
    DisplayTeamPlayers,
    getChunkedArray,
    Player,
} from "./DisplayTeamPlayers";
import { GenerateAlert } from "./GenerateAlert";

export type AlertMessages =
    | "error! Please fill in all pairings"
    | "Please check if all players have been selected less than 3 times"
    | "Please check if all players have been selected more than 2 times"
    | "Please check all pairings are unique"
    | "Please check if all individual pairing is unique"
    | "success ";

export interface teamBuilderProps {
    teamOptions: ReceivedData[];
}

export function TeamBuilderPage({
    teamOptions,
}: teamBuilderProps): JSX.Element {
    const [chosenTeam, setChosenTeam] = useState<ReceivedData[]>();
    const [teamPlayers, setTeamPlayers] = useState<string[]>([]);
    const [selectedPlayers, setSelectedPlayers] = useState<(Player | "")[]>(
        createInitialEmptyPair(7)
    );
    const [isPassed, setIsPassed] = useState<"success" | "error" | undefined>();
    const [alertMessage, setAlertMessage] = useState<
        AlertMessages | undefined
    >();

    function createInitialEmptyPair(numOfTeamPlayers: number): string[] {
        const initialArray = [];
        for (let i = 0; i < numOfTeamPlayers * 2; i++) {
            initialArray.push("");
        }
        return initialArray;
    }

    function handleChosenTeam(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value);
        const team = teamOptions.filter((x) => x.id === value);
        const playersOnlyArray = Object.values(team[0]).slice(2);

        setChosenTeam(team);
        setTeamPlayers(playersOnlyArray);
    }

    return (
        <Container minHeight={"100vh"} minWidth={"100vw"}>
            <Select
                width={"62vw"}
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
            {chosenTeam && (
                <Box>
                    <Stack direction={["column", "row"]} spacing="24px">
                        <Box
                            mt="1em"
                            ml={"auto"}
                            p="1em"
                            textAlign={"left"}
                            borderRadius="16px"
                            border="1px"
                            borderColor="black"
                            minWidth={"30vw"}
                        >
                            <Text m="1em">Team: {chosenTeam[0].teamname}</Text>
                            <Text m="1em">
                                Team Captain: {chosenTeam[0].teamcaptain}{" "}
                            </Text>
                            <Divider
                                mt="1em"
                                mb="1em"
                                orientation="horizontal"
                            />
                            <Heading fontSize={"lg"} textAlign="center">
                                Order of play
                            </Heading>

                            <DisplayTeamPlayers
                                teamPlayers={teamPlayers}
                                setIsPassed={setIsPassed}
                                setAlertMessage={setAlertMessage}
                                selectedPlayers={selectedPlayers}
                                setSelectedPlayers={setSelectedPlayers}
                            />
                        </Box>
                        <Box
                            mt="auto"
                            mb="1em"
                            mr={"auto"}
                            textAlign={"left"}
                            alignItems={"flex-end"}
                        >
                            <Heading fontSize={"x-large"} pl={"0.5em"}>
                                Rules:{" "}
                            </Heading>
                            <UnorderedList mt={"1em"} mb={"1em"} pl={"1em"}>
                                <ListItem pl={"1em"}>
                                    All pairings must be filled
                                </ListItem>
                                <ListItem pl={"1em"}>
                                    All players must play at least 2 games
                                </ListItem>
                                <ListItem pl={"1em"}>
                                    No players can play more then 3 games
                                </ListItem>
                                <ListItem pl={"1em"}>
                                    Same pairing can only play once in each
                                    clans
                                </ListItem>
                            </UnorderedList>
                            {isPassed === "error" && (
                                <GenerateAlert
                                    isPassed={isPassed}
                                    message={alertMessage}
                                    selectedPlayers={selectedPlayers}
                                />
                            )}
                            {isPassed === "success" && (
                                <>
                                    <GenerateAlert
                                        isPassed={isPassed}
                                        message={alertMessage}
                                        selectedPlayers={selectedPlayers}
                                    />
                                    <OrderedList mt={"1em"} pl={"1em"}>
                                        {getChunkedArray(selectedPlayers).map(
                                            (eachPair, index) => {
                                                return (
                                                    <ListItem
                                                        pl={"1em"}
                                                        key={index}
                                                    >
                                                        {eachPair + ""}{" "}
                                                    </ListItem>
                                                );
                                            }
                                        )}
                                    </OrderedList>
                                    <Button mt="1em" mb="0.5em">
                                        Ready to submit
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Stack>
                </Box>
            )}
        </Container>
    );
}
