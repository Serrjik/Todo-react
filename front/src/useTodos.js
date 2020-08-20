// Функции для работы с todos. Пользовательский хук.

import { useReducer, useEffect } from "react"
import { getAll } from "./requestManager"

/* 
	Функция reducer принимает 2 аргумента: state - текущее состояние reducer'а
	и action, который призван изменить это состояние. 
	У action всегда есть поле type, 
	по которому можно понять, что требуется сделать.
*/
function reducer (state, action) {
	console.log('action: ', action);

	switch (action.type) {
		// Полностью изменить state.
		case 'INIT': 
			return action.payload

		// Выбрать todo-элемент.
		case 'SET_SELECT':
			// Нужно вернуть полностью новое состояние, другой объект.
			const newState = []

			for (const todo of state) {
				if (todo.id === action.payload.id) {
					todo.selected = action.payload.selected
				}

				newState.push({ ...todo })
			}

			return newState
		
		default:
			return state
	}
}

export default function useTodos () {
	console.log('useTodos fired');
	/* 
	Хук React'а useReducer позволяет описать reducer.
	Принимает 2 аргумента - reducer и стартовое состояние. 
	Возвращает 2 объекта - todos и dispatch.
	dispatch - функция, которая будет вызывать reducer.
	В функции reducer должны быть описаны все действия,
	которые можно совершать с объектом todos.
	*/
	const [todos, dispatch] = useReducer(reducer, [])

	useEffect(
		() => {
			getAll().then(todos => dispatch({
				type: 'INIT',
				payload: todos
			}))
		},
		[]
	)

	return [todos, dispatch]
}