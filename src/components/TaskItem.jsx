import React, { useState } from 'react';
import '../styles/TaskItem.scss';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSave = () => {
        if (updatedTask.title && updatedTask.dueDate) { // Проверка на заполнение обязательных полей
            updateTask(updatedTask);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setUpdatedTask(task);
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <form className="task-edit-form">
                    <input
                        type="text"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleEditChange}
                        placeholder="Заголовок"
                        required
                    />
                    <textarea
                        name="description"
                        value={updatedTask.description}
                        onChange={handleEditChange}
                        placeholder="Описание"
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={updatedTask.dueDate}
                        onChange={handleEditChange}
                        required
                    />
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={handleCancel}>Отмена</button>
                </form>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Срок: {task.dueDate}</p>
                    <button onClick={() => setIsEditing(true)}>Редактировать</button>
                    <button onClick={() => deleteTask(task.id)}>Удалить</button>
                </>
            )}
        </div>
    );
};

export default TaskItem;
