import React , {Component, useCallback} from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import Plotly from 'plotly.js-dist';
import {en_list,en2} from './data'
import './style.css';
import { PivotData } from 'react-pivottable/Utilities';
const Plot = createPlotlyComponent(Plotly);

const PlotlyRenderers = createPlotlyRenderers(Plot);

class App extends Component {
   

    state = {data:en_list,rows:[],cols:[],rendererName:"Table",aggregatorName:"Count",vals:[],filter1:"",filter2:""}
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

    aggregatorFilterHandler = (value,filterNum) => {


        if(this.state.aggregatorName !== "Sum over Sum")
        {
            
            this.setState({vals:[value],filter1:value})
        }

        else
        {
            let arr = []
            if(filterNum == 1)
            {
                if(this.state.filter2 !== "")
                {
                    arr = [value,this.state.filter2]
                }

                else
                {
                    arr = [value]
                }
                 
                 this.setState({vals:arr,filter1:value})
            }

            else
            {
                if(this.state.filter1 !== "")
                {
                    arr = [this.state.filter1,value]
                }
                else
                {
                    arr = [value]
                }
                
                this.setState({vals:arr,filter2:value})
            }
            
            
            
        }
    }

     exportdata = () => {
        if(this.state.data.length > 0){
          var pivotData = new PivotData(this.state);
          
          var rowKeys = pivotData.getRowKeys();
          var colKeys = pivotData.getColKeys();
          if (rowKeys.length === 0) {
            rowKeys.push([]);
          }
          if (colKeys.length === 0) {
            colKeys.push([]);
          }

          

          var headerRow = pivotData.props.rows.map(function (r) {
            return r;
          });
          if (colKeys.length === 1 && colKeys[0].length === 0) {
            headerRow.push(this.state.aggregatorName);
          } else {
            colKeys.map(function (c) {
              return headerRow.push(c.join('-'));
            });
          }

          

          var result = rowKeys.map(function (r) {
            var row = r.map(function (x) {
              return x;
            });
            colKeys.map(function (c) {
              var v = pivotData.getAggregator(r, c).value();
              row.push(v ? v : '');
            });
            return row;
          });

          

          result.unshift(headerRow);
          
          var FinalResult= (result.map(function (r) {
            return r.join(',');
          }).join('\n'));

          const element = document.createElement("a");
          const file = new Blob([FinalResult], {type: 'text/plain'});
          element.href = URL.createObjectURL(file);
          element.download = "myFile.csv";
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click()

          
        }
        else{
          alert("No Selections Made")
        }
      }


      componentDidMount()
      {
          setInterval(()=>{

            

            let new_data = [...this.state.data]

            new_data[0] = {...new_data[0],total_amount:new_data[0].total_amount + 100}

            this.setState({data:new_data})

          },2000)
      }
      hideHandler=()=>{
        document.querySelector('.pvtCols').style.display="none"
        document.querySelector('.pvtRows').style.display="none"

        document.querySelector('.pvtVertList').style.display="none"


    }
    render() {


        // console.log("Filter 1",typeof this.state.filter1)
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

                    
                    <button onClick={this.exportdata}>
                        export
                    </button>
                    <button onClick={()=>{
                        
                        if(this.state.data.length > 2000)
                        {

                            this.setState({data:en2})
                        }

                        else
                        {
                            this.setState({data:en2})
                        }
                        
                    }}>Change Data</button>


                    <button onClick={this.btnHandler}>
                        change dimensions
                    </button>

                    <button onClick={()=>{


                        const lab= document.querySelectorAll('.pvtTotal');
                        lab.forEach( function(cur,i,arr){
                            console.log(parseInt(cur.innerHTML))
                            if(parseInt(cur.innerHTML)>3){
                                cur.style.backgroundColor='blue'
                            }
                        });
                        this.setState({data:en_list})
                    }}>
                        Filter
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


                    <select onChange={(e)=>this.setState({aggregatorName:e.target.value,vals:[]})}>
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
                    onChange={e=>this.aggregatorFilterHandler(e.target.value,1)} 
                    value={this.state.filter1}>
                        <option style={{display:"none"}}></option>
                        {
                            Object.keys(this.state.data[0]).map(key=>{

                                return <option>{key}</option>
                            })
                        }

                    </select>}
                    {this.state.aggregatorName == "Sum over Sum"&&
                    <select 
                    onChange={e=>this.aggregatorFilterHandler(e.target.value,2)} 
                    value={this.state.filter1}>
                    <option style={{display:"none"}}></option>
                    {
                        Object.keys(this.state.data[0]).map(key=>{

                            return <option>{key}</option>
                        })
                    }
                    </select>}
<button onClick={()=>this. hideHandler()}>Table</button>
                    
                 </div>
                <PivotTableUI
                    data={this.data}
                    onChange={s => {

                        console.log("table data",s)
                        this.setState(s)
                    }}
                    renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                    rows = {this.state.rows}
                    cols={this.state.cols}
                    // // aggregators={{cc: function(x) { return count}, dd: function(x) { return count}}}

                    // aggregators={{cc: function(x) { return count}}}
                    aggregatorName={this.state.aggregatorName}
                    // vals={this.state.aggregatorFilters} // aggregator filter attribute
                    rendererName =  {this.state.rendererName}      
                    allowExcelExport={true}
                    ref={d => this.pivotObj = d}
                    hiddenAttributes={[...this.state.rows,...this.state.cols]}
                    {...this.state}
                    /> 
            </div>
        );
    }
}

export default App;