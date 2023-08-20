export const themeEffect = function () {
  // `null` preference implies system (auto)
  const pref = localStorage.getItem("theme");

  if (null === pref) {
    document.documentElement.classList.add("theme-system");
  } else {
    document.documentElement.classList.remove("theme-system");
  }

  if (
    pref === "dark" ||
    (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("pause-transitions");
    document.documentElement.classList.add("dark");
    document.head
      .querySelector("meta[name=theme-color]")
      ?.setAttribute("content", "#1c1c1c");
    togglePreStyles("dark");
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("pause-transitions");
    });
    return "dark";
  } else {
    document.documentElement.classList.add("pause-transitions");
    document.documentElement.classList.remove("dark");
    document.head
      .querySelector("meta[name=theme-color]")
      ?.setAttribute("content", "#fcfcfc");
    togglePreStyles("light");
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("pause-transitions");
    });
    return "light";
  }
};

function togglePreStyles(theme: string) {
  document.querySelectorAll("pre")?.forEach((el) => {
    switch (el.getAttribute("data-theme")) {
      case "light":
        theme === "dark"
          ? el.classList.add("hidden")
          : el.classList.remove("hidden");
        break;
      case "dark":
        theme === "dark"
          ? el.classList.remove("hidden")
          : el.classList.add("hidden");
        break;
      default:
        el.setAttribute("data-theme", "dark");
    }
  });
}
