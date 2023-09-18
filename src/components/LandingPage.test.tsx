import { render, screen } from "../testUtils/testUtils";
import { LandingPage } from "./LandingPage";

//An example of using react-testing-library
describe("LandingPage", async () => {
    test("Should have text Broken String Special Session: Clash of Clans on it", () => {
        render(<LandingPage />);
        const elem = screen.getByText(
            "Broken String Special Session: Clash of Clans"
        );
        expect(elem).toBeInTheDocument();
    });
});
