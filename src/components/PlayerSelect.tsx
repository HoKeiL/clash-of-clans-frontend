import { Player } from "./DisplayTeamPlayers";
import { Select } from "@chakra-ui/react";

export function PlayerSelect({
    handleSelectPlayer,
    selectedPlayer,
    remainingPlayers,
}: {
    handleSelectPlayer: (p: Player) => void;
    selectedPlayer: undefined | Player;
    remainingPlayers: (Player | "")[];
}) {
    const sortedPlayers = [...remainingPlayers].sort();
    return (
        <Select
            m={"0.5em"}
            value={selectedPlayer}
            onChange={(event) => handleSelectPlayer(event.target.value)}
            placeholder="Select player"
        >
            {sortedPlayers.map((p) => (
                <option key={p} value={p}>
                    {p}
                </option>
            ))}
        </Select>
    );
}
