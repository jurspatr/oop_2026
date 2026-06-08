var settingsBtn = document.getElementById("settingsBtn");
var closeSettingsBtn = document.getElementById("closeSettingsBtn");
var settingsDialog = document.getElementById("settingsDialog");
settingsBtn === null || settingsBtn === void 0 ? void 0 : settingsBtn.addEventListener("click", function () {
    settingsDialog === null || settingsDialog === void 0 ? void 0 : settingsDialog.showModal();
});
closeSettingsBtn === null || closeSettingsBtn === void 0 ? void 0 : closeSettingsBtn.addEventListener("click", function () {
    settingsDialog === null || settingsDialog === void 0 ? void 0 : settingsDialog.close();
});
settingsDialog === null || settingsDialog === void 0 ? void 0 : settingsDialog.addEventListener("click", function (event) {
    var rect = settingsDialog.getBoundingClientRect();
    var clickedInside = event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
    if (!clickedInside) {
        settingsDialog.close();
    }
});
