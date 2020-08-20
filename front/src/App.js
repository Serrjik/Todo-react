import React, {useState, useEffect} from 'react';
import AppHeader from './AppHeader';
import TodoList from './TodoList';
import { getAll, createTodo, updateTodo, removeTodo } from './requestManager';
import useTodos from './useTodos';

// Всё, что возвращает функция, попадает на страницу.
function App() {
	/* 
		React.useState создаёт реактивные переменные.
		Массив todos. Функция setTodos, через которую можно вызывать изменения. 
	*/
	// const [todos, setTodos] = useState([
		// { id: 1, content: "Купить хлеб", done: false, selected: true },
		// { id: 2, content: "Помыть кота", done: false, selected: true },
		// { id: 3, content: "Посмотреть вебинар по React", done: false, selected: false },
		// { id: 4, content: "Сделать ДЗ по курсу JS Start от constcode.ru", done: false, selected: false },
		// { id: 5, content: "Поставить лайк этому видео", done: true, selected: false },
		// { id: 6, content: "Почитать документацию по React", done: false, selected: false }
	// ])

	const [todos, dispatch] = useTodos()

	/* 
		Хук useEffect принимает 2 параметра. 1-ый - функция, которая вызывается 
		каждый раз, когда изменяется что-нибудь из массива 2-ого параметра.
		Если 2-ой параметр - пустой, 
		функция из 1-го аргумента вызывается только 1 раз. 
	*/
	// useEffect(
	// 	() => {
	// 		;(async () => {
	// 			getAll().then(todos => setTodos(todos))
	// 		})();
	// 	},
	// 	[]
	// )

	// Новая задача.
	const [newTodo, setNewTodo] = useState("")

	// Отображать ли кнопки действий?
	const [showActions, setShowActions] = useState(true)

	/* 
		Хук useEffect принимает 2 параметра. 1-ый - функция, которая вызывается 
		каждый раз, когда изменяется что-нибудь из массива 2-ого параметра. 
	*/
	useEffect(
		() => {
			setShowActions(todos.some(todo => todo.selected))
		},
		[todos]
	)

	// Функция обрабатывает переключение чекбокса.
	// const toggleTodo = todoId => {
	// 	const todo = todos.find(todo => todo.id === todoId)
	// 	todo.selected = !todo.selected

	// 	// console.log(todos)

	// 	// В функцию setTodos нужно передавать новый массив.
	// 	// setTodos([...todos])
	// }

	// Функция обрабатывает двойной клик по задаче.
	// const editTodo = todoId => {
	// 	const todo = todos.find(todo => todo.id === todoId)
	// 	todo.edited = !todo.edited

	// 	console.log(todos)

	// 	// В функцию setTodos нужно передавать новый массив.
	// 	setTodos([...todos])
	// }

	/* 
		Функция обрабатывает завершение редактирования задачи 
		(по потере фокуса, или нажатию "Enter"). 
	*/
	const changeTodo = (todoId, value) => {
		const todo = todos.find(todo => todo.id === todoId)
		todo.edited = !todo.edited
		todo.content = value

		updateTodo(todo)

		// В функцию setTodos нужно передавать новый массив.
		// setTodos([...todos])
	}

	// Функция делает выбранные задания выполненными.
	// const setDone = () => {
	// 	for (const todo of todos) {
	// 		if (todo.selected) {
	// 			todo.done = true
	// 			todo.selected = false
	// 			updateTodo(todo)
	// 		}
	// 	}
	
	// 	// setTodos([...todos])
	// }

	// Функция удаляет выбранные задания.
	// const removeSelected = () => {
		// setTodos(todos.filter(todo => {
		// 	if (todo.selected) {
		// 		removeTodo(todo)
		// 	}

		// 	return !todo.selected
		// }))
	// }

	/* 
		В React по договоренности функции-обработчики 
		именуются начиная с "handler". 
	*/
	const handlerNewTodo = e => {
		if (e.key === 'Enter') {
			const todo = {
				// id: 1 + Math.max(0, ...todos.map(todo => todo.id)),
				done: false,
				selected: false,
				content: e.target.value
			}

			// createTodo(todo).then(todo => setTodos([todo, ...todos]))

			setNewTodo("")
		}

		else {
			setNewTodo(e.target.value)
		}
	}

	// const editTodo = editedTodo => {
	// 	// Найти editedTodo среди тех, что есть.
	// 	for (const todo of todos) {
	// 		if (todo.id === editedTodo.id) {
	// 			todo.content = editedTodo.content
	// 		}
	// 	}

	// 	// Передадим в функцию setTodos новый массив, чтобы функция была чистой.
	// 	// setTodos([...todos])
	// }

	// Внутри return находится JS-код. Вместо class нужно использовать className.
	return (
		/* 
			То, что передаём между открывающимся и закрывающимся тегом, 
			попадает в props.children. 
		*/
		<div className="py-1 application container d-flex flex-column align-items-stretch">
			<div className="card h-100">
				1. Сделать чтобы по двойному клику появлялся инпут для редактирования задачи. И отредактированная задача отправлялась на сервер запросом PUT или PATCH и там обновлялась.
				2. Доделать функции кнопок "Выполнить" и "Удалить". Чтобы при клике по ним на сервер отправлялись данные каждой выбранной задачи.
				<AppHeader />
				<input 
					type="text" 
					className="form-control" 
					value={newTodo}
					onChange={e => setNewTodo(e.target.value)}
					onKeyUp={handlerNewTodo}
				/>
				{
					showActions
					? (
						<div className="ml-auto">
							<div className="btn-group">
								<button 
									type="button" 
									className="btn btn-primary"
									// onClick={() => setDone()}
								>Выполнить</button>
								<button 
									type="button" 
									className="btn btn-danger"
									// onClick={() => removeSelected()}
								>Удалить</button>
							</div>
						</div>
					)
					: ""
				}

				{/* Элементы в функцию передаются с помощью атрибутов. */}
				<TodoList 
					todos={todos} 
					dispatch={dispatch}
					// changeTodo={changeTodo}
				/>
			</div>
		</div>
	);
}

export default App;
