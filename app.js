const toggleDark=document.querySelector("#toggle-dark");
const body=document.querySelector("body");

document.addEventListener("DOMContentLoaded",()=>{
    actualizarMode();
    toggleDark.addEventListener("click",()=>{
        
    })
});
function actualizarMode(){
    const darkMode=window.matchMedia("(prefers-color-scheme:dark)").matches;
    if(darkMode){
        body.classList.toggle("darkMode");

    }else{
        body.classList.toggle("darkMode")
    }    
}