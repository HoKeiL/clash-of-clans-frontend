import { Box, Button, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { fetchAllPairings } from "../fetchAllTeams";
import { baseUrl } from "../Utils/baseURL";
import { getChunkedArray } from "./DisplayTeamPlayers";
import { OrderOfPlayData } from "./TeamBuilderPage";

interface ReceivedOrderOfPlayData extends OrderOfPlayData {
    id: number;
}

export function CurrentClash(): JSX.Element {
    const [allPairs, setAllPairs] = useState<ReceivedOrderOfPlayData[]>([]);
    const [onlyPlayers, setOnlyPlayers] = useState<string[][]>([]);

    function handleFetchAllPairings() {
        fetchAllPairings().then((uploadedPairs) => setAllPairs(uploadedPairs));
    }

    function getOnlyPlayersArray(arr: ReceivedOrderOfPlayData) {
        const playersOnly = Object.values(arr).slice(2);
        const plyerPairing = getChunkedArray(playersOnly);
        setOnlyPlayers(plyerPairing);
        console.log("onlyPlayers " + onlyPlayers);
    }
    function handleViewAllPairings() {
        getOnlyPlayersArray(allPairs[0]);
    }

    async function handleDeleteAllPairings() {
        await axios.delete(`${baseUrl}/orderOfPlay`);
        handleFetchAllPairings();
    }

    return (
        <Box textAlign={"left"}>
            <Heading>Current Submited Pairings</Heading>

            {allPairs.length > 0 && (
                <Box mt={"1em"} ml={"1em"}>
                    <Heading fontSize={"xl"}>
                        {allPairs[0].teamname.toLocaleUpperCase()}
                    </Heading>
                    {onlyPlayers.map((player, index) => (
                        <Text key={index}>{`Game ${
                            index + 1
                        }: ${player}`}</Text>
                    ))}
                    <Button mt={"1em"} onClick={handleViewAllPairings}>
                        View
                    </Button>
                </Box>
            )}
            <Button mt={"1em"} ml={"1em"} onClick={handleFetchAllPairings}>
                Fetch
            </Button>
            <Button mt={"1em"} ml={"1em"} onClick={handleDeleteAllPairings}>
                Delete All
            </Button>
        </Box>
    );
}
