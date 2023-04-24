
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, World!</h1>,
  document.getElementById('root')
);


function App(){
  const [transactions, setTransactions] =useState([]);
const [searchTerm, setSearchTerm] = useState('');

// Define function to add a new transaction
const addTransaction = (transaction) => {
  setTransactions([...transactions, transaction]);
};

// Define function to delete a transaction
const deleteTransaction = (id) => {
  const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
  setTransactions(updatedTransactions);
};

// Define function to filter transactions by search term
const filteredTransactions = transactions.filter(
  transaction => transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
);

// Define function to sort transactions by category or description
const sortTransactions = (key) => {
  const sortedTransactions = [...transactions].sort((a, b) => a[key].localeCompare(b[key]));
  setTransactions(sortedTransactions);
};

// Define function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  const { description, category, amount } = event.target.elements;
  const newTransaction = {
    id: Math.random(),
    description: description.value,
    category: category.value,
    amount: parseFloat(amount.value),
  };
  addTransaction(newTransaction);
  event.target.reset();
};

return (
  <div>
    {/* Start a  search bar */}
    <input type="text" placeholder="Search transactions" onChange={(event) => setSearchTerm(event.target.value)} />

    {/* Render table header with sorting function to arrange  */}
    <table>
      <thead>
        <tr>
          <th onClick={() => sortTransactions('category')}>Category</th>
          <th onClick={() => sortTransactions('description')}>Description</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>

      {/* Render table content  with transactions */}
      <tbody>
        {filteredTransactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.category}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>
              <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Render form to add new transaction */}
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input type="text" name="description" required />
      </label>
      <label>
        Category:
        <input type="text" name="category" required />
      </label>
      <label>
        Amount:
        <input type="number" name="amount" step="0.01" required />
      </label>
      <button type="submit">Add Transaction</button>
    </form>
  </div>
);
}

export default App;