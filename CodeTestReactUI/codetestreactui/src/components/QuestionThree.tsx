import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout"
import { VerifyFizzBuzzResults } from "../apiClient/VerifyFizzBuzzResults"
import { FizzBuzzResults } from "../apiClient/data-contracts"
import { Grid, GridColumn, GridItemChangeEvent, GridRowClickEvent, GridToolbar } from "@progress/kendo-react-grid"
import { ElementRef, useRef, useState } from "react"

interface FizzBuzzResultsEdit extends FizzBuzzResults {
    inEdit?: boolean
    id?: number
}

const QuestionThree = ({ url }: { url?: string }) => {
    const baseUrl = url ?? ""
    const gridRef = useRef<ElementRef<typeof Grid>>()
    const [result, setRename] = useState<FizzBuzzResultsEdit[]>([])
    const [editId, setEditId] = useState<number | null>(null)

    const verifyFizzBuzzResult = async () => {
        const tbl = gridRef.current
        if (undefined === tbl) {
            return
        }

        const massaged_data: FizzBuzzResults[] = []

        tbl._data.forEach(row => {
            const data = row.dataItem
            massaged_data.push({
                number: data.number,
                result: data.result
            })
        })
        const api = new VerifyFizzBuzzResults({ baseUrl })
        const result = await api.verifyFizzBuzzResultsCreate(massaged_data)
        setRename([...result.data])
    }

    const rowClick = (event: GridRowClickEvent) => {
        if (event.dataItem.id === editId) {
            setEditId(null)
        } else {
            setEditId(event.dataItem.id)
        }
    }

    const itemChange = (event: GridItemChangeEvent) => {
        const inEditId = event.dataItem.id
        const field = event.field || ""
        const newData = result.map((itm) => {
            if (itm.id === inEditId) {
                return {
                    ...itm,
                    [field]: event.value
                }
            } else {
                return itm
            }
        })
        setRename(newData)
    }

    const addItem = () => {
        const newId = result.length + 1
        const newRecord: FizzBuzzResultsEdit = {
            id: newId,
            number: undefined,
            result: null
        }
        setRename([...result, newRecord])
        setEditId(newRecord.id!)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h3>Question Three</h3>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Card className="mb-2">
                        <CardBody>
                            Collect a list of numbers from the user and display their selection in a grid with two columns (number and result). When they have entered all the numbers they want, submit them as a list to <a href="https://codetestwebapp20240407064956.azurewebsites.net/VerifyFizzBuzzResults">https://codetestwebapp20240407064956.azurewebsites.net/VerifyFizzBuzzResults</a> and then update the UI with the result returned.
                        </CardBody>
                        <Grid
                            data={result.map((itm, idx) => ({
                                ...itm,
                                inEdit: itm.id === editId,
                                id: idx + 1
                            }))}
                            editField='inEdit'
                            onRowClick={rowClick}
                            onItemChange={itemChange}
                            ref={gridRef}
                        >
                            <GridToolbar>
                                <div>
                                    <button
                                        title="Add new"
                                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                        onClick={addItem}
                                    >
                                        Add new
                                    </button>
                                </div>
                                <div>
                                    <button
                                        title="Submit Q3"
                                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                        onClick={verifyFizzBuzzResult}
                                    >
                                        Submit Q3
                                    </button>
                                </div>
                            </GridToolbar>
                            <GridColumn
                                field="number"
                                title="Number"
                                editor="numeric"
                            />
                            <GridColumn field="result" title="Result" />
                        </Grid>
                    </Card>
                </CardBody>
            </Card>
        </>
    )
}

export default QuestionThree
