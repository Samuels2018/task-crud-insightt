import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../TaskItem';
import type { Tasks } from '../../../types/TaskTypes';

const mockTask: Tasks = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  completed: 0,
  dueDate: '2024-12-31',
};

describe('TaskItem Component', () => {
  it('renders task information', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onComplete = jest.fn();

    render(
      <TaskItem 
        task={mockTask} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        onComplete={onComplete} 
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onComplete when complete button is clicked', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onComplete = jest.fn();

    render(
      <TaskItem 
        task={mockTask} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        onComplete={onComplete} 
      />
    );

    fireEvent.click(screen.getByText('Completar'));
    expect(onComplete).toHaveBeenCalledWith('1');
  });

  it('shows edit form when edit button is clicked', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onComplete = jest.fn();

    render(
      <TaskItem 
        task={mockTask} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        onComplete={onComplete} 
      />
    );

    fireEvent.click(screen.getByText('Editar'));
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });
});