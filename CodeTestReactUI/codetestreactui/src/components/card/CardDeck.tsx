import { Body, CTA, Card, Footer, Header } from "./Card";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { action } from "../../utils/request";
import { objectToQueryString } from "../../utils/helpers";
import { useState } from "react";
import { Button } from "../common/Button";
import { CreateFizzBuzzResultsList, FizzBuzzNumber, VerifyFizzBuzzResults } from "./CardInterface";

// ResolveFizzBuzzNumber
const initFizzBuzzNumber = {
	payload: {
		value: 0
	},
	response: {
		data: "No number entered"
	}
};

// CreateFizzBuzzResultsList
const initCreateFizzBuzzResultsList = {
	payload: {
		start: 0,
		count: 0
	},
	response: {
		data: null
	}
};

// VerifyFizzBuzzResults
const initVerifyFizzBuzzResults = {
	payload: [],
	userInput: {
		number: 0,
		result: ""
	},
	response: {
		data: null
	}
};

export function CardDeck() {
	const [fizzBuzzNumber, setFizzBuzzNumber] = useState<FizzBuzzNumber>(initFizzBuzzNumber);
	const [fizzBuzzResultsList, setFizzBuzzResultsList] = useState<CreateFizzBuzzResultsList>(initCreateFizzBuzzResultsList);
	const [verifyFizzBuzzResults , setVerifyFizzBuzzResults] = useState<VerifyFizzBuzzResults>(initVerifyFizzBuzzResults);

	// ResolveFizzBuzzNumber
	async function ResolveFizzBuzzNumber() {
		const querystring = objectToQueryString({ "numberToCheck": fizzBuzzNumber.payload.value });
		
		const data = await action.get(`ResolveFizzBuzzNumber?${querystring}`) ?? "";

		setFizzBuzzNumber({
			...fizzBuzzNumber, 
			response: { ...fizzBuzzNumber.response, data: data.toString() }
		});
	}

	// CreateFizzBuzzResultsList
	async function createFizzBuzzResultsList() {
		const querystring = objectToQueryString({ 
			"startNumber": fizzBuzzResultsList.payload.start,
			"totalNumbers": fizzBuzzResultsList.payload.count
		});

		const data = await action.get(`CreateFizzBuzzResultsList?${querystring}`);

		setFizzBuzzResultsList({
			...fizzBuzzResultsList, 
			response: { ...fizzBuzzResultsList.response, data: data }
		});	
	}

	// VerifyFizzBuzzResults
	async function verifyFizzBuzzResultsList() {
		const data = await action.post('VerifyFizzBuzzResults', JSON.stringify(verifyFizzBuzzResults.payload));

		setVerifyFizzBuzzResults({
			...verifyFizzBuzzResults, 
			response: { ...verifyFizzBuzzResults.response, data: data }
		});	
	}
    
    return (
		<div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
            <Card>
                <Header title="ResolveFizzBuzzNumber"/>
                <Body children={
                    <>
                        <NumericTextBox 
                            defaultValue={0} 
                            required={true} 
                            min={0} 
                            spinners={false} 
                                onChange={event => {
                                setFizzBuzzNumber({
                                    ...fizzBuzzNumber,
                                    payload: { ...fizzBuzzNumber.payload, value: event.target.value! }
                                }); 
                            }}
                        /> 
                        <CTA action={
                            <Button  
                                label="Send"
                                style={{ marginTop: "10px", padding: "7.5px 12.5px", display: "block", backgroundColor: "#403C3C", color: "white" }} 
                                onClick={ResolveFizzBuzzNumber}
                            />
                        }/>
                    </>
                }/>
                <Footer 
                    style={{ fontSize: "1.5rem" }}
                    value={fizzBuzzNumber.response.data} 
                />
            </Card>
                
            <Card>
                <Header title="CreateFizzBuzzResultsList"/>
                <Body children={
                    <>
                        <NumericTextBox 
                            style={{ display: "block" }}
                            placeholder="Enter a starting number"
                            name="start"
                            required={true} 
                            min={0} 
                            defaultValue={0}
                            spinners={false} 
                            onChange={event => {
                                setFizzBuzzResultsList({
                                    ...fizzBuzzResultsList,
                                    payload: { ...fizzBuzzResultsList.payload, start: event.target.value! }
                                });
                            }}
                        />
                        <NumericTextBox 
                            style={{ display: "block" }}
                            placeholder="Enter a count number"
                            name="count"
                            required={true} 
                            min={0} 
                            defaultValue={0}
                            spinners={false} 
                            onChange={event => {
                                setFizzBuzzResultsList({
                                    ...fizzBuzzResultsList,
                                    payload: { ...fizzBuzzResultsList.payload, count: event.target.value! }
                                });
                            }}
                        />
                        <CTA action={
                            <>
                                <Button  
                                    label="Send"
                                    style={{ marginTop: "10px", padding: "7.5px 12.5px", display: "block", backgroundColor: "#403C3C", color: "white" }} 
                                    onClick={ createFizzBuzzResultsList }
                                />
                            </>
                        }/>
                    </>
                }/>
                <Footer 
                    style={{ overflowY: "scroll" }}
                    children={
                    <>
                        <Grid style={{ height: "auto" }} data={ fizzBuzzResultsList.response.data }>
                            <GridColumn field="number" title="Number" width="240px"/>
                            <GridColumn field="result" title="Result" width="240px"/>
                        </Grid>
                    </>
                    } 
                />
            </Card>

            <Card>
                <Header title="VerifyFizzBuzzResults"/>
                <Body children={
                    <>
                        <NumericTextBox 
                            style={{ display: "block" }}
                            placeholder="Add a number"
                            name="start"
                            required={true} 
                            min={0} 
                            defaultValue={0}
                            spinners={false} 
                            onChange={event => {
                                setVerifyFizzBuzzResults({
                                    ...verifyFizzBuzzResults,
                                    userInput: { ...verifyFizzBuzzResults.userInput, number: event.target.value! }
                                });
                            }}
                        />
                        <CTA action={
                            <>
                                <Button  
                                    style={{ backgroundColor: "#209622" }}
                                    label="Add"
                                    onClick={() => {
                                        setVerifyFizzBuzzResults({
                                            ...verifyFizzBuzzResults,
                                            payload: [ ...verifyFizzBuzzResults.payload,
                                                { number: verifyFizzBuzzResults.userInput.number, result: "" }
                                            ]
                                        });
                                    }}
                                />
                                <Button  
                                    label="Send"
                                    onClick={verifyFizzBuzzResultsList }
                                />
                            </>
                        }/>
                    </>
                }/>
                <Footer 
                    style={{ overflowY: "scroll" }}
                    children={
                    <>
                        <Grid style={{ height: "auto" }} data={verifyFizzBuzzResults.response.data ?? verifyFizzBuzzResults.payload}>
                            <GridColumn field="number" title="Number" width="240px"/>
                            <GridColumn field="result" title="Result" width="240px"/>
                        </Grid>
                    </>
                    } 
                />
            </Card>
        </div>
	);
}