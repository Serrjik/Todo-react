// Функции для работы с todos. Пользовательский хук.

import { useReducer, useEffect } from "react"
import { getAll, createTodo, updateTodo, removeTodo } from "./requestManager"

/*
	Функция reducer принимает 2 аргумента: state - текущее состояние reducer'а
	и action, который призван изменить это состояние.
	У action всегда есть поле type,
	по которому можно понять, что требуется сделать.
*/
function reducer (state, action) {
	switch (action.type) {
		// Полностью изменить state (инициализировать хранилище).
		case 'INIT':
			return action.payload

		// Обновить состояние хранилища.
		case 'UPDATE': {
			// Нужно вернуть полностью новое состояние, другой объект.
			const newState = []

			for (const todo of state) {
				if (todo.id === action.payload.id) {
					Object.assign(todo, action.payload)
					// Изменить запись на сервере.
					updateTodo(todo)
				}

				newState.push({ ...todo })
			}

			return newState
		}

		// Выбрать todo-элемент и изменить его состояние в хранилище.
		case 'SET_SELECT': {
			// Нужно вернуть полностью новое состояние, другой объект.
			const newState = []

			for (const todo of state) {
				if (todo.id === action.payload.id) {
					todo.selected = action.payload.selected
				}

				newState.push({ ...todo })
			}

			return newState
		}

		// Создание новой записи.
		case 'ADD':
			return [action.payload, ...state]

		// Установить запись выполненной.
		case 'DONE': {
			// Нужно вернуть полностью новое состояние, другой объект.
			const newState = []

			for (const todo of state) {
				// Если todo отмечен выполненным:
				if (todo.selected) {
					todo.selected = false
					todo.done = true
					// Отметить записи на сервере как выполненные.
					updateTodo(todo)
				}

				newState.push({ ...todo })
			}

			return newState
		}

		case 'REMOVE': {
			// Нужно вернуть полностью новое состояние, другой объект.
			const newState = []

			for (const todo of state) {
				// Если todo входит в элементы, выбранные для удаления:
				if (todo.selected) {
					// Удалить записи на сервере.
					removeTodo(todo) }

				/*
					Вернуть только те элементы,
					которые не были выбраны для удаления.
				*/
				else {
					newState.push({ ...todo })
				}

			}

			return newState
		}

		default:
			return state
	}
}

export default function useTodos () {
	// console.log('useTodos fired');

	/*
	Хук React'а useReducer позволяет описать reducer.
	Принимает 2 аргумента - reducer и стартовое состояние.
	Возвращает 2 объекта - todos и dispatch.
	dispatch - функция, которая будет вызывать reducer.
	В функции reducer должны быть описаны все действия,
	которые можно совершать с объектом todos.
	*/
	const [todos, dispatch] = useReducer(reducer, [])

	// Функция принимает новый todo.
	dispatch.create = function create (todo) {
		createTodo(todo).then(todo => dispatch({
			type: "ADD",
			payload: todo
		}))
	}

	useEffect(
		() => {
			;(async () => {
				getAll().then(todos => dispatch({
					type: 'INIT',
					payload: todos
				}))
			})();
		},
		[]
	)

	return [todos, dispatch]
}