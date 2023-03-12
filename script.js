function onLoad(){
    window.theme
    resizeContentSpace()
}

var darkMode = true;

function switchMode(){
    darkMode = !darkMode
    if (darkMode){
        document.getElementById("styleLink").setAttribute("href", "dark-mode.css")
        document.getElementById("theme").innerText = "Light Mode"
    }else{
        document.getElementById("styleLink").setAttribute("href", "light-mode.css")
        document.getElementById("theme").innerText = "Dark Mode"
    }
}

function doStuff(){
    alert("This is a TEST. STOP CLICKING THINGS THAT AREN'T MEANT TO BE CLICKED")
}

function resizeContentSpace(){
    let conHeight = getTotalHeight("header") + getTotalHeight("footer") + getTotalHeight("content")
    if(conHeight < window.innerHeight) {
        document.getElementById("spacer")?.setAttribute("style", "height:"+(window.innerHeight - conHeight)+"px")
    }else{
        document.getElementById("spacer")?.setAttribute("style", "height:0px")
    }
}

/**
 * @param {string} id
 */
function getTotalHeight(id){
    let elem = document.getElementById(id)
    if (elem == null){
        return 0
    }
    var sty = window.getComputedStyle(elem)
    var height = elem.clientHeight
    height += parseInt(sty.marginTop)
    height += parseInt(sty.marginBottom)
    return height
}