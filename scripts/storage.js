var tab = [];
var tab_date = [];

document.addEventListener("DOMContentLoaded", () => {
    //pobieram elementy
    const form = document.querySelector("#todoForm");
    const textarea = document.querySelector("#todoMessage");
    const button = document.querySelector("#sub");

    button.disabled = true;
    
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
        element.querySelector(".element-delete").id = text;

        //i wrzucam element do listy
        todoList.append(element);
    }

    //jeżeli jest element w localStorage, ustawiam wartość dla textarea
    if (localStorage.getItem("textareaValue") !== null) {
        textarea.value = localStorage.getItem("textareaValue");
        button.disabled = false; 
        document.getElementById("sub").style.color="white";
    }

    //podczas wpisywania do textarea aktualizuję localStorage
    textarea.addEventListener("input", e => {
        localStorage.setItem("textareaValue", textarea.value);
        button.disabled = false; 
        document.getElementById("sub").style.color="white";
    });

    form.addEventListener("submit", e => {
        //gdy użytkownik wysyła formularz, zakładamy że już skończył pisać
        //więc nie ma co trzymać treści w localStorage
        tab = JSON.parse(localStorage["table"]);
        tab_date = JSON.parse(localStorage["table_date"]);
        tab.push(localStorage.getItem("textareaValue"));
        localStorage["table"] = JSON.stringify(tab);
        localStorage.removeItem("textareaValue");

        const date = new Date();
        const dateText = `${date.getDate()} - ${date.getMonth()+1} - ${date.getFullYear()} godz.: ${date.getHours()}:${date.getMinutes()}`;
        tab_date.push(dateText);
        localStorage["table_date"] = JSON.stringify(tab_date);

        button.disabled = true;
        document.getElementById("sub").style.color="black";
    });

    if (localStorage["table"]) { 
        tableparse = JSON.parse(localStorage["table"]);
        tableparsedate = JSON.parse(localStorage["table_date"]);

        for (const [i] of tableparse.entries()) {
            addtaskStorage(tableparse[i], tableparsedate[i]);
        }
    }

    todoList.addEventListener("click", e => {
        if (e.target.classList.contains("element-delete")) {
            var items = JSON.parse(localStorage["table"]);
            var items2 = JSON.parse(localStorage["table_date"]);

            for (var i = 0; i < items.length; i++) {
                if (items[i] == e.target.id) {
                    items.splice(i, 1);
                    items2.splice(i, 1);
                }
            }
            localStorage["table"] = JSON.stringify(items);
            localStorage["table_date"] = JSON.stringify(items2);
        }
    });
});