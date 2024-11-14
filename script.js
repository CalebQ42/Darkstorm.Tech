var darkMode =
	window.matchMedia("(prefers-color-scheme: dark)").matches ?? true;
var sidebarExtended = false;
var authToken = "";

function onLoad() {
	if (!darkMode) {
		setTheme();
	}
	document.addEventListener("htmx:configRequest", function (e) {
		console.log(e);
		if (e.detail.path.startsWith("https://api.darkstorm.tech") && authToken) {
			e.detail.headers["Authorization"] = "Bearer " + authToken;
		}
	});
}

async function setTheme() {
	var styl = document.getElementById("themeLink");
	var them = document.getElementById("themeButton");
	if (them == null || styl == null) {
		return;
	}
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
}

function blogEditorResize() {
	console.log("YODLE");
	let elem = document.getElementById("blogEditor");
	console.log(elem.style.height);
	console.log(elem.scrollHeight);
	if (elem.clientHeight < elem.scrollHeight) {
		elem.style.height = elem.scrollHeight + "px";
	}
}
