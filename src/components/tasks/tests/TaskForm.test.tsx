import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';
import type { Tasks } from '../../../types/TaskTypes';

// Mock de crypto para las pruebas
const mockUUID = 'mocked-uuid-1234';
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => mockUUID,
  },
});

describe('TaskForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty form for new task', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(screen.getByPlaceholderText('Ingrese el titulo de la tarea')).toHaveValue('');
    expect(screen.getByPlaceholderText('Descripción detallada')).toHaveValue('');
    expect(screen.getByText('Agregar Tarea')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('renders pre-filled form for existing task', () => {
    const existingTask: Tasks = {
      id: 'existing-id',
      title: 'Existing Title',
      description: 'Existing Description',
      completed: 1,
      dueDate: '2024-12-31',
    };
    
    render(<TaskForm task={existingTask} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(screen.getByPlaceholderText('Ingrese el titulo de la tarea')).toHaveValue(existingTask.title);
    expect(screen.getByPlaceholderText('Descripción detallada')).toHaveValue(existingTask.description);
    expect(screen.getByText('Actualizar Tarea')).toBeInTheDocument();
  });

  it('submits new task with entered data', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const titleInput = screen.getByPlaceholderText('Ingrese el titulo de la tarea');
    const descriptionInput = screen.getByPlaceholderText('Descripción detallada');
    const submitButton = screen.getByText('Agregar Tarea');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: mockUUID,
      title: 'New Title',
      description: 'New Description',
      completed: 2,
      dueDate: '',
    });
  });

  it('submits updated task when editing', () => {
    const existingTask: Tasks = {
      id: 'existing-id',
      title: 'Existing Title',
      description: 'Existing Description',
      completed: 0,
      dueDate: '2024-12-31',
    };
    
    render(<TaskForm task={existingTask} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const titleInput = screen.getByPlaceholderText('Ingrese el titulo de la tarea');
    const descriptionInput = screen.getByPlaceholderText('Descripción detallada');
    const submitButton = screen.getByText('Actualizar Tarea');

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...existingTask,
      title: 'Updated Title',
      description: 'Updated Description',
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('requires title to submit', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const submitButton = screen.getByText('Agregar Tarea');
    fireEvent.click(submitButton);

    // El formulario no debe enviarse sin título
    expect(mockOnSubmit).not.toHaveBeenCalled();
    
    // Debería mostrarse un mensaje de validación
    //expect(null).toBeInvalid();
  });

  it('logs submission to console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const titleInput = screen.getByPlaceholderText('Ingrese el titulo de la tarea');
    const submitButton = screen.getByText('Agregar Tarea');

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Submitting task:', 
      expect.objectContaining({ title: 'Test Task' })
    );
    
    consoleSpy.mockRestore();
  });
});