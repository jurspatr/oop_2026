const playBtn = document.getElementById("playBtn") as HTMLButtonElement | null;
const closePlayBtn = document.getElementById("closePlayBtn") as HTMLButtonElement | null;
const playDialog = document.getElementById("playDialog") as HTMLDialogElement | null;

const singleplayerTab = document.getElementById("singleplayerTab") as HTMLButtonElement | null;
const schoolModeTab = document.getElementById("schoolModeTab") as HTMLButtonElement | null;

const singleplayerFields = document.getElementById("singleplayerFields") as HTMLDivElement | null;
const schoolModeFields = document.getElementById("schoolModeFields") as HTMLDivElement | null;

const vikingName = document.getElementById("vikingName") as HTMLInputElement | null;
const password = document.getElementById("password") as HTMLInputElement | null;
const roomCode = document.getElementById("roomCode") as HTMLInputElement | null;
const startAdventureBtn = document.getElementById("startAdventureBtn") as HTMLButtonElement | null;
const playForm = document.getElementById("playForm") as HTMLFormElement | null;

let currentMode: "singleplayer" | "school" = "singleplayer";

function updateMode(mode: "singleplayer" | "school"): void {
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

function updateStartButtonState(): void {
  if (!startAdventureBtn || !vikingName) return;

  const hasName = vikingName.value.trim().length > 0;
  const hasPassword = password ? password.value.trim().length > 0 : false;
  const hasRoomCode = roomCode ? roomCode.value.trim().length > 0 : false;

  const isValid =
    currentMode === "singleplayer"
      ? hasName && hasPassword
      : hasName && hasRoomCode;

  startAdventureBtn.classList.toggle("enabled", isValid);
}

playBtn?.addEventListener("click", () => {
  playDialog?.showModal();
  updateMode("singleplayer");
});

closePlayBtn?.addEventListener("click", () => {
  playDialog?.close();
});

singleplayerTab?.addEventListener("click", () => {
  updateMode("singleplayer");
});

schoolModeTab?.addEventListener("click", () => {
  updateMode("school");
});

vikingName?.addEventListener("input", updateStartButtonState);
password?.addEventListener("input", updateStartButtonState);
roomCode?.addEventListener("input", updateStartButtonState);

playForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const hasName = vikingName ? vikingName.value.trim().length > 0 : false;
  const hasPassword = password ? password.value.trim().length > 0 : false;
  const hasRoomCode = roomCode ? roomCode.value.trim().length > 0 : false;

  const valid =
    currentMode === "singleplayer"
      ? hasName && hasPassword
      : hasName && hasRoomCode;

  if (!valid) return;

  if (currentMode === "singleplayer") {
    alert("Starting singleplayer adventure...");
  } else {
    alert("Joining school mode adventure...");
  }

  playDialog?.close();
});

playDialog?.addEventListener("click", (event: MouseEvent) => {
  const rect = playDialog.getBoundingClientRect();
  const clickedInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!clickedInside) {
    playDialog.close();
  }
});