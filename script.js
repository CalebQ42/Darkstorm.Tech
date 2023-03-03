function onLoad(){
    console.log("yo")
}

var darkMode = true;

function switchMode(){
    darkMode = !darkMode
    if (darkMode){
        document.getElementById("styleLink").setAttribute("href", "dark-mode.css")
        document.getElementById("themeButton").innerText = "Light Mode"
    }else{
        document.getElementById("styleLink").setAttribute("href", "light-mode.css")
        document.getElementById("themeButton").innerText = "Dark Mode"
    }
}