import {Card, ProgressBar, Stack, Button} from 'react-bootstrap';
import {currencyFormatter} from '../util';

function BudgetCard({name, amount, max, gray, onAddExpenseClick, onViewExpenseClick, hideButtons}) {
  const getProgress = (amount, max) => {
    const ratio = amount / max;
    if(ratio < 0.5) return 'primary';
    if(ratio < 0.75) return 'warning';
    return 'danger';
  }
  console.log(amount);
  console.log(max);

  const className = [];
  if(amount > max) {
    className.push('bg-danger', 'bg-opacity-10');
  } else if(gray) {
    className.push('bg-light');
  }
  console.log(className);

  return (
    <Card className={className.join(' ')}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
          <div className='me-2'>{name}</div>
          <div className='d-flex align-items-baseline'>{currencyFormatter.format(amount)} {max && (<span className='fs-6 text-muted ms-1'>/ {currencyFormatter.format(max)}</span>)}</div>
        </Card.Title>
        {max && (
          <ProgressBar 
            className='rounded-pill' 
            variant={getProgress(amount, max)} 
            min={0} 
            max={max} 
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction='horizontal' gap='2' className='mt-4'>
          <Button className='ms-auto' variant='outline-primary' onClick={onAddExpenseClick}>Add Expenses</Button>
          <Button variant='outline-secondary' onClick={onViewExpenseClick}>View Expenses</Button>
        </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
export default BudgetCard;
