var darkMode =
	window.matchMedia("(prefers-color-scheme: dark)").matches ?? true;
var sidebarExtended = false;
var authToken = "";

function onLoad() {
	if (!darkMode) {
		setTheme();
	}
	setSidebarWidth();
	document.addEventListener("htmx:configRequest", function (e) {
		console.log(e);
		if (e.detail.path.startsWith("https://api.darkstorm.tech") && authToken) {
			e.detail.headers["Authorization"] = "Bearer " + authToken;
		}
	});
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
 * @param {SubmitEvent} e
 */
function login(e) {
	e.preventDefault();
	let u = document.getElementById("usernameInput").value;
	let p = document.getElementById("passwordInput").value;
	let error = document.getElementById("formResult");
	if (!u || !p) {
		return;
	}
	fetch(
		new Request("https://api.darkstorm.tech/user/login", {
			method: "POST",
			body: JSON.stringify({ username: u, password: p }),
		}),
	)
		.then(async (resp) => {
			let res = JSON.parse(await resp.text());
			//TODO: go to editor page
			if (resp.status != 200) {
				error.innerHTML = res.errorMsg;
				return;
			}
			if (!res) {
				console.log("Something went wrong2");
				return;
			}
			htmx.ajax("GET", "/editor", {
				target: "#content",
				source: "#invisiblePusher",
			});
		})
		.catch((error) => {
			console.log(`Something went wrong: ${error}`);
		});
}
