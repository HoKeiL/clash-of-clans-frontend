import { Alert, AlertIcon, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { PlayerSelect } from "./PlayerSelect";

export type Player = string;
interface DisplayTeamPlayerProps {
    teamPlayers: string[];
}
export function DisplayTeamPlayers({
    teamPlayers,
}: DisplayTeamPlayerProps): JSX.Element {
    const [selectedPlayers, setSelectedPlayers] = useState<(Player | "")[]>(
        createInitialEmptyPair(7)
    );
    const [isPassed, setIsPassed] = useState<"success" | "error">();
    function handleSelectPlayer(p: Player | "", givenPos: number) {
        setSelectedPlayers((prev) =>
            prev.map((other, ix) => (givenPos === ix ? p : other))
        );
    }
    function handleSubmitOrderOfPlay() {
        if (
            selectedPlayers.some((p) => p === "") ||
            checkPlayerSelection(selectedPlayers) === false
        ) {
            setIsPassed("error");
            console.log("error");
        } else {
            setIsPassed("success");
            console.log("success");
        }
    }

    function createInitialEmptyPair(numOfTeamPlayers: number): string[] {
        const initialArray = [];
        for (let i = 0; i < numOfTeamPlayers * 2; i++) {
            initialArray.push("");
        }
        return initialArray;
    }
    const pairIndices = [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9],
        [10, 11],
        [12, 13],
    ];

    return (
        <Box>
            {pairIndices.map(([i, j], gameIx) => (
                <Box m={"1rem"} key={gameIx}>
                    {"Game: " + (gameIx + 1)}
                    {[i, j].map((index) => (
                        <PlayerSelect
                            key={index}
                            handleSelectPlayer={(player: Player | "") =>
                                handleSelectPlayer(player, index)
                            }
                            selectedPlayer={selectedPlayers[index]}
                            remainingPlayers={teamPlayers}
                        />
                    ))}
                </Box>
            ))}
            <Button
                display={"block"}
                m={"0.5em auto"}
                onClick={handleSubmitOrderOfPlay}
            >
                Check my team
            </Button>
            {isPassed === "error" && (
                <Alert status="error">
                    <AlertIcon />
                    Please fill in all pairings!
                </Alert>
            )}
            {isPassed === "success" && (
                <Alert status="success">
                    <AlertIcon />
                    Will submit the following! {JSON.stringify(selectedPlayers)}
                </Alert>
            )}
        </Box>
    );
}

// modify below function to check rules for team selection
//same pair can not play twice
//each player can not play more than 3 games
//each player player least 2 games
// function subtract(arr1: string[], arr2: string[]): string[] {
//     return arr1.filter((a1) => !arr2.includes(a1));
// }

function checkPlayerSelection(arr: string[]): boolean {
    // Create an object to store the count of each value in the array
    let valueCount: { [x: string]: number };

    // Count the occurrences of each value in the array
    arr.forEach((value) => {
        if (valueCount[value]) {
            valueCount[value]++;
        } else {
            valueCount[value] = 1;
        }
    });
    const selectedMoreThan3TimesArray = arr.filter(
        (value) => valueCount[value] > 3
    );
    const selectedAtLeastTwiceArray = arr.filter(
        (value) => valueCount[value] < 2
    );

    if (selectedMoreThan3TimesArray.length > 0) {
        console.log(
            "player selected for more than 3 times: " +
                selectedMoreThan3TimesArray.filter(
                    (value, index) =>
                        selectedMoreThan3TimesArray.indexOf(value) === index
                )
        );
        return false;
    } else if (selectedAtLeastTwiceArray.length > 0) {
        console.log(
            "player has not selected at least twice: " +
                selectedAtLeastTwiceArray
        );
        return false;
    } else {
        return true;
    }
}

// function checkDuplicatePairings(arr: string[]): boolean {
//     const chunkSize = 2;
//     const newChunk = [];
//     for (let i = 0; i < arr.length; i += chunkSize) {
//         const chunk = arr.slice(i, i + chunkSize);
//         newChunk.push(chunk);
//     }

//     console.log("After Chunk: ", newChunk);
// }
