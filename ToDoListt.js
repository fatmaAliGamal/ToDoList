var list = [];
var completeList = [];
var gettedList = [];
var gettedComplete = [];
var addBtn = document.getElementById("add-task");
var myUL = document.getElementById("myUL");
var inputed = document.getElementById("myInput");
var myULCheck = document.getElementById("myULCheck");
var searchTask = document.getElementById("search-task");
var entryId = 0;
class todo {
    constructor(ul, text, listIN) {
        this.li = document.createElement('li');
        this.li.textContent = `${text}`;
        ul.appendChild(this.li);
        this.span = document.createElement("SPAN");
        this.txt = document.createTextNode("\u00D7");
        this.span.className = "close";
        this.span.appendChild(this.txt);
        this.li.appendChild(this.span);
        this.spanCor = document.createElement("SPAN");
        this.txtCor = document.createTextNode("check");
        this.className = "check";
        this.spanCor.appendChild(this.txtCor);
        this.li.appendChild(this.spanCor);
        this.id = ++entryId;
        this.innerEnt = { id: null, text: null };
        this.innerEnt.id = this.id;
        this.innerEnt.text = text;
        listIN.push(this.innerEnt);
        this.span.addEventListener("click", () => {
            if (listIN == list && ul == myUL) {
                list.splice(list.findIndex(x => x.id === this.id), 1);
                localStorage.setItem("todo", JSON.stringify(list));
            } else if (listIN == completeList && ul == myULCheck) {
                completeList.splice(completeList.findIndex(x => x.id === this.id), 1);
                localStorage.setItem("Completetodo", JSON.stringify(completeList));
            }
            this.li.remove();
        });
        this.spanCor.addEventListener("click", () => {
            var remove;
            if (listIN == list && ul == myUL) {
                remove = list.splice(list.findIndex(x => x.id === this.id), 1);
                new todo(myULCheck, remove[0].text, completeList);
            } else
            if (listIN == completeList && ul == myULCheck) {
                remove = completeList.splice(completeList.findIndex(x => x.id === this.id), 1);
                new todo(myUL, remove[0].text, list);
            }
            localStorage.setItem("todo", JSON.stringify(list));
            localStorage.setItem("Completetodo", JSON.stringify(completeList));
            this.li.remove();
        });
    }
}
addBtn.addEventListener("click", () => {
    new todo(myUL, `${inputed.value}`, list);
    localStorage.setItem("todo", JSON.stringify(list));
    inputed.value = "";
})
searchTask.addEventListener("click", () => {
    searchFun(`${inputed.value}`, "myUL");
    searchFun(`${inputed.value}`, "myULCheck");
})

function searchFun(myinput, ul) {
    var txtValue;
    var ulist = document.getElementById(ul);
    var li = ulist.querySelectorAll("li");
    for (var i = 0; i < li.length; i++) {
        console.log(i);
        txtValue = li[i].childNodes[0].nodeValue;
        console.log();
        if (txtValue != null) {
            if (txtValue.indexOf(myinput) > -1) {
                li[i].style.display = "list-item";
            } else {
                li[i].style.display = "none";
            }
        }
    }
}
window.addEventListener("load", () => {
    gettedList = JSON.parse(localStorage.getItem('todo'));
    gettedComplete = JSON.parse(localStorage.getItem('Completetodo'));
    let newEntry = null;
    if (gettedList != null) {
        for (let i = 0; i < gettedList.length; i++) {
            newEntry = new todo(myUL, gettedList[i].text, list);
        }
    }
    if (gettedComplete != null) {
        for (let i = 0; i < gettedComplete.length; i++) {
            newEntry = new todo(myULCheck, gettedComplete[i].text, completeList);
        }
    }


});