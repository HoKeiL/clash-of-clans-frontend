import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { LandingPage } from "./LandingPage";
import { TeamBuilderPage } from "./TeamBuilderPage";
import { ImportTeamsPage } from "./ImportTeamsPage";

export function TabsView(): JSX.Element {
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>Home</Tab>
                    <Tab>Import teams</Tab>
                    <Tab>Team Builder</Tab>
                    <Tab>Current Clash</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <LandingPage />
                    </TabPanel>
                    <TabPanel>
                        <ImportTeamsPage />
                    </TabPanel>
                    <TabPanel>
                        <TeamBuilderPage />
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
