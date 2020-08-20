import React, { useState } from 'react';
// import { updateTodo } from "./requestManager.js";

export default function TodoItem (props) {
	// const [value, setValue] = React.useState(props.todo.content)

	const [editMode, setEditMode] = useState(false)

	// const saveTodo = e => {
	// 	if (e.key === 'Enter') {
	// 		setEditMode(false)
	// 		updateTodo(props.todo)
	// 	}
	// }

	if (editMode) {
		return (
			<li className="list-group-item d-flex justify-content-between" focus="true">
				<input 
					type="text" 
					className="form-control" 
					value={props.todo.content}
					onChange={e => props.editTodo({
						...props.todo,
						content: e.target.value
					})}
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
			// onDoubleClick={e => props.editTodo(props.todo.id)}
			onDoubleClick={() => setEditMode(true)}
			// onDoubleClick={() => console.log('fired')}
		>
			<label>
				{/* У input'а должен быть обработчик события onChange. */}
				<input 
					type="checkbox" 
					className="mr-3" 
					checked={props.todo.selected} 
					onChange={e => props.dispatch({
						type: "SET_SELECT",
						payload: {
							id: props.todo.id,
							selected: !props.todo.selected
						}
					})} 
				/>
				<span className={props.todo.done ? "item-done" : ""}>{props.todo.content}</span>
			</label>
			<small className="text-muted">12.04.2020</small>
		</li>
	)
}