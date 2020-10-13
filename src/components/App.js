import React , {Component, useCallback} from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import Plotly from 'plotly.js-dist';
import {en_list,en2} from './data'
import './style.css';
const Plot = createPlotlyComponent(Plotly);

const PlotlyRenderers = createPlotlyRenderers(Plot);

class App extends Component {
   

    state = {data:en2,rows:[],cols:[],rendererName:"Table",aggregatorName:"Count",aggregatorFilters:[]}
    excludeArr = ["Count","Count as fraction of Total"]
    data = (callback)  => {
        
         this.state.data.map(item=>{

            return callback(item)
        })   
      

        // this.setState({data:englishData})
    }
     
    btnHandler = ()=>{
                                    
        this.setState({rows:[...this.state.rows,"merchant_code","billername","gov_code"],cols:[...this.state.cols,"created_at","sectorname","total_amount"]})

         }

    aggregatorFilterHandler = (value) => {

        if(this.state.aggregatorName !== "Sum over Sum")
        {
            
            this.setState({aggregatorFilter:[value]})
        }

        else
        {

        }
    }
    render() {

        var count = (data, rowKey, colKey) => {
            return {
              count: 0,
              push: function(record) { this.count +=record.x + record.y; },
              value: function() { return this.count; },
              format: function(x) { return x; },
           };
          };

        return (


            <div>

                <div className="buttons">
                    <button onClick={()=>{
                        
                        if(this.state.data.length < 2000)
                        {

                            this.setState({data:en_list})
                        }

                        else
                        {
                            this.setState({data:en2})
                        }
                        
                    }}>Change Data</button>


                    <button onClick={this.btnHandler}>
                        change dimensions
                    </button>

                    <select onChange={(e)=>this.setState({rendererName:e.target.value})}>
                        <option>Table</option>

                        <option>Table Heatmap</option>
                        <option>Table Col Heatmap</option>
                        <option>Table</option>
                        <option>Table Row Heatmap</option>
                        <option>Exportable TSV</option>
                        <option>Grouped Column Chart</option>
                        <option>Stacked Column Chart</option>
                        <option>Grouped Bar Chart</option>
                        <option>Stacked Bar Chart</option>
                        <option>Line Chart</option>
                        <option>Dot Chart</option>
                        <option>Area Chart</option>
                        <option>Scatter Chart</option>
                        <option>Multiple Pie Chart</option>
                    </select>


                    <select onChange={(e)=>this.setState({aggregatorName:e.target.value})}>
                        <option>Count</option>

                        <option>Count Unique Values</option>
                        <option>List Unique Values</option>
                        <option>Sum</option>
                        <option>Integer Sum</option>
                        <option>Average</option>
                        <option>Median</option>
                        <option>Sample Variance</option>
                        <option>Sample Standard Deviation</option>
                        <option>Minimum</option>
                        <option>Maximum</option>
                        <option>First</option>
                        <option>Last</option>
                        <option>Sum over Sum</option>
                        <option>Sum as Fraction of Total</option>

                        <option>Sum as Fraction of Rows</option>

                        <option>Sum as Fraction of Columns</option>

                        <option>Count as Fraction of Total</option>

                        <option>Sum as Fraction of Rows</option>

                        <option>Sum as Fraction of Columns</option>
                    </select>

                    {this.excludeArr.indexOf(this.state.aggregatorName) == -1 &&
                    <select 
                    onChange={e=>this.aggregatorFilterHandler(e.target.value)} 
                    value={this.state.aggregatorFilter}>
                        <option style={{display:"none"}}></option>
                        {
                            Object.keys(this.state.data[0]).map(key=>{

                                return <option>{key}</option>
                            })
                        }

                    </select>}
                    {this.state.aggregatorName == "Sum over Sum"&&
                    <select 
                    onChange={e=>this.aggregatorFilterHandler(e.target.value)} 
                    value={this.state.aggregatorFilter}>
                    <option style={{display:"none"}}></option>
                    {
                        Object.keys(this.state.data[0]).map(key=>{

                            return <option>{key}</option>
                        })
                    }
                    </select>}
                    
                 </div>
                <PivotTableUI
                    data={this.data}
                    onChange={s => {

                        console.log("table data",s.rows)
                        this.setState(s)
                    }}
                    renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                    rows = {this.state.rows}
                    cols={this.state.cols}
                    // // aggregators={{cc: function(x) { return count}, dd: function(x) { return count}}}

                    // aggregators={{cc: function(x) { return count}}}
                    aggregatorName={this.state.aggregatorName}
                    vals={["merchant_code","damen_fee"]} // aggregator filter attribute
                    rendererName =  {this.state.rendererName}      
                    {...this.state}
                    /> 
            </div>
        );
    }
}

export default App;