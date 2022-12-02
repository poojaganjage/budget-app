import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import {Stack, Button} from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import {UNCATEGORIZED_BUDGET_ID, useGlobalBudgetContext} from './context/BudgetContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpenseModal from './components/ViewExpenseModal';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const {budgets, getBudgetsExpenses} = useGlobalBudgetContext();

  const openAddExpenseModal = (budgetId) => {
    setExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
      <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='primary' onClick={() => setShowModal(true)}>Add Budget</Button>
        <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expenses</Button>
      </Stack>
      <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.1rem',
          alignItems: 'flex-start'
        }}
      >
      {budgets.map((budget) => {
        const amount = getBudgetsExpenses(budget.id).reduce((total, expense) => {
          return total + expense.amount;
        }, 0);
        return <BudgetCard 
        key={budget.id}
        name={budget.name} 
        amount={amount}
        max={budget.max}
        gray='gray' 
        onAddExpenseClick={() => openAddExpenseModal(budget.id)} 
        onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)} 
      />
      })}
      <UncategorizedBudgetCard 
        onAddExpenseClick={openAddExpenseModal} 
        onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)} 
      />
      <TotalBudgetCard />
      </div>
    </Container>
    <AddBudgetModal show={showModal} handleClose={() => setShowModal(false)} />
    <AddExpenseModal show={expenseModal} handleClose={() => setExpenseModal(false)} defaultBudgetId={addExpenseModalBudgetId} />
    <ViewExpenseModal budgetId={viewExpenseModalBudgetId} handleClose={() => setViewExpenseModalBudgetId(null)} />
    </>
  );
}
export default App;
