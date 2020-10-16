const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const TODOS_Ls = "toDos";
let toDos = [];

function delToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(ToDos){
        return ToDos.id != parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos()
}

function saveToDos(){
    localStorage.setItem(TODOS_Ls,JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.addEventListener("click",delToDo);
    delBtn.innerText="X";
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId
    toDoList.appendChild(li);
    const toDoObj={
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handdleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_Ls);
    if (loadedToDos != null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handdleSubmit)
}
init();