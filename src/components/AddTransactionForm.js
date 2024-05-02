
import React, { useState } from "react";

function AddTransactionForm() {
  
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    
    fetch("https://bank-of-flatiron-code-challenge-6.onrender.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          // not successful
          throw new Error("Failed to add transaction.");
        }
        // successful 
        return response.json();
      })
      .then((data) => {
    
        alert("Transaction added successfully!");
        
        setFormData({
          date: "",
          description: "",
          category: "",
          amount: "",
        });
       
        setError("");
      })

       }
  return (
    <div className="ui segment">
    
      <form className="ui form" onSubmit={handleSubmit}>
  
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleChange } />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange}/>
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange={handleChange} />
        </div>
        
        {error && <div className="ui error message">{error}</div>}
       
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
