import React, { useEffect, useRef } from 'react';
import BarChart from '../Barchart/Barchart';
import LineChart from '../Linechart/Linechart';
import PieChart from '../Piechart/Piechart';
import { Chart } from 'chart.js/auto';

function Dashboard() {

    return (
        <div>
        <h1>Welcome to Dashboard</h1>
        <section className="container center" role="main" aria-label="Features">
            <div>  
                <article className="text-box">
                    <h1>Pie Chart</h1>
                        <PieChart/>  
                </article>
                <br></br>
                <hr></hr>
                <br></br>
                <h1>BarChart</h1>
                <BarChart/>
                <br></br>
                <hr></hr>
                <br></br>
                <h1>LineChart</h1>
                <LineChart/>
            </div>
        </section>
        </div>
    );
  }

  export default Dashboard;