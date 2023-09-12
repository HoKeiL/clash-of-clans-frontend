import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { LandingPage } from "./LandingPage";
import { TeamBuilderPage } from "./TeamBuilderPage";
import { ImportTeamsPage } from "./ImportTeamsPage";
import { useState } from "react";
export interface ReceivedData {
    id: number;
    teamname: string;
    teamcaptain: string;
    teamplayer1: string;
    teamplayer2: string;
    teamplayer3: string;
    teamplayer4: string;
    teamplayer5: string;
    teamplayer6: string;
}

export function TabsView(): JSX.Element {
    const [teamOptions, setTeamOptions] = useState<ReceivedData[]>([]);

    return (
        <div>
            <Tabs size="md">
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
                        <ImportTeamsPage
                            teamOptions={teamOptions}
                            setTeamOptions={setTeamOptions}
                        />
                    </TabPanel>
                    <TabPanel>
                        <TeamBuilderPage teamOptions={teamOptions} />
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
