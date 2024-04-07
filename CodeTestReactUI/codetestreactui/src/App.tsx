import { useRef, useState } from 'react'
import './App.css'
import { NumericTextBox } from "@progress/kendo-react-inputs"
import { Grid, GridColumn, GridEvent, GridItemChangeEvent, GridRowClickEvent, GridToolbar } from "@progress/kendo-react-grid"
import { ResolveFizzBuzzNumber } from './apiClient/ResolveFizzBuzzNumber'
import { CreateFizzBuzzResultsList } from './apiClient/CreateFizzBuzzResultsList'
import { FizzBuzzResults } from './apiClient/data-contracts'
import { VerifyFizzBuzzResults } from './apiClient/VerifyFizzBuzzResults'

interface FizzBuzzResultsEdit extends FizzBuzzResults {
    inEdit?: boolean
    id?: number
}

function App() {
    const baseUrl = "https://codetestwebapp20240407064956.azurewebsites.net"
    const fieldWidth = 300
    const defaultQ1 = 0
    const q1Ref = useRef()
    const q2StartRef = useRef()
    const q2SizeRef = useRef()
    const q3Ref = useRef()
    const [q1, setQ1] = useState<string>("")
    const [q2, setQ2] = useState<"" | JSX.Element>("")
    const [q3, setQ3] = useState<FizzBuzzResultsEdit[]>([])
    const [editId, setEditId] = useState<number | null>(null)

    // INFO: Question 1
    const resolveFizzBuzz = async () => {
        if (undefined === q1Ref.current) {
            return
        }
        const elem = q1Ref.current as HTMLInputElement
        const api = new ResolveFizzBuzzNumber()
        api.baseUrl = baseUrl

        const result = await api.resolveFizzBuzzNumberList(
            { numberToCheck: parseInt(elem.value) }
        )
        setQ1(result.data)
    }

    // INFO: Question 2
    const createFizzBuzzList = async () => {
        if (
            undefined === q2SizeRef.current ||
            undefined === q2StartRef.current
        ) {
            return
        }

        const start = q2StartRef.current as HTMLInputElement
        const size = q2SizeRef.current as HTMLInputElement
        const api = new CreateFizzBuzzResultsList()
        api.baseUrl = baseUrl

        const result = await api.createFizzBuzzResultsListList(
            {
                startNumber: parseInt(start.value),
                totalNumbers: parseInt(size.value)
            }
        )
        setQ2(q2Display(result.data))
    }

    const q2Display = (value: FizzBuzzResults[]) => {
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

    // INFO: Question 3
    const verifyFizzBuzzResult = async () => {
        const tbl = q3Ref.current
        if (undefined === tbl) {
            return
        }

        const massaged_data: FizzBuzzResults[]  = []

        tbl._data.forEach(row => {
            const data = row.dataItem
            massaged_data.push({
                number: data.number,
                result: data.result
            })
        })
        const api = new VerifyFizzBuzzResults()
        api.baseUrl = baseUrl
        const result = await api.verifyFizzBuzzResultsCreate(massaged_data)
        const value = await result.json()
        setQ3([...value])
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
        const newData = q3.map((itm) => {
            if (itm.id === inEditId) {
                return {
                    ...itm,
                    [field]: event.value
                }
            } else {
                return itm
            }
        })
        setQ3(newData)
    }

    const addItem = () => {
        const newId = q3.length + 1
        const newRecord: FizzBuzzResultsEdit = {
            id: newId,
            number: undefined,
            result: null
        }
        setQ3([...q3, newRecord])
        setEditId(newRecord.id!)
    }

    return (
        <>
            <div>
                <b>Instructions</b>
            </div>
            <div>
                Complete the following 3 tasks on this page. Swagger API documentation for each task can be found <a href="https://codetestwebapp20240407064956.azurewebsites.net/swagger/index.html">here</a>.
                <ol>
                    <li>Allow the user to enter a number (using the <a href="https://www.telerik.com/kendo-react-ui/components/inputs/numerictextbox/formats/">KendoUI NumericTextBox</a>) and submit that number to the ResolveFizzBuzzNumber endpoint at: <a href="https://codetestwebapp20240407064956.azurewebsites.net/ResolveFizzBuzzNumber">https://codetestwebapp20240407064956.azurewebsites.net/ResolveFizzBuzzNumber</a> and show the result on the screen next to the users input.
                    </li>
                    <li>
                        Allow the user to enter 2 numbers: starting number and count. Submit both of these numbers to <a href="https://codetestwebapp20240407064956.azurewebsites.net/CreateFizzBuzzResultsList">https://codetestwebapp20240407064956.azurewebsites.net/CreateFizzBuzzResultsList</a>. The result is a list. Display this list in a grid (ideally <a href="https://www.telerik.com/kendo-react-ui/components/grid/">KendoUI Grid</a> - ignore the background saying it's unlicensed)
                    </li>
                    <li>
                        Collect a list of numbers from the user and display their selection in a grid with two columns (number and result). When they have entered all the numbers they want, submit them as a list to <a href="https://codetestwebapp20240407064956.azurewebsites.net/VerifyFizzBuzzResults">https://codetestwebapp20240407064956.azurewebsites.net/VerifyFizzBuzzResults</a> and then update the UI with the result returned.
                    </li>
                </ol>
            </div>
            <div>
                <h2>Question 1</h2>
                <div className='flex mb-2'>
                    <div className='mr-2'>
                        <div>Number to find</div>
                        <NumericTextBox
                            width={fieldWidth}
                            format="n0"
                            default={defaultQ1}
                            ref={q1Ref}
                        />
                    </div>
                    <div className='flex pt-1-5'>
                        {q1}
                    </div>
                </div>
                <button onClick={resolveFizzBuzz}>
                    Submit Q1
                </button>
            </div>
            <hr />
            <div>
                <h2>Question 2</h2>
                <div className="flex mb-2">
                    <div className='mr-2'>
                        <div>Start Number</div>
                        <NumericTextBox
                            width={fieldWidth}
                            format="n0"
                            ref={q2StartRef}
                        />
                    </div>
                    <div>
                        <div>Total Numbers</div>
                        <NumericTextBox
                            width={fieldWidth}
                            format="n0"
                            ref={q2SizeRef}
                        />
                    </div>
                </div>
                <div className='mb-2'>
                    <button onClick={createFizzBuzzList}>
                        Submit Q2
                    </button>
                </div>
                {q2}
            </div>
            <hr />
            <div>
                <h2>Question 3</h2>
                <div className='mb-2'>
                    <Grid
                        data={q3.map((itm, idx) => ({
                            ...itm,
                            inEdit: itm.id === editId,
                            id: idx+1
                        }))}
                        editField='inEdit'
                        onRowClick={rowClick}
                        onItemChange={itemChange}
                        ref={q3Ref}
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
                </div>
            </div>
        </>
    )
}

export default App
