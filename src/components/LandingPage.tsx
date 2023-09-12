import {
    Box,
    Button,
    Heading,
    Image,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

export function LandingPage(): JSX.Element {
    return (
        <Wrap justify="center">
            <WrapItem>
                <Box
                    w="100%"
                    h="400px"
                    textAlign="left"
                    // border="1px"
                    // borderColor="black"
                    paddingLeft="2em"
                >
                    <Heading as="h1" size="4xl" mt="2em">
                        Welcome
                    </Heading>
                    <Text as="h2" fontSize="lg" mt="1em">
                        Broken String Special Session: Clash of Clans
                    </Text>
                    <Button mt="24px"> Let's go</Button>
                </Box>
            </WrapItem>
            <WrapItem>
                <Box
                    w="100%"
                    h="400px"
                    // border="1px"
                    // borderColor="black"
                >
                    <Image
                        src="https://secure.meetupstatic.com/photos/event/9/f/3/8/600_514780760.webp?w=384
"
                        alt="Clash of Clans Logo"
                    />
                </Box>
            </WrapItem>
        </Wrap>
    );
}
