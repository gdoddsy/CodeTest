import React from 'react';
import {  useState } from "react";
import { FizzBuzzResults } from "../apiClient/data-contracts";
import {  process, State } from '@progress/kendo-data-query';
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { FizzBuzzResultsList } from "../apiClient/CreateFizzBuzzResultsList";
import { Grid, GridColumn as Column,   GridToolbar } from '@progress/kendo-react-grid';
import {  ColumnMenu,} from "./custom-cells";
import { Input } from '@progress/kendo-react-inputs';
import '../style.css';

const SELECTED_FIELD = 'selected';
const DATA_ITEM_KEY = 'number';
const initialDataState = {
  take: 10,
  skip: 0,
  group: []
};


const CreateFizzBuzzResultsList = () => {
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState<FizzBuzzResults[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<{
    [id: string]: boolean | number[];
  }>({});
  const [dataState, setDataState] = React.useState<State>(initialDataState);
  const [dataResult, setDataResult] = React.useState(
    process(filteredData, dataState)
  );
  const [data, setData] = React.useState(filteredData);
  const [getResult, setGetResult] = useState(false);
  const [resoveResultList, setResoveResultList] = useState<FizzBuzzResults[]>([]);
  const [fizzBuzzCreateInput, setFizzBuzzCreateInput] = useState({ startingNumber: 0, count: 1 })
  const [resoveResult, setResoveResult] = useState("");

  const onFilterChange = (ev:any) => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = resoveResultList.filter((item:any) => {
      let match = false;
      for (const property in item) {
        if (
          item[property]
            .toString()
            .toLocaleLowerCase()
            .indexOf(value.toLocaleLowerCase()) >= 0
        ) {
          match = true;
        }

        if (
          item[property].toLocaleDateString &&
          item[property].toLocaleDateString().indexOf(value) >= 0
        ) {
          match = true;
        }
      }
      return match;
    });
    setFilteredData(newData);
    let clearedPagerDataState = { ...dataState, take: 10, skip: 0 };
    let processedData = process(newData, clearedPagerDataState);
    processedData.data = processedData.data.map((item) => ({
      ...item,
      selected: currentSelectedState[item[DATA_ITEM_KEY]],
    }));
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
    setData(newData);
  };

  const dataStateChange = (event: any) => {
    let processedData = process(filteredData, event.dataState);
    processedData.data = processedData.data.map((item) => ({
      ...item,
      selected: currentSelectedState[item[DATA_ITEM_KEY]],
    }));
    setDataResult(processedData);
    setDataState(event.dataState);
  };

  const resetForm = () => {
    setGetResult(false);
    setResoveResultList([]);
    setDataResult([]);
    setFizzBuzzCreateInput({ startingNumber: 0, count: 1 })
  };

  const handleForSubmit = async (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setGetResult(true);
    const client = new FizzBuzzResultsList();
    const result = await client.createFizzBuzzResultsListList({
      startNumber: fizzBuzzCreateInput.startingNumber,
      totalNumbers: fizzBuzzCreateInput.count
    });

    fetch(result.url)
      .then((res) => res.json()).then((data) => {
        setResoveResultList(data);
        setFilteredData(data);        
    let edataState = { ...dataState, take: 10, skip: 0 };
        let processedData = process(data, edataState);
    processedData.data = processedData.data.map((item) => ({
      ...item,
      selected: "selected",
    }));    
        setDataResult(processedData);
        setDataState(edataState)
      })
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
                Fizz Buzz Results
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='td-input-col'>
                <label className='input-label'>Starting Number :</label>
                <form className="k-form" onSubmit={handleForSubmit}>
                  <fieldset className='input-field'>
                    <NumericTextBox                      
                      className='input-field'
                      placeholder="please enter a number"
                      required
                      value={fizzBuzzCreateInput.startingNumber}
                      format="n0"
                      onChange={(e) => setFizzBuzzCreateInput({ startingNumber: Number(e.target.value), count: fizzBuzzCreateInput.count })}
                    />
                  </fieldset>

                </form>
              </td>
              <td rowSpan={2} className="td-submitbtn">
                <button className="btn" onClick={handleForSubmit}>Submit</button>
              </td>
              <td rowSpan={2} className='td-result'>              
                <div>
                  <Grid className='grid-result' style={{
                    height: '400px',
                  }}
                    pageable={{
                      pageSizes: true
                    }}
                    data={dataResult}
                    sortable={true}
                    total={dataResult.total}
                    onDataStateChange={dataStateChange}
                    {...dataState}
                    expandField="expanded"
                    dataItemKey={DATA_ITEM_KEY}
                    selectedField={SELECTED_FIELD}
                    size={'small'}>
                    <GridToolbar>
                      <Input value={filterValue}  
                      onChange={onFilterChange}
                      style={{
                        border: '2px solid #ccc',
                        boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
                        width: '170px',
                        height: '30px',
                        marginRight: '10px'
                      }} placeholder="Search in all columns..." />
                    </GridToolbar>
                    <Column field="number" title="Number" columnMenu={ColumnMenu} width={445} />
                    <Column field="result" title="Result" columnMenu={ColumnMenu} width={445} />
                  </Grid>
                </div>
              </td>
            </tr>
            <tr>
              <td className='td-input-col'>
                <label className='input-label'>Count :</label>
                <form className="k-form" onSubmit={handleForSubmit}>
                  <fieldset className='input-field'>
                    <NumericTextBox
                      min={1}
                      className='input-field'
                      placeholder="please enter a number"
                      required
                      value={fizzBuzzCreateInput.count}
                      format="n0"
                      onChange={(e) => setFizzBuzzCreateInput({ startingNumber: fizzBuzzCreateInput.startingNumber, count: Number(e.target.value) })}
                    />
                  </fieldset>
                </form>
              </td>
            </tr>
            <tr>
              <td className='td-checkbtn' colSpan={3}>
                <button disabled={!getResult} onClick={resetForm}>Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CreateFizzBuzzResultsList;