import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { ReceivedData } from "../Utils/interfaces";
import { CurrentClash } from "./CurrentClash";
import { ImportTeamsPage } from "./ImportTeamsPage";
import { LandingPage } from "./LandingPage";
import { TeamBuilderPage } from "./TeamBuilderPage";

export function TabsView(): JSX.Element {
    const [teamOptions, setTeamOptions] = useState<ReceivedData[]>([]);

    return (
        <Tabs size="lg" align="end" variant="unstyled">
            <TabList mr={"5rem"} pt={"1rem"}>
                <Tab mr={"5rem"}>Home</Tab>
                <Tab mr={"5rem"}>Import teams</Tab>
                <Tab mr={"5rem"}>Team Builder</Tab>
                <Tab mr={"5rem"}>Current Clash</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <LandingPage />
                </TabPanel>
                <TabPanel>
                    <ImportTeamsPage
                        teamOptions={teamOptions}
                        setTeamOptions={setTeamOptions}
                    />
                </TabPanel>
                <TabPanel>
                    <TeamBuilderPage teamOptions={teamOptions} />
                </TabPanel>
                <TabPanel>
                    <CurrentClash />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
