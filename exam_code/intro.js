var _a, _b;
var playerNameText = document.getElementById("playerNameText");
var modeText = document.getElementById("modeText");
var beginJourneyBtn = document.getElementById("beginJourneyBtn");
var backToMenuBtn = document.getElementById("backToMenuBtn");
var params = new URLSearchParams(window.location.search);
var playerName = (_a = params.get("name")) !== null && _a !== void 0 ? _a : "Viking";
var mode = (_b = params.get("mode")) !== null && _b !== void 0 ? _b : "singleplayer";
if (playerNameText) {
    playerNameText.textContent = playerName;
}
if (modeText) {
    modeText.textContent = mode === "school" ? "School Mode" : "Singleplayer";
}
beginJourneyBtn === null || beginJourneyBtn === void 0 ? void 0 : beginJourneyBtn.addEventListener("click", function () {
    window.location.href = "game.html";
});
backToMenuBtn === null || backToMenuBtn === void 0 ? void 0 : backToMenuBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});
