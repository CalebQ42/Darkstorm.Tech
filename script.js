// @ts-check

function onLoad(){
    resizeContentSpace()
}

var darkMode = true;

function switchMode(){
    darkMode = !darkMode
    var styl = document.getElementById("styleLink")
    var them = document.getElementById("theme")
    if(them == null){
        return
    }
    if (darkMode){
        styl?.setAttribute("href", "dark-mode.css")
        them.innerText = "Light Mode"
    }else{
        styl?.setAttribute("href", "light-mode.css")
        them.innerText = "Dark Mode"
    }
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