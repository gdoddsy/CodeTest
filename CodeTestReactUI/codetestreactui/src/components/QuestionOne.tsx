import { useRef, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle } from "@progress/kendo-react-layout"
import { ResolveFizzBuzzNumber } from "../apiClient/ResolveFizzBuzzNumber"
import { NumericTextBox } from "@progress/kendo-react-inputs"

const QuestionOne = ({url, fieldWidth}: {url?: string, fieldWidth?: number}) => {
    const baseUrl = url ?? ""
    const width = fieldWidth ?? 300
    const inputRef = useRef<HTMLInputElement>()
    const [result, setResult] = useState<string>("")

    const resolveFizzBuzz = async () => {
        if (undefined === inputRef.current) {
            return
        }
        const elem = inputRef.current
        const api = new ResolveFizzBuzzNumber({ baseUrl })
        const response = await api.resolveFizzBuzzNumberList({
            numberToCheck: parseInt(elem.value)
        })
        setResult(response.data)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h3>Question One</h3>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Card className="mb-2">
                        <CardBody>
                            Allow the user to enter a number (using the <a href="https://www.telerik.com/kendo-react-ui/components/inputs/numerictextbox/formats/">KendoUI NumericTextBox</a>) and submit that number to the ResolveFizzBuzzNumber endpoint at: <a href="https://codetestwebapp20240407064956.azurewebsites.net/ResolveFizzBuzzNumber">https://codetestwebapp20240407064956.azurewebsites.net/ResolveFizzBuzzNumber</a> and show the result on the screen next to the users input.
                        </CardBody>
                    </Card>
                <div className='flex mb-2'>
                    <div className='mr-2'>
                        <div>Number to find</div>
                        <NumericTextBox
                            width={width}
                            format="n0"
                            ref={inputRef}
                        />
                    </div>
                    <div className='flex pt-1-5'>
                        {result}
                    </div>
                </div>
                <button
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={resolveFizzBuzz}>
                    Submit Q1
                </button>
                </CardBody>
            </Card>
        </>
    )
}

export default QuestionOne
