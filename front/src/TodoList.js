import React from 'react';
import TodoItem from './TodoItem';
// import TodoItemEditor from './TodoItemEditor';

// props - объект с данными, которые передавались в функцию как атрибуты.
export default function TodoList (props) {
	props.todos.sort((todoA, todoB) => todoB.id - todoA.id)
	// Массив из React-компонентов.
	const todoItems = props.todos.map(todo => (
		/* 
			Нужно передать key для установления связи 
			между элементами виртуального и реального DOM. 
			По этому ключу React понимает, какие элементы изменились.
		*/
		<TodoItem 
			todo={todo} 
			key={todo.id} 
			dispatch={props.dispatch} 
			// changeTodo={props.changeTodo} 
		/>
	))

	return (
		<div className="overflow-auto">
			<ul className="list-group">
				{ todoItems }
				{/* <TodoItemEditor /> */}
			</ul>
		</div>
	)
}