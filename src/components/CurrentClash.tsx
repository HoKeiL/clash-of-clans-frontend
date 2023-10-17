import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { fetchAllPairings } from "../fetchAllTeams";
import { OrderOfPlayData } from "./TeamBuilderPage";

interface ReceivedOrderOfPlayData extends OrderOfPlayData {
    id: number;
}

export function CurrentClash(): JSX.Element {
    const [allPairs, setAllPairs] = useState<ReceivedOrderOfPlayData[]>([]);
    const [onlyPlayers, setOnlyPlayers] = useState<string[]>([]);
    function hadleShowAllPairings() {
        fetchAllPairings().then((uploadedPairs) => setAllPairs(uploadedPairs));
        const playersOnly = Object.values(allPairs[0]).slice(2);
        setOnlyPlayers(playersOnly);
        console.log("onlyPlayers " + onlyPlayers);
    }

    return (
        <div>
            <Heading>Current Clash</Heading>

            {allPairs.length > 0 && (
                <Box>
                    <Heading>{allPairs[0].teamname}</Heading>
                    {onlyPlayers.map((player, index) => (
                        <Text key={index}>{player}</Text>
                    ))}
                </Box>
            )}
            <Button onClick={hadleShowAllPairings}>show all pairings</Button>
        </div>
    );
}
