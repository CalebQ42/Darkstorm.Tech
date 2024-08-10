// @ts-check

var darkMode =
	window.matchMedia("(prefers-color-scheme: dark)").matches ?? true;
var sidebarExtended = false;

function onLoad() {
	// setToPath(window.location.pathname, false)
	if (!darkMode) {
		setTheme();
	}
	setSidebarWidth();
	window.addEventListener("popstate", () =>
		setToPath(window.location.pathname, false),
	);
}

function setSidebarWidth() {
	var sideContent = document.getElementById("sidebarContent");
	if (sideContent == null) {
		return;
	}
	sideContent.style.width = Math.min(window.innerWidth, 400).toString() + "px";
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
	if (!sidebarExtended) {
		sidebarExtended = true;
		sidebar.animate(
			[{ width: sidebar.style.width }, { width: "min(100%, 400px)" }],
			300,
		).onfinish = () => {
			if (sidebar != null) sidebar.style.width = "min(100%, 400px)";
		};
		cover.style.visibility = "visible";
		cover.animate(
			[{ opacity: cover.style.opacity }, { opacity: "40%" }],
			300,
		).onfinish = () => {
			if (cover != null) cover.style.opacity = "40%";
		};
	} else {
		sidebarExtended = false;
		sidebar.animate(
			[{ width: sidebar.style.widows }, { width: "0px" }],
			300,
		).onfinish = () => {
			if (sidebar != null) sidebar.style.width = "0px";
		};
		cover.animate(
			[{ opacity: cover.style.opacity }, { opacity: "0%" }],
			300,
		).onfinish = () => {
			if (cover != null) {
				cover.style.opacity = "0%";
				cover.style.visibility = "hidden";
			}
		};
	}
}

/**
 * @param {string} path
 * @param {boolean} addToHistory
 */
function setToPath(path, addToHistory = true) {
	if (sidebarExtended) {
		expandSidebar();
	}
	if (path.startsWith("/")) {
		path = path.substring(1);
	}
	if (path.endsWith("/")) {
		path = path.substring(0, path.length - 1);
	}
	setContent(
		"https://darkstorm.tech/" + path + "?contentOnly=true",
		path,
		addToHistory,
	);
	return false;
}

/**
 * @param {string} url
 * @param {string} path
 * @param {boolean} addToHistory
 */
async function setContent(url, path, addToHistory = true) {
	if (addToHistory) {
		history.pushState(path, "", "https://darkstorm.tech/" + path);
	}
	window.fetch(url).then(async (resp) => {
		var content = document.getElementById("content");
		if (content == null) {
			return;
		}
		var txt = await resp.text();
		var json = JSON.parse(txt);
		content.innerHTML = json.content;
		document.title = json.title ?? "Darkstorm.tech";
		document
			.getElementById("favicon")
			?.setAttribute(
				"href",
				json.favicon ?? "https://darkstorm.tech/favicon.png",
			);
		if (path == "portfolio") setupPortfolioSelector();
	});
}

async function setupPortfolioSelector() {
	var sel = document.getElementById("langSelect");
	if (sel == null) {
		return;
	}
	sel.addEventListener("change", () => {
		// @ts-ignore
		setContent(
			"https://darkstorm.tech/portfolio/?lang=" +
				sel.value +
				"&contentOnly=true",
			"portfolio",
			false,
		);
	});
}
