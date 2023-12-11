import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotice from '../ErrorResponse/ErrorNotice';
import axios from 'axios'

export default function Configure() {

    const [title, setTitle] = useState();
    const [related_value, setRelated_value] = useState();
    const [color, setColor] = useState();
    const navigate = useNavigate();
    const [error,setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
        // let token = localStorage.getItem("auth-token");
      const budgetData = { title, related_value,color };
      const budgetRes = await axios.post("http://localhost:5000/api/budgets",budgetData);
      //navigate('/configure');
      document.getElementById("Budget-title").value="";
      document.getElementById("Budget-related_value").value="";
      document.getElementById("Budget-color").value="";

    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="conf">
      <h2>Budgets</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="Budget-title"> Title </label>
        <input
          id="Budget-title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br></br>
        <br></br>
        <label htmlFor="Budget-related_value"> Enter your budget </label>
        <input
          id="Budget-related_value"
          type="text"
          onChange={(e) => setRelated_value(e.target.value)}
        />
        <br></br>
        <br></br>
        <label htmlFor="Budget-color"> Color (Hex Value #FFFFFF) </label>
        <input
          id="Budget-color"
          type="text"
          onChange={(e) => setColor(e.target.value)}
        />
        <br></br>
        <br></br>
        <input type="submit" value="Set Budget" />
      </form>
    </div>
  );
}