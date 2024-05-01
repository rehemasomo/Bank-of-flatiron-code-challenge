import React, { useState, useEffect } from 'react';
import Transaction from "./Transaction";

function TransactionsList({ searchTerm }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  //fetch backend
  const fetchTransactions = () => {
    fetch("https://bank-of-flatiron-code-challenge-6.onrender.com/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) =>
        console.error("Error fetching transactions:", error)
      );
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
//search (filtering)
  useEffect(() => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  // delete
  const deleteTransaction = (id) => {
    fetch(`https://bank-of-flatiron-code-challenge-6.onrender.com/transactions/${id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete transaction.");
      }
      fetchTransactions();
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

