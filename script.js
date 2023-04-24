// @ts-check

function onLoad(){
    setTheme(darkMode)
    getPage()
}

var darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ?? true
var sidebarExtended = false

/**
 * @param {boolean} dark
 */
function setTheme(dark){
    var styl = document.getElementById("styleLink")
    var them = document.getElementById("theme")
    if(them == null){
        return
    }
    if (dark){
        styl?.setAttribute("href", "https://darkstorm.tech/dark-mode.css")
        them.innerText = "Light Mode"
    }else{
        styl?.setAttribute("href", "https://darkstorm.tech/light-mode.css")
        them.innerText = "Dark Mode"
    }
}

function swapTheme(){
    darkMode = !darkMode
    setTheme(darkMode)
}

function sidebarExtend(){
    var sidebar = document.getElementById("sidebar")
    var cover = document.getElementById("cover")
    if(sidebar == null || cover == null){
        return
    }
    if(!sidebarExtended){
        sidebarExtended = true
        sidebar.animate([{left: sidebar.getAttribute("left")}, {left: "calc(100% - " + getTotalWidth("sidebar") + "px)"}], 300).onfinish = () =>
            sidebar?.setAttribute("style", "left: calc(100% - " + getTotalWidth("sidebar") + "px)")
        cover.animate([{opacity: cover.getAttribute("opacity"), visibility: "visible"}, {opacity: "20%"}], 300).onfinish = () =>
            cover?.setAttribute("style", "visibility: visible; opacity: 20%")
    }else{
        sidebarExtended = false;
        sidebar.animate([{left: sidebar.getAttribute("left")}, {left: "100%"}], 300).onfinish = () =>
            sidebar?.setAttribute("style", "left: 100%")
        cover.animate([{opacity: cover.getAttribute("opacity")}, {opacity: "0%"}], 300).onfinish = () =>
            cover?.setAttribute("style", "visibility: hidden; opacity: 0%")
    }
}

function coverClick(){
    if(sidebarExtended){
        sidebarExtend()
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

/**
 * @param {string} id
 */
function getTotalWidth(id){
    let elem = document.getElementById(id)
    if (elem == null){
        return 0
    }
    var sty = window.getComputedStyle(elem)
    var width = elem.clientWidth
    width += parseInt(sty.marginLeft)
    width += parseInt(sty.marginRight)
    return width
}

function getPage(){
    var content = document.getElementById("content")
    if(content == null){
        return
    }
    var loc = window.location.pathname
    if(loc.startsWith("/")){
        loc = loc.substring(1)
    }
    if(loc.endsWith("/")){
        loc = loc.substring(0, loc.length-1)
    }
    if(loc == ""){
        loc = "default"
    }
    window.fetch("https://api.darkstorm.tech/page/" + loc + "/?key=d5ca268e-5f83-4003-adfc-26b9e6bb47c9").then(async (resp) => {
        if(resp.ok){
            var txt = await resp.text()
            if(content?.innerHTML != undefined){
                content.innerHTML = txt
            }
        }
    })
}