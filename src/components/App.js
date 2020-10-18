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
   

    state = {data:en_list,rows:[],cols:[],rendererName:"Table",aggregatorName:"mySum",vals:[],filter1:"",filter2:""}
    excludeArr = ["Count","Count as fraction of Total"]
    data = (callback)  => {
        
         this.state.data.map(item=>{

            return callback(item)
        })   
      

        // this.setState({data:englishData})
    }
 _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
     
    btnHandler = ()=>{
                                    
        this.setState({rows:[...this.state.rows,"merchant_code","billername","gov_code"],cols:[...this.state.cols,"created_at","sectorname","total_amount"]})

    }

    aggregatorFilterHandler = (value,filterNum) => {


        if(this.state.aggregatorName !== "Sum over Sum")
        {
            
            this.setState({vals:[value,"Average"],filter1:value})
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
            // headerRow.push(this.state.aggregatorName);

            headerRow.push("Totals");
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


        //   result.push({"dsdsds":5454})

          

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

            new_data[5] = {...new_data[5],total_amount:new_data[5].total_amount + 150}


            new_data[10] = {...new_data[10],total_amount:new_data[10].total_amount + 100}


            new_data[11] = {...new_data[11],total_amount:new_data[11].total_amount + 200}


            new_data[13] = {...new_data[13],total_amount:new_data[13].total_amount + 300}

            new_data[20] = {...new_data[20],total_amount:new_data[20].total_amount + 1000}


            new_data[7] = {...new_data[7],total_amount:new_data[7].total_amount + 100}

            new_data[9] = {...new_data[9],total_amount:new_data[9].total_amount + 150}


            new_data[12] = {...new_data[12],total_amount:new_data[12].total_amount + 100}


            new_data[27] = {...new_data[27],total_amount:new_data[27].total_amount + 200}


            new_data[19] = {...new_data[19],total_amount:new_data[19].total_amount + 300}

            new_data[2] = {...new_data[2],total_amount:new_data[2].total_amount + 1000}


            this.setState({data:new_data})

          },1000)
      }
      hideHandler=()=>{
        document.querySelector('.pvtCols').style.display="none"
        document.querySelector('.pvtRows').style.display="none"

        document.querySelector('.pvtVertList').style.display="none"


    }
    render() {


        // console.log("Filter 1",typeof this.state.filter1)
        var count = (data, rowKey, colKey) => {
        //  var formatter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : usFmtInt;

            return {
              count: 0,
              push: function(record) { this.count +=record.x + record.y; },
              value: function() { return this.count; },
              format:function(x) { return x; },
           };
          };
         var sum = function(attributeArray) {
            // var formatter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : usFmt;
            var attr = attributeArray[0];
            
              return function () {
                return {
                  sum: 0,
                  push: function push(record) {
                    if (!isNaN(parseFloat(record[attr]))) {
                      this.sum += parseFloat(record[attr]);
                    }
                  },
                  value: function value() {
                    return this.sum;
                  },
        
                  format: function(x) { return x; },
                  numInputs: typeof attr !== 'undefined' ? 0 : 1
                
              };
            };
          }

        return (


            <div>

                <div className="buttons">

                    
                    <button onClick={this.exportdata}>
                        Export to Excel
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
                        Highlighter
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
                <button onClick={()=>this. hideHandler()}>Hide Attributes</button>
                    
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
                    // aggregators={{sum: function(x) { return count}, dd: function(x) { return count}}}
                    // valueFilter={"Count","Sum"}
                    aggregators={{mySum : function(x) { return sum}}}
                    aggregatorName={this.state.aggregatorName}
                    // aggregatorName={"sum"}

                    vals={this.state.aggregatorFilters} // aggregator filter attribute
                    rendererName =  {this.state.rendererName}      
                    hiddenAttributes = {[...this.state.rows,...this.state.cols]}
                    {...this.state}
                    /> 
            </div>
        );
    }
}

export default App;