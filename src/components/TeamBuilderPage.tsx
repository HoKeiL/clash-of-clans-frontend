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
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../Utils/baseURL";
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

export interface OrderOfPlayData {
    teamname: string;
    game1Player1: string;
    game1Player2: string;
    game2Player1: string;
    game2Player2: string;
    game3Player1: string;
    game3Player2: string;
    game4Player1: string;
    game4Player2: string;
    game5Player1: string;
    game5Player2: string;
    game6Player1: string;
    game6Player2: string;
    game7Player1: string;
    game7Player2: string;
}

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
    const [isClicked, setIsClicked] = useState(false);

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
        setSelectedPlayers(createInitialEmptyPair(7));
        setIsPassed(undefined);
        setAlertMessage(undefined);
    }

    async function handleSubmitOrderOfPlay() {
        console.log(
            " chosenTeam " +
                chosenTeam![0].teamname +
                " selected Pairings: " +
                selectedPlayers
        );
        setIsClicked(true);
        const dataObject: OrderOfPlayData = {
            teamname: chosenTeam![0].teamname,
            game1Player1: selectedPlayers[0],
            game1Player2: selectedPlayers[1],
            game2Player1: selectedPlayers[2],
            game2Player2: selectedPlayers[3],
            game3Player1: selectedPlayers[4],
            game3Player2: selectedPlayers[5],
            game4Player1: selectedPlayers[6],
            game4Player2: selectedPlayers[7],
            game5Player1: selectedPlayers[8],
            game5Player2: selectedPlayers[9],
            game6Player1: selectedPlayers[10],
            game6Player2: selectedPlayers[11],
            game7Player1: selectedPlayers[12],
            game7Player2: selectedPlayers[13],
        };
        await axios.post(`${baseUrl}/orderOfPlay`, dataObject);
        console.log("posted");

        setIsClicked(false);
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
                                    <Button
                                        mt="1em"
                                        mb="0.5em"
                                        onClick={handleSubmitOrderOfPlay}
                                        isLoading={isClicked}
                                    >
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
