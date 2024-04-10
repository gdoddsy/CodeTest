import React from 'react';
import * as ReactDOM from 'react-dom';
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { useState } from "react";
import { ResolveFizzBuzzNumber } from "../apiClient/ResolveFizzBuzzNumber"




const ResolveNumber = () => {
    const [number, setNumber] = useState(0);
    const [resoveResult, setResoveResult] = useState("");

    const handleForSubmit = async (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const client = new ResolveFizzBuzzNumber();
        const result = await client.resolveFizzBuzzNumberList({
            numberToCheck: number
        });
        setResoveResult(result.data);
    }

    return ( 
        <div className='main-resolve'>
            <div className='main-resolve-box'>
                <table className='table-resolve'>
                    <thead>
                        <tr>
                            <th >
                                Input Number
                            </th><th>
                                Resolve Results
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='td-input-col'>
                                <label className='input-label'>Whole Number :</label>
                                <form className="k-form" onSubmit={handleForSubmit}>
                                    <fieldset className='input-field'>
                                        <NumericTextBox
                                            className='input-field'
                                            placeholder="please enter a number"
                                            required
                                            value={number}
                                            format="n0"
                                            onChange={(e) => setNumber(Number(e.target.value))}
                                        />
                                    </fieldset>
                                    
                                </form>
                                <button className="btn-floart-right" onClick={handleForSubmit}>Submit</button>
                            </td>
                            <td>
                                <div className='input-label-bg-white'>
                                <label className='input-label-bg-white'>{resoveResult}</label>
                                </div>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ResolveNumber;