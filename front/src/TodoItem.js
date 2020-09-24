import React, { useState, useContext } from 'react';
import Context from './Context';
// import { updateTodo } from "./requestManager.js";

export default function TodoItem (props) {
	const [editMode, setEditMode] = useState(false)
	const [input, setInput] = useState(props.todo.content)
	const { dispatch } = useContext(Context)

	if (editMode) {
		return (
			<li
				className="list-group-item d-flex justify-content-between"
				focus="true"
			>
				<input
					type="text"
					className="form-control"
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyUp={e => {
						if (e.key === 'Enter') {
							setEditMode(false)

							dispatch({
								type: 'UPDATE',
								payload: {
									...props.todo,
									content: input
								}
							})
						}
					}}
					/*
						Если нужно вызвать функцию с тем же набором параметров,
						что и её обёртка, можно просто передать саму функцию.
					*/
					// onKeyUp={saveTodo}
					// onBlur={e => props.changeTodo(props.todo.id, value)}
				/>
			</li>
		)
	}

	return (
		<li
			className="list-group-item d-flex justify-content-between"
			onDoubleClick={() => setEditMode(true)}
		>
			<label>
				{/* У input'а должен быть обработчик события onChange. */}
				<input
					type="checkbox"
					className="mr-3"
					checked={props.todo.selected}
					onChange={e => dispatch({
						type: "SET_SELECT",
						payload: {
							id: props.todo.id,
							selected: !props.todo.selected
						}
					})}
				/>
				<span className={props.todo.done ? "item-done" : ""}>
					{props.todo.content}
				</span>
			</label>
			<small className="text-muted">
				{new Date(props.todo.date).toLocaleDateString("ru-RU")}
			</small>
		</li>
	)
}