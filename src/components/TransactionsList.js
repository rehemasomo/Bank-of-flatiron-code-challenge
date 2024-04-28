
import React, { useState, useEffect } from 'react';
import Transaction from "./Transaction";

function  TransactionsList({ searchTerm }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
 
//fetching data from backend
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) =>
        console.error("Error fetching transactions:", error)
      );
  }, []);

//filtering
  useEffect(() => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

// Function to delete 
const deleteTransaction = (id) => {
  fetch(`http://localhost:8001/transactions/${id}`, {
    method: "DELETE"
  })
  
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete transaction.");
    }
   
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  })
  .catch((error) => {
    console.error("Error deleting transaction:", error);
  });
};

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>

        {filteredTransactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}

        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>{transaction.amount}</td>
            <td>
              <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
