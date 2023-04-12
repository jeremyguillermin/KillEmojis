let emojiClass = ".x1kky2od";

function removeEmojis() {
    let emojis = document.querySelectorAll(emojiClass);
    for (let i = 0; i < emojis.length; i++) {
        emojis[i].parentNode.removeChild(emojis[i]);
    }
}

setInterval(removeEmojis, 1000);