


let userInput=document.getElementById('user-input');
let userAvatar=document.getElementById('avatar');
let demo=document.getElementById('demo');
function myImage(input){
    // let selectedImages = userInput.files;
    if(input.files && input.files[0]){
        var reader = new FileReader();
        reader.onload=(e)=>{
            userAvatar.src = e.target.result;
        };
    reader.readAsDataURL(input.files[0]);
    demo.innerText="You're Welcome";
    }
}

let menuBar = document.getElementById("menu");
let togglePage = document.getElementById("toggle-page");
let listElement = document.querySelectorAll("ul li")
let times = document.getElementById("times");
menuBar.onclick=function(){
    togglePage.style.right="0"
}
times.onclick=function(){
    togglePage.style.right="-200px";
}
listElement.forEach(n=>n.onclick=()=>{
    // times.parentElement.remove();
})