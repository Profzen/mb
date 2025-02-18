console.log("Script chargé");
/******************************************
 *         Gestion du Panier              *
 ******************************************/

// Récupère le panier depuis le localStorage ou initialise un tableau vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];


/**
 * Affiche le contenu du panier sur la page (pour cart.html)
 */
function displayCart() {
  // Récupère le panier actuel depuis le localStorage
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Sélectionne l'élément HTML qui affichera le panier
  const cartDetails = document.getElementById('cart-details');
  
  // Si le panier est vide, affiche un message
  if (currentCart.length === 0) {
    cartDetails.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }
  
  // Initialise le contenu HTML pour la liste du panier
  let total = 0;
  let html = "<ul>";
  currentCart.forEach((item, index) => {
    total += item.price;
    html += `
      <li>
        ${item.name} - ${item.price}€
        <button onclick="removeFromCart(${index})">Supprimer</button>
      </li>
    `;
  });
  html += `</ul><p><strong>Total : ${total}€</strong></p>`;
  cartDetails.innerHTML = html;
}

/**
 * Supprime un article du panier en fonction de son index
 * @param {number} index - Index de l'article à supprimer
 */
function removeFromCart(index) {
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  currentCart.splice(index, 1); // Retire l'article à l'index spécifié
  localStorage.setItem('cart', JSON.stringify(currentCart));
  displayCart(); // Actualise l'affichage du panier
}

/**
 * Redirige l'utilisateur vers la page de paiement si le panier n'est pas vide
 */
function goToCheckout() {
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  if (currentCart.length === 0) {
    alert("Votre panier est vide. Ajoutez des articles avant de passer à la commande.");
    return;
  }
  window.location.href = 'checkout.html';
}

/**
 * Affiche le contenu du panier dans une alerte (optionnel)
 */
function viewCart() {
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  if (currentCart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }
  let cartDetails = "Contenu du panier :\n";
  currentCart.forEach(item => {
    cartDetails += `${item.name} - ${item.price}€\n`;
  });
  alert(cartDetails);
}
// Appelle la fonction pour afficher le contenu du panier dès que la page est prête
displayCart();

/******************************************
 *       Gestion des Modales              *
 ******************************************/

function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function openRegisterModal() {
  document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
  document.getElementById('registerModal').style.display = 'none';
}

// Ferme les modales si l'utilisateur clique en dehors du contenu de la modale
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
};

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Connexion réussie !");
  closeLoginModal();
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Inscription réussie !");
  closeRegisterModal();
});


//payWithMobileMoney()
//payWithVisa()

function updateCartCounter() {
  // Récupère le panier depuis localStorage ou initialise un tableau vide
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  const counterElement = document.getElementById('cart-counter');
  if (counterElement) {
    counterElement.textContent = currentCart.length;
    // Ajoute cette ligne pour vérifier dans la console
    console.log("updateCartCounter() appelé - Compteur mis à jour :", currentCart.length);
  }
}



// Appelle updateCartCounter quand le DOM est entièrement chargé
window.onload = updateCartCounter;



/**
 * Ajoute un abonnement au panier et met à jour le compteur
 * @param {string} name - Nom de l'abonnement
 * @param {number} price - Prix de l'abonnement
 */
function addToCart(name, price) {
  // Crée un objet représentant l'article à ajouter
  const item = { name: name, price: price };
   // Récupère le panier actuel depuis localStorage (pour s'assurer d'avoir la dernière version)
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  // Ajoute l'article au panier
  currentCart.push(item);
  // Sauvegarde le panier mis à jour dans localStorage
  localStorage.setItem('cart', JSON.stringify(currentCart));
  updateCartCounter(); // Actualise le compteur
  // Affiche une alerte de confirmation
  alert(`${name} a été ajouté à votre panier`);
}

/* ========= Gestion du Menu Burger ========= */
document.getElementById('hamburger-menu')?.addEventListener('click', function() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('mobile-active');
});
