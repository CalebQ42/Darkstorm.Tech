var darkMode =
	window.matchMedia("(prefers-color-scheme: dark)").matches ?? true;
var sidebarExtended = false;
var authToken = "";

function onLoad() {
	if (!darkMode) {
		setTheme();
	}
}

async function setTheme() {
	var styl = document.getElementById("themeLink");
	var them = document.getElementById("themeButton");
	if (darkMode) {
		styl?.setAttribute("href", "https://darkstorm.tech/dark-mode.css");
		them.innerText = "Light Mode";
	} else {
		styl?.setAttribute("href", "https://darkstorm.tech/light-mode.css");
		them.innerText = "Dark Mode";
	}
}

function swapTheme() {
	darkMode = !darkMode;
	setTheme();
}

async function expandSidebar() {
	var sidebar = document.getElementById("sidebar");
	var cover = document.getElementById("sidebarCover");
	if (sidebar == null || cover == null) {
		return;
	}
	if (sidebar.classList.contains("extended")) {
		cover.style.visibility = "hidden";
		cover.style.opacity = 0;
	} else {
		cover.style.visibility = "visible";
		cover.style.opacity = 0.25;
	}
	sidebar.classList.toggle("extended");
	sidebar.classList.toggle("elevated");
}

function blogEditorResize() {
	let elem = document.getElementById("blogEditor");
	let newHeight = elem.scrollHeight;
	if (newHeight > elem.style.height) {
		newHeight += 2;
	}
	elem.style.height = newHeight + "px";
}
