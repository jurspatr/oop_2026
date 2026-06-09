var playBtn = document.getElementById("playBtn");
var closePlayBtn = document.getElementById("closePlayBtn");
var playDialog = document.getElementById("playDialog");
var singleplayerTab = document.getElementById("singleplayerTab");
var schoolModeTab = document.getElementById("schoolModeTab");
var singleplayerFields = document.getElementById("singleplayerFields");
var schoolModeFields = document.getElementById("schoolModeFields");
var vikingName = document.getElementById("vikingName");
var password = document.getElementById("password");
var roomCode = document.getElementById("roomCode");
var startAdventureBtn = document.getElementById("startAdventureBtn");
var playForm = document.getElementById("playForm");
var currentMode = "singleplayer";
function updateMode(mode) {
    currentMode = mode;
    if (singleplayerTab && schoolModeTab) {
        singleplayerTab.classList.toggle("active", mode === "singleplayer");
        schoolModeTab.classList.toggle("active", mode === "school");
    }
    if (singleplayerFields && schoolModeFields) {
        singleplayerFields.hidden = mode !== "singleplayer";
        schoolModeFields.hidden = mode !== "school";
    }
    updateStartButtonState();
}
function updateStartButtonState() {
    if (!startAdventureBtn || !vikingName)
        return;
    var hasName = vikingName.value.trim().length > 0;
    var hasPassword = password ? password.value.trim().length > 0 : false;
    var hasRoomCode = roomCode ? roomCode.value.trim().length > 0 : false;
    var isValid = currentMode === "singleplayer"
        ? hasName && hasPassword
        : hasName && hasRoomCode;
    startAdventureBtn.classList.toggle("enabled", isValid);
    startAdventureBtn.disabled = !isValid;
}
playBtn === null || playBtn === void 0 ? void 0 : playBtn.addEventListener("click", function () {
    playDialog === null || playDialog === void 0 ? void 0 : playDialog.showModal();
    updateMode("singleplayer");
});
closePlayBtn === null || closePlayBtn === void 0 ? void 0 : closePlayBtn.addEventListener("click", function () {
    playDialog === null || playDialog === void 0 ? void 0 : playDialog.close();
});
singleplayerTab === null || singleplayerTab === void 0 ? void 0 : singleplayerTab.addEventListener("click", function () {
    updateMode("singleplayer");
});
schoolModeTab === null || schoolModeTab === void 0 ? void 0 : schoolModeTab.addEventListener("click", function () {
    updateMode("school");
});
vikingName === null || vikingName === void 0 ? void 0 : vikingName.addEventListener("input", updateStartButtonState);
password === null || password === void 0 ? void 0 : password.addEventListener("input", updateStartButtonState);
roomCode === null || roomCode === void 0 ? void 0 : roomCode.addEventListener("input", updateStartButtonState);
playForm === null || playForm === void 0 ? void 0 : playForm.addEventListener("submit", function (event) {
    var _a, _b, _c;
    event.preventDefault();
    var name = (_a = vikingName === null || vikingName === void 0 ? void 0 : vikingName.value.trim()) !== null && _a !== void 0 ? _a : "";
    var enteredPassword = (_b = password === null || password === void 0 ? void 0 : password.value.trim()) !== null && _b !== void 0 ? _b : "";
    var enteredRoomCode = (_c = roomCode === null || roomCode === void 0 ? void 0 : roomCode.value.trim()) !== null && _c !== void 0 ? _c : "";
    var valid = currentMode === "singleplayer"
        ? name.length > 0 && enteredPassword.length > 0
        : name.length > 0 && enteredRoomCode.length > 0;
    if (!valid)
        return;
    var params = new URLSearchParams({
        name: name,
        mode: currentMode
    });
    window.location.href = "intro.html?".concat(params.toString());
});
playDialog === null || playDialog === void 0 ? void 0 : playDialog.addEventListener("click", function (event) {
    if (event.target === playDialog) {
        playDialog.close();
    }
});
