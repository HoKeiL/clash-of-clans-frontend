import {
    Box,
    Container,
    Heading,
    Image,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

export function LandingPage(): JSX.Element {
    return (
        <Container
            minWidth={"100vw"}
            minHeight={"100vh"}
            p={"8rem"}
            bg={"#FBFEFD"}
        >
            <Wrap justify="center">
                <WrapItem>
                    <Box w="100%" h="400px" textAlign="left" paddingLeft="2em">
                        <Heading as="h1" size="4xl" mt="2em">
                            Welcome
                        </Heading>
                        <Text as="h2" fontSize="2xl" mt="1em">
                            Broken String Special Session: Clash of Clans
                        </Text>
                    </Box>
                </WrapItem>
                <WrapItem>
                    <Box w="100%" h="400px" ml={"1rem"} pt={"2rem"}>
                        <Image
                            borderRadius={"16px"}
                            shadow={"md"}
                            src="https://secure.meetupstatic.com/photos/event/9/f/3/8/600_514780760.webp?w=384
"
                            alt="Clash of Clans Logo"
                        />
                    </Box>
                </WrapItem>
            </Wrap>
        </Container>
    );
}
