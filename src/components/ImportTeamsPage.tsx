import {
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import Papa from "papaparse";
import { SetStateAction, useState } from "react";

interface Data {
    TeamName: string;
    TeamCaptain: string;
    Player1: string;
    Player2: string;
    Player3: string;
    Player4: string;
    Player5: string;
    Player6: string;
}

export function ImportTeamsPage(): JSX.Element {
    //State to store table Column name
    const [tableRows, setTableRows] = useState<string[]>([]);

    //State to store the values
    const [values, setValues] = useState<string[]>([]);

    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray: SetStateAction<string[]>[] = [];
                const valuesArray: SetStateAction<string[]>[] = [];

                // Iterating data to get column name and their values
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });

                // Filtered Column Names
                setTableRows(rowsArray[0]);

                // Filtered Values
                setValues(valuesArray);
            },
        });
    };

    return (
        <div>
            <Input
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                margin={"1em"}
                variant="flushed"
            />

            <TableContainer marginTop={"1em"}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            {tableRows.map((rows, index) => {
                                return <Th key={index}>{rows}</Th>;
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {values.map((value, index) => {
                            return (
                                <Tr key={index}>
                                    {value.map((values, index) => {
                                        return <Td key={index}>{values}</Td>;
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}
