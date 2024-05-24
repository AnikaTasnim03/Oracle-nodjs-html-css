document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/todos';
  
    // Function to fetch and display all todos
    function fetchTodos() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const todoList = document.getElementById('todoList');
          data.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.task;
            todoList.appendChild(li);
          });
        })
        .catch(error => console.error('Error fetching todos:', error));
    }
  
    // Initial fetch to load todos
    fetchTodos();
  });