// @ts-check

var darkMode =
  window.matchMedia("(prefers-color-scheme: dark)").matches ?? true;
var sidebarExtended = false;

function onLoad() {
  if (!darkMode) {
    setTheme();
  }
  setSidebarWidth();
  // window.addEventListener("popstate", () =>
  //   setToPath(window.location.pathname, false),
  // );
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
