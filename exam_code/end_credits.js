var skipCreditsBtn = document.getElementById("skipCreditsBtn");
var crawl = document.querySelector(".crawl");
function goToStart() {
    window.location.href = "start.html";
}
skipCreditsBtn === null || skipCreditsBtn === void 0 ? void 0 : skipCreditsBtn.addEventListener("click", goToStart);
crawl === null || crawl === void 0 ? void 0 : crawl.addEventListener("animationend", goToStart);
