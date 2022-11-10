const room = document.querySelector("#selector");
const submitButton = document.querySelector("#button");

submitButton.addEventListener("click", () => {
    let roomName = room.value;
    window.location.pathname = "/chat/" + roomName + "/";
});