import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.scss';

const App = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        const currentDate = new Date().toISOString().split('T')[0];
        const taskDueDate = task.dueDate;

        if (filter === 'completed') {
            return taskDueDate < currentDate;
        }
        if (filter === 'incomplete') {
            return taskDueDate >= currentDate;
        }
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return new Date(b.dueDate) - new Date(a.dueDate);
    });

    return (
        <div className="app">
            <div className="Box">
                <h1>Список задач</h1>
                <TaskForm addTask={addTask} />
                <div>
                    <button onClick={() => setFilter('all')}>Все</button>
                    <button onClick={() => setFilter('completed')}>Завершенные</button>
                    <button onClick={() => setFilter('incomplete')}>Незавершенные</button>
                </div>
                <div>
                    <button onClick={() => setSortOrder('asc')}>По возрастанию</button>
                    <button onClick={() => setSortOrder('desc')}>По убыванию</button>
                </div>
                <TaskList tasks={sortedTasks} updateTask={updateTask} deleteTask={deleteTask} />
            </div>
        </div>
    );
};

export default App;
