import React, {useState, useContext, createContext} from 'react';
import {v4 as uuidV4} from 'uuid';
import useLocalStorage from '../hooks/useLocalStorageHook';

const BudgetsContext = createContext();
export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

function BudgetContextProvider({children}) {
  //const [budgets, setBudgets] = useState([]);
  //const [expenses, setExpenses] = useState([]);

  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const getBudgetsExpenses = (budgetId) => {
    return expenses.filter((expense) => {
      return expense.budgetId === budgetId;
    });
  }

  const addExpenses = ({budgetId, amount, description}) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, {id: uuidV4(), budgetId, amount, description}];
    });
  }

  const addBudget = ({name, max}) => {
    setBudgets((prevBudgets) => {
      if(prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, {
        id: uuidV4(),
        name,
        max
      }];
    });
  }

  const deleteExpenses = ({id}) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  const deleteBudget = ({id}) => {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider value={{
      budgets,
      expenses,
      getBudgetsExpenses,
      addExpenses,
      addBudget,
      deleteExpenses,
      deleteBudget
    }}>
      {children}
    </BudgetsContext.Provider>
  );
}
export const useGlobalBudgetContext = () => {
  return useContext(BudgetsContext);
}
export default BudgetContextProvider;
