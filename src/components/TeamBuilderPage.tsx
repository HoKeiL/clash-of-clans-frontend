import { Select } from "@chakra-ui/react";
export function TeamBuilderPage(): JSX.Element {
    return (
        <div>
            <Select>
                <option value="option1">Team 1</option>
                <option value="option2">Team 2</option>
                <option value="option3">Team 3</option>
                <option value="option4">Team 4</option>
            </Select>
        </div>
    );
}
