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
    event.preventDefault();
    var hasName = vikingName ? vikingName.value.trim().length > 0 : false;
    var hasPassword = password ? password.value.trim().length > 0 : false;
    var hasRoomCode = roomCode ? roomCode.value.trim().length > 0 : false;
    var valid = currentMode === "singleplayer"
        ? hasName && hasPassword
        : hasName && hasRoomCode;
    if (!valid)
        return;
    if (currentMode === "singleplayer") {
        alert("Starting singleplayer adventure...");
    }
    else {
        alert("Joining school mode adventure...");
    }
    playDialog === null || playDialog === void 0 ? void 0 : playDialog.close();
});
playDialog === null || playDialog === void 0 ? void 0 : playDialog.addEventListener("click", function (event) {
    var rect = playDialog.getBoundingClientRect();
    var clickedInside = event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
    if (!clickedInside) {
        playDialog.close();
    }
});
