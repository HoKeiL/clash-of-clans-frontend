import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ChakraProvider>
        <App />
    </ChakraProvider>
);
