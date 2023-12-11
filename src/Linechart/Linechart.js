import React,{useEffect,useContext,useState} from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';

export default function LineChart() {
    const [labels, setLabels] = useState([]);
        const [data, setData] = useState([]);
        const [backgroundColor, setBackgroundColor] = useState([]);
        const[expense, setExpense] = useState([]);
        const[expenseTitle, setExpenseTitle] = useState([]);
    
    useEffect(() => {
        
        axios.get('http://localhost:5000/api/budgets/user')
        .then(res => {
            var l=[];
            var d =[];
            var b=[];
            for (var i = 0; i < res.data.length; i++) {
                l.push(res.data[i].title);

                d.push(res.data[i].related_value);
                
               b.push(res.data[i].color);
                
                
            }
            setLabels(l);
            setData(d);
            setBackgroundColor(b);
            
            })

        axios.get('http://localhost:5000/api/expenses/user')
        .then(res => {
            var e=[];
            var et = [];
            for (var i = 0; i < res.data.length; i++) {
                    et.push(res.data[i].title);
                   e.push(res.data[i].related_value);
                   
                    
                }
                setExpense(e);
                setExpenseTitle(et);
                // console.log(dataSource);
                })

          },[])
    return (
        <div className="App">
            <div className  = "Line1" >
        <Line data={{
            datasets: [
                {   
                    label : 'Total Budget planned',
                    data: data,
                    backgroundColor: backgroundColor         
                }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels
        
        }} />
        </div>
        
        
        <div className = "Line2">
            <Line data = {{
            datasets: [
                {   
                    label: 'Total Expenses made',
                    data: expense,
                    backgroundColor: [
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                        '#B3B6B7',
                        '#A533FF',
                        '#311846',
                        '#6D6673'
                    ]
                }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: expenseTitle
        
        }}/> </div>

      </div>
    )
}