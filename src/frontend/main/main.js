// Half finished, serve as examples

//const token = localStorage.getItem("token");
const token = "kelvin"
let userdata = []
const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Fetch userdata given the user token
fetch(`http://localhost:8000/todos?token=${token}`)
  .then(response => response.json())
  .then(data => {
    // Process the response data
    userdata = data;

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

// called by onClick event of the Add button in html
function addItemInList(list_id, completed=false){
    //get the list
    const list = document.getElementById(list_id);

    //create the item element and append it to the list
    let item = document.createElement("li");
    item.innerHTML = inputbox.value;
    list.appendChild(item);

    //create the cancel button on the right of each list item
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    item.appendChild(span);

    //clear the search box text
    inputbox.value = "";

    if(completed){
        item.classList.toggle("checked");
    }
}

// add onclick event on the entire list-container

listContainer.addEventListener("click", function(e){
    switch(e.target.tagName){
        case "LI":
            e.target.classList.toggle("checked");
        break;

        case "SPAN":
            e.target.parentElement.remove();
        break;

        default:             
        break;
    }
}, false);