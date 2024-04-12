import { NumericTextBox } from "@progress/kendo-react-inputs"
import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout"
import { useRef, useState } from "react"
import { CreateFizzBuzzResultsList } from "../apiClient/CreateFizzBuzzResultsList"
import { FizzBuzzResults } from "../apiClient/data-contracts"
import { Grid, GridColumn } from "@progress/kendo-react-grid"

const QuestionTwo = ({ url, fieldWidth }: { url?: string, fieldWidth?: number }) => {
    const baseUrl = url ?? ""
    const width = fieldWidth ?? 300
    const sizeRef = useRef<HTMLInputElement>()
    const startRef = useRef<HTMLInputElement>()
    const [result, setResult] = useState<"" | JSX.Element>("")

    const createFizzBuzzList = async () => {
        if (
            undefined === sizeRef.current ||
            undefined === startRef.current
        ) {
            return
        }

        const start = startRef.current
        const size = sizeRef.current
        const api = new CreateFizzBuzzResultsList({ baseUrl  })

        const response = await api.createFizzBuzzResultsListList(
            {
                startNumber: parseInt(start.value),
                totalNumbers: parseInt(size.value)
            }
        )
        setResult(display(response.data))
    }

    const display = (value: FizzBuzzResults[]) => {
        if (value.length === 0) {
            return ""
        }

        return (
            <Grid
                data={value}
            >
                <GridColumn field="number" title="Number" />
                <GridColumn field="result" title="Result" />
            </Grid>
        )
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h3>Question Two</h3>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Card className="mb-2">
                        <CardBody>
                            Allow the user to enter 2 numbers: starting number and count. Submit both of these numbers to <a href="https://codetestwebapp20240407064956.azurewebsites.net/CreateFizzBuzzResultsList">https://codetestwebapp20240407064956.azurewebsites.net/CreateFizzBuzzResultsList</a>. The result is a list. Display this list in a grid (ideally <a href="https://www.telerik.com/kendo-react-ui/components/grid/">KendoUI Grid</a> - ignore the background saying it's unlicensed)
                        </CardBody>
                    </Card>
                    <div className="flex mb-2">
                        <div className='mr-2'>
                            <div>Start Number</div>
                            <NumericTextBox
                                width={width}
                                format="n0"
                                ref={startRef}
                            />
                        </div>
                        <div>
                            <div>Total Numbers</div>
                            <NumericTextBox
                                width={width}
                                format="n0"
                                ref={sizeRef}
                            />
                        </div>
                    </div>
                    <div className='mb-2'>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            onClick={createFizzBuzzList}>
                            Submit Q2
                        </button>
                    </div>
                    {result}
                </CardBody>
            </Card>
        </>
    )
}

export default QuestionTwo
