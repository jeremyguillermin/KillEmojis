// Twitter
function removeEmojis() {
  const emojis = document.querySelectorAll('img[src*="/emoji/"]');
  emojis.forEach(emoji => {
    const emojiParent = emoji.parentElement;
    if (emojiParent !== null) {
      const emojiText = emoji.alt;
      const space = document.createTextNode(' '); // Crée un espace
      emojiParent.replaceChild(space, emoji); // Remplace l'emoji par un espace
    }
  });
}
removeEmojis();
setInterval(removeEmojis, 500);


// Facebook
function removeEmojisFacebook() {
  const emojis = document.querySelectorAll('img[src*="/emoji.php"]');
  emojis.forEach(emoji => {
    const emojiParent = emoji.parentElement;
    const emojiText = emoji.getAttribute('alt');
    if (emojiParent !== null) {
      emojiParent.textContent = emojiParent.textContent.replace(emojiText, '');
    }
  });
}
setInterval(removeEmojisFacebook, 1000);

// Messenger
function removeMessengerEmojis() {
  const emojiClass = "img._3n1d img.emoji";
  const emojis = document.querySelectorAll(emojiClass);
  emojis.forEach(emoji => {
    const emojiParent = emoji.parentElement;
    const emojiText = emoji.alt;
    if (emojiParent !== null) {
      emojiParent.textContent = emojiParent.textContent.replace(emojiText, '');
    }
  });
}
setInterval(removeMessengerEmojis, 1000);
