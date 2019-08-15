const emailElement = document.getElementById("email");
const nameElement = document.getElementById("name");
const commentElement = document.getElementById("comment");
const button = document.getElementById("submit_button");
const forumContainer = document.getElementById("forum_container");
let typeElement = document.getElementById("radio_result");
let elements = [emailElement, nameElement, commentElement, typeElement];
let index = 0;



//Set database object here
const database = firebase.database().ref();

//when submit button is pressed, database is updated
button.addEventListener("click",updateDB);

//when database is updated, post is displayed
database.on('child_added', addMessagesToBoard);

//Hides input for type of post
typeElement.style.display = "none";


///////////////////////////////////          FUNCTIONS          ///////////////////////////////////


//Updates typeElement based on radio button selection
function updateTypeRadio(radioValue) {
    typeElement.value = radioValue;
  }

//for updating database
function updateDB(event){

    event.preventDefault();

    for (let i in elements) {
        if (elements[i].value == "") {
            alert("Please fill in all inputs.");
            return;
        }
    }

    const email             = emailElement.value;
    const name              = nameElement.value;
    const comment           = commentElement.value;
    const type              = typeElement.value; 

    emailElement.value = "";
    nameElement.value  = "";
    commentElement.value = "";
    typeElement.value = "";

    console.log(email + " : " + name + " : " + comment + " : " + type);

    //Update database here
    const value = {
        EMAIL: email,
        NAME: name,
        COMMENT: comment,
        TYPE : type
    }
    database.push(value);

}

//for printing messages to forum
function addMessagesToBoard(rowData) {
    const row = rowData.val();
    const email = row.EMAIL;
    const name = row.NAME;
    const comment = row.COMMENT;
    const type = row.TYPE;
    
    let divElement = document.createElement('div');
        //divElement.className += "forum_posts";
        divElement.classList.add("forum_posts", type, "all");
        divElement.id = "post" + index.toString();
    forumContainer.appendChild(divElement);
    let divMessage = document.getElementById(divElement.id);

    let childDivElement = document.createElement('div');
        childDivElement.className = "forum_header";
        childDivElement.id = "child_post" + index.toString();
        childDivElement.style.display = "flex";
        childDivElement.style.flexFlow = "row wrap";
        //childDivElement.style.width = "100%";
        childDivElement.style.justifyContent = "space-between";
    divMessage.appendChild(childDivElement);
    let childDivMessage = document.getElementById(childDivElement.id);

    let pElementName = document.createElement('p');
        pElementName.innerText = `${name}`;
        //pElementName.style.justifySelf = "flex-end";
        pElementName.style.margin = "0";
    childDivMessage.appendChild(pElementName);

    let pElementEmail = document.createElement('p');
        pElementEmail.innerText = `${email}`;
        pElementEmail.style.justifyContent = "flex-end";
        pElementEmail.style.margin = "0";
    childDivMessage.appendChild(pElementEmail);

    let pElementComment = document.createElement('p');
        pElementComment.innerText = `${comment}`;
    divMessage.appendChild(pElementComment);
    
    index++;
}

//filters content of forum
function filterContent(idName) {
    event.preventDefault();
    let string = idName.slice(9);

    let allElements = document.getElementsByClassName("all");
    for(let i = 0; i < allElements.length; i++) {
        console.log(allElements[i]);
        allElements[i].style.display = "none";
    }

    let selectedElements = document.getElementsByClassName(string);
    for(let i = 0; i < selectedElements.length; i++) {
        //console.log(selectedElements[i]);
        selectedElements[i].style.display = "block";
    }
    //selectedElements.style.display = "flex";
}
