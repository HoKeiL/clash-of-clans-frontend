import { Player } from "./DisplayTeamPlayers";
import { Select } from "@chakra-ui/react";

export function PlayerSelect({
    handleSelectPlayer,
    selectedPlayer,
    remainingPlayers,
}: {
    handleSelectPlayer: (p: Player) => void;
    selectedPlayer: null | Player;
    remainingPlayers: (Player | "")[];
}) {
    const sortedPlayers = [...remainingPlayers, selectedPlayer].sort();
    return (
        <div>
            <Select
                m={"0.5em"}
                w={"50%"}
                value={selectedPlayer}
                onChange={(ev) => handleSelectPlayer(ev.target.value)}
            >
                <option value={""}> - </option>
                {sortedPlayers.map((p) => (
                    <option key={p} value={p}>
                        {p}
                    </option>
                ))}
            </Select>
        </div>
    );
}
