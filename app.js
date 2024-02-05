// items
let items = JSON.parse(localStorage.getItem("lists")) || [];
const setItems = (listItems) => {
    items = listItems;
    localStorage.setItem("lists", JSON.stringify(items));
}

// toggleEditBtn
let toggleEditBtn = false;

// footer
const footer = document.getElementsByClassName("footer")[0];
const handleFooter = () => {
    footer.innerHTML = `<h1>
                            ${items.length > 1 ? `${items.length} items` : `${items.length} item`}
                        </h1>`;
}
handleFooter();


const displayItems = (items, id = null) => {
    const unList = document.getElementById("unList");
    
    handleFooter(); 
    
    if(items.length === 0) {
        const p = document.createElement("p");
        p.innerText = "Items not found";
        p.style.textAlign = "center";
        p.style.marginTop = "4rem";
        p.style.fontSize = "2.5rem";
        unList.appendChild(p);
        return;
    }

    items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
                        ${item.id === id ? "" : `<input type="checkbox" ${item.checked ? "checked" : ""} onclick=toggleCheck(${item.id})>`}

                        ${item.id === id ? ""  : item.checked ? `<label id=label${item.id} style="text-decoration: line-through;" >${item.item}</label>` : `<label id=label${item.id}></label>`}

                        <img class="deleteBtn" id=delete${item.id} role="button" src="icons/bin.png" onclick="deleteBtn(${item.id})" onmouseover="handleDeleteHoverOver(${item.id})" onmouseout="handleDeleteHoverOut(${item.id})">
                        `;
        li.setAttribute("id",`${item.id}`);
        unList.appendChild(li);
        document.getElementById(`label${item.id}`).innerText = `${item.item}`;
    }); 
}

displayItems(items);

// reset displayItems 
const resetDisplayItems = () => {
    const unList = document.getElementById("unList");
    unList.innerHTML = "";
}

// toggleCheck
const toggleCheck = (id) => {
    const newItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(newItems);

    resetDisplayItems();
    displayItems(items, id);
}

// deleteBtn
const deleteBtn = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    document.getElementById(`${id}`).style.display = "none";
    setItems(newItems);

    resetDisplayItems();
    displayItems(items);
}

// Stopping form to reload
const addForm = document.getElementById("addForm");
const handleAddForm = (e) => {
    e.preventDefault();
}
addForm.addEventListener("submit", handleAddForm);

// addItem 
const addItem = () => {
    const id = items.length ? items.length + 1 : 1;
    const item = document.getElementById("addInput").value;
    const itemsObj = {id, checked: false, item};
    const newItems = [...items, itemsObj];
    setItems(newItems);
    resetDisplayItems();
    displayItems(items);
    document.getElementById("addInput").value = "";
}

// handleSearch 
const handleSearch = () => {
    const searchInput = document.getElementById("searchInput");
    const searchValue = (searchInput.value).toLowerCase();
    
    const filterItems = items.filter((item) => (((item.item).toLowerCase()).includes(searchValue)));

    resetDisplayItems();
    displayItems(filterItems);
}

// handleHoverAdd
const handleAddHoverOver = (img) => {
    img.src = "icons/plus-hover.png";
}

const handleAddHoverOut = (img) => {
    img.src = "icons/plus.png";
}

// handleHoverDelete
const handleDeleteHoverOver = (id) => {
    const imgDelete = document.getElementById(`delete${id}`);
    imgDelete.src = "icons/bin-hover.png";
}

const handleDeleteHoverOut = (id) => {
    const imgDelete = document.getElementById(`delete${id}`);
    imgDelete.src = "icons/bin.png";
}