document.addEventListener("DOMContentLoaded", () => {
    //pobieram elementy
    const form = document.querySelector("#todoForm");
    const textarea = document.querySelector("#todoMessage");
    var tab = [];
    var tab_date = [];

    function addtaskStorage(text, date) {
        const element = document.createElement("div");
        element.classList.add("element");

        //pobieram zawartość templatki
        const elementInner = document.querySelector("#elementTemplate").content.cloneNode(true);

        //wrzucam do elementu
        element.append(elementInner);

        //tworzę datę
        element.querySelector(".element-date").innerText = date;

        //wstawiam tekst
        element.querySelector(".element-text").innerText = text;

        //i wrzucam element do listy
        todoList.append(element);
    }

    //jeżeli jest element w localStorage, ustawiam wartość dla textarea
    if (localStorage.getItem("textareaValue") !== null) {
        textarea.value = localStorage.getItem("textareaValue");
    }

    //podczas wpisywania do textarea aktualizuję localStorage
    textarea.addEventListener("input", e => {
        localStorage.setItem("textareaValue", textarea.value);
        // var temp = textarea.value;
    });

    form.addEventListener("submit", e => {
        //gdy użytkownik wysyła formularz, zakładamy że już skończył pisać
        //więc nie ma co trzymać treści w localStorage
        tab.push(localStorage.getItem("textareaValue"));
        localStorage["table"] = JSON.stringify(tab);

        localStorage.setItem("todolistValue", localStorage.getItem("textareaValue"));
        localStorage.removeItem("textareaValue");

        const date = new Date();
        const dateText = `${date.getDate()} - ${date.getMonth()+1} - ${date.getFullYear()} godz.: ${date.getHours()}:${date.getMinutes()}`;
        tab_date.push(toString(dateText));
        localStorage["table_date"] = JSON.stringify(tab_date);
    });

    if (localStorage["table"] !== null) { 
        tableparse = JSON.parse(localStorage["table"]);
        tableparsedate = JSON.parse(localStorage["table_date"]);
        for (const [i] of tableparse.entries()) {
            addtaskStorage(tableparse[i], tableparsedate[i]);
        }
    }

    todoList.addEventListener("click", e => {
        if (e.target.classList.contains("element-delete")) {
            localStorage.removeItem("todolistValue");
            localStorage.removeItem("todolistDate");
        }
    });
});