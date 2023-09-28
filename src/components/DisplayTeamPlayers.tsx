import React, { useState } from "react";
import { PlayerSelect } from "./PlayerSelect";
import { Button } from "@chakra-ui/react";

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
    function handleSelectPlayer(p: Player | "", givenPos: number) {
        setSelectedPlayers((prev) =>
            prev.map((other, ix) => (givenPos === ix ? p : other))
        );
    }
    function handleSubmitOrderOfPlay() {
        console.log("handleSubmitOrderOfPlay");
        if (selectedPlayers.some((p) => p === "")) {
            alert("some slots have not been selected");
        } else {
            alert("OK - would submit here: " + JSON.stringify(selectedPlayers));
        }
    }

    function createInitialEmptyPair(numOfTeamPlayers: number): string[] {
        const initialArray = [];
        for (let i = 0; i < numOfTeamPlayers; i++) {
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
        <div>
            {pairIndices.map(([i, j], gameIx) => (
                <React.Fragment key={gameIx}>
                    {"Game: " + (gameIx + 1)}
                    {[i, j].map((index) => (
                        <PlayerSelect
                            key={index}
                            handleSelectPlayer={(player: Player | "") =>
                                handleSelectPlayer(player, index)
                            }
                            selectedPlayer={selectedPlayers[index]}
                            remainingPlayers={subtract(
                                teamPlayers,
                                selectedPlayers
                            )}
                        />
                    ))}
                </React.Fragment>
            ))}
            <Button ml="10em" onClick={handleSubmitOrderOfPlay}>
                Check my team
            </Button>
        </div>
    );
}

// modify below function to check rules for team selection
//same pair can not pley twice
//each player can not play more than 3 games
//each player playat least 2 games
function subtract(arr1: string[], arr2: string[]): string[] {
    return arr1.filter((a1) => !arr2.includes(a1));
}
