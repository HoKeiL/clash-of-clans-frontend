import { Box, Button } from "@chakra-ui/react";
import { PlayerSelect } from "./PlayerSelect";
import { AlertMessages } from "./TeamBuilderPage";

export type Player = string;
interface DisplayTeamPlayerProps {
    teamPlayers: string[];
    setIsPassed: React.Dispatch<
        React.SetStateAction<"error" | "success" | undefined>
    >;
    setAlertMessage: React.Dispatch<
        React.SetStateAction<AlertMessages | undefined>
    >;
    selectedPlayers: string[];
    setSelectedPlayers: React.Dispatch<React.SetStateAction<string[]>>;
}

export function DisplayTeamPlayers({
    teamPlayers,
    setIsPassed,
    setAlertMessage,
    selectedPlayers,
    setSelectedPlayers,
}: DisplayTeamPlayerProps): JSX.Element {
    function handleSelectPlayer(p: Player | "", givenPos: number) {
        setSelectedPlayers((prev) =>
            prev.map((other, ix) => (givenPos === ix ? p : other))
        );
    }
    function handleSubmitOrderOfPlay() {
        if (checkAllSelected(selectedPlayers) === false) {
            setIsPassed("error");
            setAlertMessage("error! Please fill in all pairings");
        } else if (
            isIndividualPairingUnique(getChunkedArray(selectedPlayers)) ===
            false
        ) {
            setIsPassed("error");
            setAlertMessage("Please check if all individual pairing is unique");
        } else if (
            checkPlayerSelectionAtLeastTwice(selectedPlayers) === false
        ) {
            setIsPassed("error");
            setAlertMessage(
                "Please check if all players have been selected more than 2 times"
            );
        } else if (
            checkPlayerSelectionLessThan3Times(selectedPlayers) === false
        ) {
            setIsPassed("error");
            setAlertMessage(
                "Please check if all players have been selected less than 3 times"
            );
        } else if (
            isPlayerPairingUnique(getChunkedArray(selectedPlayers)) === false
        ) {
            setIsPassed("error");
            setAlertMessage("Please check all pairings are unique");
        } else {
            setIsPassed("success");
            setAlertMessage("success ");
        }
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
        </Box>
    );
}

// modify below function to check rules for team selection

//below checks: if all pairings have been filled
function checkAllSelected(arr: string[]): boolean {
    if (arr.some((p) => p === "")) return false;
    else return true;
}
//below checks: each player can not play more than 3 games

function checkPlayerSelectionLessThan3Times(arr: string[]): boolean {
    // Create an object to store the count of each value in the array
    const valueCount: { [x: string]: number } = {};

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

    if (selectedMoreThan3TimesArray.length > 0) {
        console.log(
            "player selected for more than 3 times: " +
                selectedMoreThan3TimesArray.filter(
                    (value, index) =>
                        selectedMoreThan3TimesArray.indexOf(value) === index
                )
        );
        return false;
    } else {
        return true;
    }
}

//below checks: each player player least 2 games
function checkPlayerSelectionAtLeastTwice(arr: string[]): boolean {
    // Create an object to store the count of each value in the array
    const valueCount: { [x: string]: number } = {};

    // Count the occurrences of each value in the array
    arr.forEach((value) => {
        if (valueCount[value]) {
            valueCount[value]++;
        } else {
            valueCount[value] = 1;
        }
    });
    const selectedLessThanTwiceArray = arr.filter(
        (value) => valueCount[value] < 2
    );

    if (selectedLessThanTwiceArray.length > 0) {
        console.log(
            "player has not selected at least twice: " +
                selectedLessThanTwiceArray
        );
        return false;
    } else {
        return true;
    }
}

//below checks: same pair can not play twice

export function getChunkedArray(arr: string[]): string[][] {
    const chunkSize = 2;
    const newChunk = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        newChunk.push(chunk);
    }
    console.log("After Chunk: ", newChunk);

    return newChunk;
}
function isIndividualPairingUnique(arr: string[][]): boolean {
    let result = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] !== arr[i][1]) result = true;
        else return false;
    }
    return result;
}

function isPlayerPairingUnique(arr: string[][]): boolean {
    let a: string[];
    let b: string[];
    let result = false;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            a = arr[i];
            b = arr[j];
            if (checkUniquePairings(a, b)) result = true;
            else return result;
        }
    }
    return result;
}

function checkUniquePairings(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    const elements = new Set([...a, ...b]);
    for (const x of elements) {
        const count1 = a.filter((e) => e === x).length;
        const count2 = b.filter((e) => e === x).length;
        if (count1 !== count2) return true;
    }
    return false;
}
