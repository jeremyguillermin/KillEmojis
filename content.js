// Facebook
let emojiClass = ".x1kky2od, img[alt^='\\uD83E\\uDD']";
function removeEmojis() {
    let emojis = document.querySelectorAll(emojiClass);
    for (let i = 0; i < emojis.length; i++) {
        emojis[i].parentNode.removeChild(emojis[i]);
    }
}
var emojis = document.querySelectorAll('img[alt*="🙂"]');
for (var i = 0; i < emojis.length; i++) {
  emojis[i].parentNode.removeChild(emojis[i]);
}

// Twitter
function removeEmojis() {
  const emojis = document.querySelectorAll('img[src*="/emoji/"]');
  emojis.forEach(emoji => {
    const emojiParent = emoji.parentElement;
    if (emojiParent !== null) {
      const emojiText = emoji.alt;
      emojiParent.textContent = emojiParent.textContent.replace(emojiText, '');
    }
  });
}
removeEmojis();

// Linkendin

// ##################################
removeEmojis(); // Exe function 
setInterval(removeEmojis, 1000);