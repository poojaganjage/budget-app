import {useGlobalBudgetContext} from '../context/BudgetContext';
import BudgetCard from './BudgetCard';

function TotalBudgetCard() {
  const {expenses, budgets} = useGlobalBudgetContext();
  const amount = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
  const max = budgets.reduce((total, budget) => {
    return total + budget.max;
  }, 0);

  if(max === 0) return null;
  return (
    <BudgetCard amount={amount} name='Total' gray max={max} hideButtons={true} />
  );
}
export default TotalBudgetCard;
