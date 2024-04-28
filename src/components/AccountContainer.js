
import React, { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";
import TransactionsList from "./TransactionsList";
import Search from "./Search";

function AccountContainer() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm searchTerm={searchTerm} />
      <TransactionsList searchTerm={searchTerm} />
    </div>
  );
}

export default AccountContainer;
