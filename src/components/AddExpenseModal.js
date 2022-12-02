import {useRef} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {UNCATEGORIZED_BUDGET_ID, useGlobalBudgetContext} from '../context/BudgetContext';

function AddExpenseModal({show, handleClose, defaultBudgetId}) {
  const {addExpenses, budgets} = useGlobalBudgetContext();
  const budgetRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  const handleSumbit = (e) => {
    e.preventDefault();
    addExpenses({
        budgetId: budgetRef.current.value,
        amount: parseFloat(amountRef.current.value),
        description: descriptionRef.current.value
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSumbit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-4' controlId='budgetId'>
                    <Form.Label>Budget</Form.Label>
                    <Form.Select defaultValue={defaultBudgetId} ref={budgetRef}>
                        <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                        {budgets.map((budget) => {
                            return <option key={budget.id} value={budget.id}>
                                {budget.name}
                            </option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-4' controlId='amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountRef} type='number' min={0} required />
                </Form.Group>
                <Form.Group className='mb-4' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type='text' required />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type='submit'>Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  );
}
export default AddExpenseModal;
