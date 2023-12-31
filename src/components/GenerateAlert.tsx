import { Alert, AlertIcon, Box } from "@chakra-ui/react";

interface GenerateAlertViewProp {
    isPassed: "success" | "error" | undefined;
    message: string | undefined;
    selectedPlayers: string[];
}
export function GenerateAlert({
    isPassed,
    message,
}: GenerateAlertViewProp): JSX.Element {
    return (
        <Box>
            <Alert minWidth={"30vw"} status={isPassed}>
                <AlertIcon />
                {message}
            </Alert>
        </Box>
    );
}
