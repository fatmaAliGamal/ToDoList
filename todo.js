var myNodelist = document.getElementsByTagName("LI");
var btnAdd = document.getElementById("add-task");
var ul = document.querySelector('ul');
var inputValue = document.getElementById("myInput");
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));
let itemsArrayCom = localStorage.getItem('itemsCom') ? JSON.parse(localStorage.getItem('itemsCom')) : [];
localStorage.setItem('itemsCom', JSON.stringify(itemsArrayCom));
const dataCom = JSON.parse(localStorage.getItem('itemsCom'));
var myULCheck = document.getElementById("myULCheck");
var myUList = document.getElementById("myUL");
var searchtask = document.getElementById("search-task");
var i;
var li;
var flagBtn;
var closeBtn;
var flagCheck = 0;
const NodeList = (text) => {
    li = document.createElement('li');
    li.textContent = text;
    myUList.appendChild(li);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    var spanCor = document.createElement("SPAN");
    var txtCor = document.createTextNode("check");
    spanCor.className = "check";
    spanCor.appendChild(txtCor);
    li.appendChild(spanCor);
};
const NodeListCom = (text) => {
    li = document.createElement('li');
    li.textContent = text;
    myULCheck.appendChild(li);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "closeCom";
    span.appendChild(txt);
    li.appendChild(span);
    var spanCor = document.createElement("SPAN");
    var txtCor = document.createTextNode("Uncheck");
    spanCor.className = "checkCom";
    spanCor.appendChild(txtCor);
    li.appendChild(spanCor);
}
btnAdd.addEventListener("click", (e) => {
    flagBtn = true;
    update();
    btnDelete();
    btnCheck()
})

function update() {
    if (flagBtn == true) {
        itemsArray.push(inputValue.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        NodeList(inputValue.value);
        inputValue.value = "";
    } else {
        if (dataCom != null) {
            dataCom.forEach((item) => {
                NodeListCom(item);
                btnDeleteCom()
                btnCheckCom()
            })
        }
        if (data != null) {
            data.forEach((item) => {
                flagBtn = false;
                NodeList(item);
                btnDelete()
                btnCheck()
            });
        }
    }

}

function btnDelete() {
    if (itemsArray != null) {
        itemsArray.forEach((item, index) => {
            var closeBtn = document.getElementsByClassName("close")[index];
            if (closeBtn != null) {
                var liParent = closeBtn.parentElement;
                closeBtn.onclick = () => {
                    myUList.removeChild(liParent);
                    itemsArray.splice(index, 1);
                    localStorage.setItem('items', JSON.stringify(itemsArray));

                }
            }
        })
    }
}

function btnDeleteCom() {
    if (itemsArrayCom != null) {
        itemsArrayCom.forEach((item, index) => {
            var closeBtn = document.getElementsByClassName("closeCom")[index];
            if (closeBtn != null) {
                var liParent = closeBtn.parentElement;
                closeBtn.onclick = () => {
                    myULCheck.removeChild(liParent);
                    itemsArrayCom.splice(index, 1);
                    localStorage.setItem('itemsCom', JSON.stringify(itemsArrayCom));
                }
            }
        })
    }
}

function btnCheck() {
    if (itemsArray != null) {
        itemsArray.forEach((item, index) => {
            var checkBtn = document.getElementsByClassName("check")[index];
            if (checkBtn != null) {
                var liParent = checkBtn.parentElement;
                checkBtn.onclick = (ev) => {
                    console.log("1" + itemsArray[index]);
                    if (itemsArray[index] && index >= 0) {
                        itemsArrayCom.push(itemsArray[index]);
                        NodeListCom(itemsArray[index]);
                        itemsArray.splice(index, 1);
                        myUList.removeChild(liParent);
                        localStorage.setItem('items', JSON.stringify(itemsArray));
                        localStorage.setItem('itemsCom', JSON.stringify(itemsArrayCom));
                        btnCheckCom()
                        btnDeleteCom()
                    }
                }
            }
        })
    }
}

function btnCheckCom() {
    if (itemsArrayCom != null) {
        itemsArrayCom.forEach((item, index) => {
            var checkBtn = document.getElementsByClassName("checkCom")[index];
            if (checkBtn != null) {
                var liParent = checkBtn.parentElement;
                checkBtn.onclick = (ev) => {
                    // if (index == 1) index++;
                    console.log(index);
                    if (itemsArrayCom[index]) {
                        itemsArray.push(itemsArrayCom[index]);
                        NodeList(itemsArrayCom[index])
                        itemsArrayCom.splice(index, 1);
                        myULCheck.removeChild(liParent);
                        localStorage.setItem('items', JSON.stringify(itemsArray));
                        localStorage.setItem('itemsCom', JSON.stringify(itemsArrayCom));
                        btnCheck()
                        btnDelete()
                    }
                }
            }
        })

    }
}
update();
searchtask.addEventListener("click", () => {
    var inputSearch = inputValue.value;
    itemsArray.forEach(element => {
        if (element == inputSearch) {

        }
    });
})