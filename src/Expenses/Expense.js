import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotice from "../ErrorResponse/ErrorNotice";
import axios from "axios";

export default function Expense() {

  const [budgetData, setBudgetData] = useState([]);

  const [title, setTitle] = useState();
  const [related_value, setRelated_value] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  
  // const [data, setData] = useState();


  useEffect(() => {
    async function fetchData() {
      const budgetDataRes = await axios.get("http://localhost:5000/api/budgets/user");
      
      console.log(budgetDataRes);
      let array = [];
            for(var i = 0; i < budgetDataRes.data.length;i++) {
              console.log("i", budgetDataRes.data[i].title );
              array.push(budgetDataRes.data[i].title );
      }
      console.log(array);
      setBudgetData(array);
    }

    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      // let token = localStorage.getItem("auth-token");
      const expenseData = { title, related_value, month, year};
      const expenseRes = await axios.post(
        "http://localhost:5000/api/expenses",
        expenseData,
        // { headers: { "x-auth-token": token } }
      );
      document.getElementById("expense-dropdown").value="";
      document.getElementById("expense-related_value").value="";
      document.getElementById("expense-month").value="";
      document.getElementById("expense-year").value="";
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="conf">
     
      <h2>Expenses</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        
        <label htmlFor="expense-title"> Title </label>

        <select id="expense-dropdown" onChange={(e) => setTitle(e.target.value)}>
        <option> Select expense</option>
          { 
            
            budgetData.map(item => (
                <option value  = {item}> {item} </option>
            ))
          }
        </select> 
        <br></br>
        <br></br>

        <label htmlFor="expense-related_value"> Enter your Expense </label>
        <input
          id="expense-related_value"
          type="text"
          onChange={(e) => setRelated_value(e.target.value)}
        />
        <br></br>
        <br></br>

        <label htmlFor="expense-month"> Month </label>
        <input
          id="expense-month"
          type="text"
          onChange={(e) => setMonth(e.target.value)}
        />
        <br></br>
        <br></br>

        <label htmlFor="expense-year"> Year </label>
        <input
          id="expense-year"
          type="text"
          onChange={(e) => setYear(e.target.value)}
        />
        <br></br>
        <br></br>

        <input type="submit" value="Enter Expenses" />
      </form>
    </div>
  );
}