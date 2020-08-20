export function getAll () {
	return fetch('/todoItems', {
		method: "GET"
	}).then(response => response.json())
}

export function getById (id) {
	return fetch('/todoItems/' + id, {
		method: "GET"
	}).then(response => response.json())
}

// Функция записи новой задачи в БД.
export function createTodo (todo) {
	return fetch('/todoItems', {
		method: "POST",
		headers: {
			'content-type': "application/json"
		},
		body: JSON.stringify(todo)
	})
	.then(response => response.json())
}

// Функция сохраняет новое состояние задачи в БД.
export function updateTodo (todo) {
	return fetch('/todoItems/' + todo.id, {
		method: "PATCH",
		headers: {
			'content-type': "application/json"
		},
		body: JSON.stringify(todo)
	})
	.then(response => response.json())
}

// Функция удаляет задачу из БД.
export function removeTodo (todo) {
	return fetch('/todoItems/' + todo.id, {
		method: "DELETE"
	})
	.then(response => response.json())
}