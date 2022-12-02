import {UNCATEGORIZED_BUDGET_ID, useGlobalBudgetContext} from '../context/BudgetContext';
import BudgetCard from './BudgetCard';

function UnCategorizedBudgetCard(props) {
  const {getBudgetsExpenses} = useGlobalBudgetContext();

  const amount = getBudgetsExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  if(amount === 0) return null;
  return (
    <BudgetCard amount={amount} name='Uncategorized' gray {...props} /> 
  );
}
export default UnCategorizedBudgetCard;
