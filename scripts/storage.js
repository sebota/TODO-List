document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector("#todoList");
    const todoForm = document.querySelector("#todoForm");

    todoForm.addEventListener("submit", e => {
        localStorage.setItem("todolistValue", todoList.value);
    });

    if (localStorage.getItem("todolistValue") !== null) {
        todoList.value = localStorage.getItem("todolistValue");
    }
});