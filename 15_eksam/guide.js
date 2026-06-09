var guideBtn = document.getElementById("guideBtn");
var closeGuideBtn = document.getElementById("closeGuideBtn");
var readyBtn = document.getElementById("readyBtn");
var guideDialog = document.getElementById("guideDialog");
guideBtn === null || guideBtn === void 0 ? void 0 : guideBtn.addEventListener("click", function () {
    guideDialog === null || guideDialog === void 0 ? void 0 : guideDialog.showModal();
});
closeGuideBtn === null || closeGuideBtn === void 0 ? void 0 : closeGuideBtn.addEventListener("click", function () {
    guideDialog === null || guideDialog === void 0 ? void 0 : guideDialog.close();
});
readyBtn === null || readyBtn === void 0 ? void 0 : readyBtn.addEventListener("click", function () {
    guideDialog === null || guideDialog === void 0 ? void 0 : guideDialog.close();
});
guideDialog === null || guideDialog === void 0 ? void 0 : guideDialog.addEventListener("click", function (event) {
    var rect = guideDialog.getBoundingClientRect();
    var clickedInside = event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
    if (!clickedInside) {
        guideDialog.close();
    }
});
