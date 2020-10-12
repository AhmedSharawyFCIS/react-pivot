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
   

    state = {data:en2,rows:[],cols:[]}
    
    data = (callback)  => {
        
         this.state.data.map(item=>{

            return callback(item)
        })   
      

        // this.setState({data:englishData})
    }
     
    btnHandler = ()=>{
                                    
        this.setState({rows:[...this.state.rows,"merchant_code","billername","gov_code"],cols:[...this.state.cols,"created_at","sectorname","total_amount"]})

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

          console.log(this.state.rows)
        return (


            <div>
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
                    // aggregatorName={"cc"}
                    // vals={["y"]} // aggregator filter attribute
                    // rendererName =  'Grouped Column Chart'      
                    {...this.state}
                    /> 
            </div>
        );
    }
}

export default App;