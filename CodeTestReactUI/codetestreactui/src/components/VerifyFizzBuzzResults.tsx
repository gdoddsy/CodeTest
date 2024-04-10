import React from 'react';
import { useState } from "react";
import { FizzBuzzResults } from "../apiClient/data-contracts";
import { VerifyResults } from "../apiClient/VerifyFizzBuzzResults"
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

import '../style.css';


const VerifyFizzBuzzResults = () => {
  const [getResult,setGetResult] = useState(false);
  const [getSubmitList,setGetSubmitList] = useState(false);
  const resultOptions = [
    "String",
    "Fizz",
    "Buzz",
    "FizzBuzz",
  ];
  const [resoveResult, setResoveResult] = useState({ number: 0, result: "" });
  const [verifyList, setResoveResultList] = useState<FizzBuzzResults[]>([]);
  const [fizzBuzzResults, setFizzBuzzVerifyInput] = useState({ number: 0, result: "" })


  const resetForm = () => {
    setGetSubmitList(false);
    setGetResult(false);
    setFizzBuzzVerifyInput({number:0,result:""})
    setResoveResultList([]);
  };

  const addList =()=>{
    setGetSubmitList(true);
    setGetResult(true);
    setFizzBuzzVerifyInput({number:fizzBuzzResults.number,result:fizzBuzzResults.result})
    verifyList.push(fizzBuzzResults);    
  }

  const handleChecking = async (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const client = new VerifyResults();
    const result = await client.verifyFizzBuzzResultsCreate(verifyList); 
    setResoveResultList(result.data);
    setGetResult(true);
  }

  return (
    <div className='main-resolve'>
      <div className='main-resolve-box'>
        <table className='table-resolve'>
          <thead>
            <tr>
              <th colSpan={2}>
                Input
              </th><th>
                Verify Results
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
               <td className='td-input-col'>
                <label className='input-label'>Whole Number :</label>
                <form className="k-form" >
                  <fieldset className='input-field'>
                    <NumericTextBox
                      className='input-field'
                      placeholder="please enter a number"
                      required
                      value={fizzBuzzResults.number}
                      format="n0"
                      onChange={(e) => setFizzBuzzVerifyInput({number:Number(e.target.value),result:fizzBuzzResults.result})}
                    />
                  </fieldset>
                </form>
              </td>
              <td rowSpan={2} className="td-submitbtn">
                <button className="btn" onClick={addList}>Add</button>
              </td>
               <td rowSpan={2}  className='td-result'>
                  <table className='input-label-bg-white'>
                      <thead>
                        <td>Number</td>
                        <td>Result</td>
                      </thead>
                      <tbody>                        
                          {verifyList.map(res => (
                            <tr key={res.number}>
                              <td>{res.number}</td>
                              <td>{res.result}</td>
                            </tr>
                          ))}                          
                      </tbody>
                    </table>
                </td>
            </tr>
            <tr>
              <td className='td-input-col'>
                <label className='input-label'>Result Options:</label>
                <form className="k-form">
                  <fieldset className='input-field'>
                    <DropDownList                    
                      className="input-field"
                      data={resultOptions}
                      required
                      value={fizzBuzzResults.result}
                      onChange={(e) => setFizzBuzzVerifyInput({number:fizzBuzzResults.number,result:e.target.value})}
                    />
                  </fieldset>
                </form>
              </td>
            </tr>
            <tr>
              <td className='td-checkbtn' colSpan={3}>
              <button className="btn"
                      disabled={!getSubmitList}
                      onClick={handleChecking}>Check</button>      
              <button disabled={!getResult} onClick={resetForm}>Reset</button>
              </td>
            </tr>
          </tbody>
        </table>        
        </div>
    </div>
  );
};
export default VerifyFizzBuzzResults;