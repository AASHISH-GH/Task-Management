import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../store/tasksSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { items: tasks, status, error } = useSelector(state => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Tasks Dashboard</h2>
      <div className="row">
        {tasks.map(task => (
          <div key={task._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                  {task.status}
                </span>
                <div className="mt-3">
                  <Link to={`/task/${task._id}`} className="btn btn-primary me-2">View</Link>
                  <button onClick={() => handleDelete(task._id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;