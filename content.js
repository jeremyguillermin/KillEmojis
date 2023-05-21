// Définition des règles pour chaque plateforme
const platforms = {
  twitter: {
    emojiSelectors: 'img[src*="/emoji/"]',
    replacement: ' ',
  },
  facebook: {
    emojiSelectors: 'img[src*="/emoji.php"], img[src^="data:image/svg+xml"]',
    replacement: '',
  },
  messenger: {
    emojiSelectors: 'img._3n1d img.emoji',
    replacement: (emoji, parent) => parent.textContent.replace(emoji.alt, ''),
  },
};

// Fonction pour supprimer les emojis
function removeEmojis(platform) {
  const { emojiSelectors, replacement } = platforms[platform];
  const emojis = document.querySelectorAll(emojiSelectors);
  emojis.forEach(emoji => {
    const parent = emoji.parentElement;
    if (parent !== null) {
      const newContent = typeof replacement === 'function' ? replacement(emoji, parent) : replacement;
      const newNode = document.createTextNode(newContent);
      parent.replaceChild(newNode, emoji);
    }
  });
}

// Fonction pour supprimer les posts sponsorisés
function removeSponsoredPosts() {
  const posts = document.querySelectorAll('div[data-pagelet*="FeedUnit_"]');
  posts.forEach(post => {
    if (post.innerText.includes('Sponsored')) {
      post.style.display = 'none';
    }
  });
}

// Appel des fonctions à intervalles réguliers
setInterval(() => removeEmojis('twitter'), 500);
setInterval(() => removeEmojis('facebook'), 1000);
setInterval(() => removeEmojis('messenger'), 1000);
setInterval(removeSponsoredPosts, 1000);
