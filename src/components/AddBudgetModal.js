import {useRef} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useGlobalBudgetContext} from '../context/BudgetContext';

function AddBudgetModal({show, handleClose}) {
  const {addBudget} = useGlobalBudgetContext();
  const nameRef = useRef();
  const maxRef = useRef();

  const handleSumbit = (e) => {
    e.preventDefault();
    addBudget({
        name: nameRef.current.value,
        max: parseFloat(maxRef.current.value)
    });
    handleClose();
  }
  
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSumbit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-4' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type='text' required />
                </Form.Group>
                <Form.Group className='mb-4' controlId='max'>
                    <Form.Label>Max Value</Form.Label>
                    <Form.Control ref={maxRef} type='number' min={0} step={0.01} required />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type='submit'>Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  );
}
export default AddBudgetModal;
