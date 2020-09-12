document.addEventListener("DOMContentLoaded", () => {
    //pobieram elementy
    const form = document.querySelector("#todoForm");
    const textarea = document.querySelector("#todoMessage");
    const list =  document.querySelector("#todoText")

    //jeżeli jest element w localStorage, ustawiam wartość dla textarea
    if (localStorage.getItem("textareaValue") !== null) {
        textarea.value = localStorage.getItem("textareaValue");
    }

    //podczas wpisywania do textarea aktualizuję localStorage
    textarea.addEventListener("input", e => {
        localStorage.setItem("textareaValue", textarea.value);
        localStorage.setItem("todolistValue", textarea.value);
    });

    form.addEventListener("submit", e => {
        //gdy użytkownik wysyła formularz, zakładamy że już skończył pisać
        //więc nie ma co trzymać treści w localStorage
        localStorage.removeItem("textareaValue");
    });

    if (localStorage.getItem("todolistValue") !== null) {
        list.value = localStorage.getItem("todolistValue");
    }
});