import { Select } from "@chakra-ui/react";
import { ReceivedData } from "./Tabs";

export interface teamBuilderProps {
    teamOptions: ReceivedData[];
}

export function TeamBuilderPage({
    teamOptions,
}: teamBuilderProps): JSX.Element {
    return (
        <div>
            <Select placeholder="Select teams">
                {teamOptions.map((team) => (
                    <option key={team.id} value={`option${team.id}`}>
                        {team.teamname}
                    </option>
                ))}
            </Select>
        </div>
    );
}
