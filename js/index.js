

// HTML elements 
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submit = document.getElementById("submit");
var tableContent  = document.getElementById("tableContent");

// app variable 
var bookMarkList =[];
if (localStorage.getItem("websites") != null){
    var bookMarkList = JSON.parse(localStorage.getItem("websites"));
}
 displayAll(); 

// functions 
function addWebsite(){
    if(validate(nameRegex,siteName) &&
       validate(urlRegex,siteURL)){
        var bookMark ={ 
            Name : siteName.value,
            URL : siteURL.value,
        }
        bookMarkList.push(bookMark);
        localStorage.setItem("websites" , JSON.stringify(bookMarkList));     
        displayBookmark(bookMarkList.length -1);
        clearInput();
    }
    else{
    }
}
    
function displayBookmark(index){
    var bookMarkHTML = `
    <tr>
    <td>${index + 1}</td>
    <td>${bookMarkList[index].Name}</td>
    <td>
    <a href="${bookMarkList[index].URL}"  target="_blank">
    <button class="btn btn-visit">
            <i class="fa-solid fa-eye"></i>
            Visit
        </button>
    </a>

        
    </td>
    <td>
        <button class="btn btn-danger" onclick="deleteBookmark(${index});">
            <i class="fa-solid fa-trash-can"></i>    
            Delete
        </button>
    </td>
</tr>
    `
    tableContent.innerHTML += bookMarkHTML;
}
function displayAll(){
    for(var i =0;i< bookMarkList.length ; i++){
        displayBookmark(i)
    }

}

function clearInput(){
    siteName.value= "";
    siteURL.value = "";
}


function deleteBookmark(index){
    // delete from bookMarkList
    bookMarkList.splice(index, 1);
    // update localStorage
    localStorage.setItem("websites",JSON.stringify(bookMarkList));
    // update Html 
    tableContent.innerHTML = "";
    displayAll();
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[a-z]{3,}\.(com|net|dev)$/;

function validate (regex,element){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false
    }
}
