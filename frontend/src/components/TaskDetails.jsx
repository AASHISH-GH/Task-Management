import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask } from '../store/tasksSlice';

function TaskDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector(state => 
    state.tasks.items.find(task => task._id === id)
  );

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleStatusChange = () => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    dispatch(updateTask({
      id: task._id,
      task: { ...task, status: newStatus }
    }));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>
        <p className="card-text">{task.description}</p>
        <div className="mb-3">
          <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
            {task.status}
          </span>
        </div>
        <button onClick={handleStatusChange} className="btn btn-primary me-2">
          Toggle Status
        </button>
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default TaskDetails;