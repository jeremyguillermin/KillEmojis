// Configuration pour chaque plateforme
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

// Fonction générique pour supprimer les emojis
function removeEmojis(platform) {
  const config = platforms[platform];
  if (!config) {
    console.error(`Configuration non trouvée pour la plateforme "${platform}"`);
    return;
  }
  const { emojiSelectors, replacement } = config;
  const emojis = document.querySelectorAll(emojiSelectors);
  const docFragment = document.createDocumentFragment();
  
  emojis.forEach(emoji => {
    const parent = emoji.parentElement;
    if (parent) {
      const newContent = typeof replacement === 'function' ? replacement(emoji, parent) : replacement;
      const newNode = document.createTextNode(newContent);
      docFragment.appendChild(newNode);
      parent.replaceChild(docFragment, emoji);
    }
  });
}

// Fonction pour supprimer les emojis sur Bluesky
function removeEmojisBluesky() {
  const posts = document.querySelectorAll('[data-testid="postText"]');
  posts.forEach(post => {
    for (let node of post.childNodes) {
      if (node.nodeType === 3) {  // Node.TEXT_NODE
        node.textContent = node.textContent.replace(/\p{Emoji}/gu, '');
      }
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

// Écouteur d'événements pour les clics sur les publications
document.addEventListener('click', event => {
  const post = event.target.closest('[data-testid="postText"]');
  if (post) {
    removeEmojisBluesky();
  }
});

// Instanciation et configuration d'un MutationObserver
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'subtree') {
      ['twitter', 'facebook', 'messenger'].forEach(platform => removeEmojis(platform));
      removeEmojisBluesky();
      removeSponsoredPosts();
    }
  }
});

// Démarrage de l'observation
observer.observe(document.body, { childList: true, subtree: true });
