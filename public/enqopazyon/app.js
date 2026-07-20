/* ==========================================
   ENQOPAZYON - Core Interaction Script
   Luxury Ethiopian Modern Fusion Gastronomy
   ========================================== */

// --- Recipe & Menu Data ---
const menuItems = [
  {
    id: 1,
    category: "fusion",
    title: "ENQOPAZYON Kitfo Truffle",
    price: 680,
    rating: 4.9,
    time: "20 min",
    calories: "450 kcal",
    badge: "Chef's Special",
    image: "images/kitfo_truffle.jpg",
    description: "Finely minced lean beef seasoned with cardamom, hot chili blend (mitmita), warmed clarified spiced butter (niter kibbeh), finished with a premium black truffle oil infusion. Served with crispy injera chips.",
    servings: 2,
    ingredients: [
      { name: "Premium Lean Beef (minced)", amount: 300, unit: "g" },
      { name: "Clarified Spiced Butter (Niter Kibbeh)", amount: 3, unit: "tbsp" },
      { name: "Premium Black Truffle Oil", amount: 1.5, unit: "tsp" },
      { name: "Mitmita Spice Blend", amount: 1, unit: "tsp" },
      { name: "Ayib (Traditional Cottage Cheese)", amount: 100, unit: "g" },
      { name: "Crispy Dehydrated Injera Chips", amount: 6, unit: "pcs" }
    ],
    steps: [
      { text: "Warm the clarified spiced butter (niter kibbeh) gently in a pan over low heat until melted but not piping hot.", time: 60 },
      { text: "In a mixing bowl, combine the minced lean beef with the warm butter, mitmita spice blend, and a pinch of salt. Mix thoroughly.", time: 120 },
      { text: "Drizzle the premium black truffle oil into the mixture and gently fold it in to encapsulate the aroma.", time: 45 },
      { text: "Shape the kitfo on a luxurious emerald plate. Garnish with a side of cottage cheese (ayib) and crispy injera chips.", time: 90 }
    ]
  },
  {
    id: 2,
    category: "fusion",
    title: "Golden Sheba Salmon",
    price: 850,
    rating: 4.8,
    time: "25 min",
    calories: "520 kcal",
    badge: "Fusion Classic",
    image: "images/sheba_salmon.jpg",
    description: "Pan-seared Atlantic salmon fillet glazed with an organic honey-Tej (traditional honey wine) reduction. Served over a bed of cardamom-infused yellow ginger rice and baby spinach.",
    servings: 1,
    ingredients: [
      { name: "Atlantic Salmon Fillet", amount: 200, unit: "g" },
      { name: "Traditional Tej (Honey Wine)", amount: 100, unit: "ml" },
      { name: "Organic Wild Honey", amount: 2, unit: "tbsp" },
      { name: "Cardamom-infused Jasmine Rice", amount: 150, unit: "g" },
      { name: "Sautéed Baby Spinach", amount: 80, unit: "g" },
      { name: "Lemon Zest", amount: 1, unit: "tsp" }
    ],
    steps: [
      { text: "Season the salmon fillet with sea salt and black pepper on both sides.", time: 60 },
      { text: "Heat a skillet over medium-high heat with olive oil. Sear the salmon skin-side down for 4 minutes, then flip for 3 minutes.", time: 420 },
      { text: "Pour the Tej honey wine and organic honey into the pan, allowing it to reduce into a golden glaze coating the fish.", time: 180 },
      { text: "Serve the glazed salmon hot over a mound of yellow cardamom rice, garnished with lemon zest.", time: 90 }
    ]
  },
  {
    id: 3,
    category: "traditional",
    title: "Enjera Taco Fusion",
    price: 490,
    rating: 4.7,
    time: "15 min",
    calories: "380 kcal",
    badge: "Popular",
    image: "images/enjera_tacos.jpg",
    description: "Miniature soft injera shells folded like tacos, filled with slow-simmered spicy Doro Wat chicken stew, topped with awaze-infused cream sauce and fresh coriander.",
    servings: 3,
    ingredients: [
      { name: "Mini Injera Shells (round)", amount: 3, unit: "pcs" },
      { name: "Slow-simmered Doro Wat (shredded chicken)", amount: 180, unit: "g" },
      { name: "Hard-boiled Quail Eggs (halved)", amount: 3, unit: "pcs" },
      { name: "Awaze Paste (chili-honey blend)", amount: 1, unit: "tbsp" },
      { name: "Greek Yogurt / Cream base", amount: 2, unit: "tbsp" },
      { name: "Fresh Coriander leaves", amount: 15, unit: "g" }
    ],
    steps: [
      { text: "Warm the shredded chicken Doro Wat gently in a small skillet.", time: 120 },
      { text: "In a small cup, whisk the awaze paste into the yogurt base to create the creamy awaze taco sauce.", time: 60 },
      { text: "Place the mini injera shells on a taco holder. Spoon the hot Doro Wat evenly into each shell.", time: 90 },
      { text: "Top with half a quail egg, a generous drizzle of the awaze sauce, and fresh coriander leaves.", time: 60 }
    ]
  },
  {
    id: 4,
    category: "traditional",
    title: "Emerald Gomen Roll",
    price: 380,
    rating: 4.6,
    time: "15 min",
    calories: "290 kcal",
    badge: "Vegan Gem",
    image: "images/gomen_rolls.jpg",
    description: "Sautéed collard greens (gomen) seasoned with garlic and ginger, rolled tightly inside a light injera wrap with seasoned cottage cheese (ayib) and green chilies.",
    servings: 2,
    ingredients: [
      { name: "Collard Greens (Gomen)", amount: 250, unit: "g" },
      { name: "Minced Ginger and Garlic", amount: 1, unit: "tbsp" },
      { name: "Ayib (Spiced Cottage Cheese)", amount: 80, unit: "g" },
      { name: "Fresh Green Chili (sliced)", amount: 1, unit: "pc" },
      { name: "Fresh soft Injera Sheet", amount: 1, unit: "pc" }
    ],
    steps: [
      { text: "Sauté the minced garlic and ginger in olive oil, then add the finely chopped collard greens (gomen) and cook until tender.", time: 300 },
      { text: "Lay out the fresh injera sheet. Spread a thin layer of spiced cottage cheese (ayib) across the surface.", time: 90 },
      { text: "Evenly distribute the cooked gomen and sliced green chilies over the cheese layer.", time: 60 },
      { text: "Roll the injera tightly, slice into bite-sized pinwheels, and arrange them elegantly.", time: 120 }
    ]
  },
  {
    id: 5,
    category: "dessert",
    title: "Kolo Pistachio Crunch",
    price: 350,
    rating: 4.8,
    time: "30 min",
    calories: "320 kcal",
    badge: "Sweet Gem",
    image: "images/kolo_crunch.jpg",
    description: "Roasted barley grains (kolo) and salted pistachios caramelized with pure honey and cardamom, served over a silky vanilla bean panna cotta layer.",
    servings: 2,
    ingredients: [
      { name: "Roasted Barley Grains (Kolo)", amount: 50, unit: "g" },
      { name: "Salted Pistachios (chopped)", amount: 40, unit: "g" },
      { name: "Wild Honey", amount: 3, unit: "tbsp" },
      { name: "Heavy Cream (for panna cotta)", amount: 200, unit: "ml" },
      { name: "Gelatin / Agar Agar", amount: 5, unit: "g" },
      { name: "Cardamom powder", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      { text: "Prepare the panna cotta base by heating heavy cream, sugar, and gelatin until dissolved. Pour into small molds and chill until set.", time: 720 },
      { text: "In a small dry pan, toss the kolo barley grains and chopped pistachios over medium heat until fragrant.", time: 180 },
      { text: "Pour in the honey and cardamom powder, stirring constantly until the honey bubbles and coats the grains in a caramelized glaze.", time: 120 },
      { text: "Allow the crunch to cool slightly, then spoon it generously over the chilled, set panna cotta.", time: 60 }
    ]
  },
  {
    id: 6,
    category: "beverage",
    title: "Tej Infused Hibiscus",
    price: 280,
    rating: 4.9,
    time: "10 min",
    calories: "120 kcal",
    badge: "Refreshing",
    image: "images/hibiscus_tej.jpg",
    description: "Chilled traditional honey wine (Tej) blended with organic hibiscus blossom infusion, fresh lime juice, crushed garden mint, and ice.",
    servings: 2,
    ingredients: [
      { name: "Traditional Tej (Honey Wine)", amount: 250, unit: "ml" },
      { name: "Dried Hibiscus Flowers (brewed strong)", amount: 100, unit: "ml" },
      { name: "Fresh Lime Juice", amount: 2, unit: "tbsp" },
      { name: "Fresh Mint Leaves", amount: 10, unit: "pcs" },
      { name: "Ice Cubes", amount: 1, unit: "cup" }
    ],
    steps: [
      { text: "Muddle the fresh mint leaves and lime juice gently in the bottom of a cocktail shaker.", time: 45 },
      { text: "Add the chilled Tej honey wine and the hibiscus infusion to the shaker.", time: 30 },
      { text: "Fill with ice and shake vigorously for 10-15 seconds to chill and aerate.", time: 15 },
      { text: "Strain into chilled glasses over fresh ice, garnishing with a sprig of mint.", time: 30 }
    ]
  }
];

// --- Initial Testimonials ---
const initialTestimonials = [
  {
    name: "Abemelek Solomon",
    rating: 5,
    text: "The ENQOPAZYON Kitfo Truffle is an absolute masterpiece! Combining truffle oil with clarified spiced butter is pure genius. 10/10 portfolio project!",
    initials: "AS",
    date: "July 2026"
  },
  {
    name: "Dr. Selamawit T.",
    rating: 5,
    text: "An incredible culinary journey. The atmosphere is just as luxurious as the food. The Tej Glazed Salmon was cooked to absolute perfection.",
    initials: "ST",
    date: "June 2026"
  },
  {
    name: "Michael K.",
    rating: 4,
    text: "Very creative fusion! The Injera Tacos are fun, tasty, and beautiful. I really loved the premium branding. Highly recommended.",
    initials: "MK",
    date: "May 2026"
  }
];

// --- Application State ---
let cart = JSON.parse(localStorage.getItem("enqopazyon_cart")) || [];
let testimonials = JSON.parse(localStorage.getItem("enqopazyon_reviews")) || initialTestimonials;
let activeCookingRecipe = null;
let currentCookingStepIndex = 0;
let cookingTimerInterval = null;
let cookingTimerTime = 0; // in seconds
let isTimerRunning = false;

// --- DOM Element Selections ---
document.addEventListener("DOMContentLoaded", () => {
  // Preloader elements
  const preloader = document.getElementById("intro-overlay");
  const progressBar = document.getElementById("intro-progress");
  const statusText = document.getElementById("intro-status");

  // Nav elements
  const header = document.getElementById("main-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Menu elements
  const menuGrid = document.getElementById("menu-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Cart elements
  const cartTrigger = document.getElementById("cart-trigger");
  const cartClose = document.getElementById("cart-close");
  const cartDrawerBackdrop = document.getElementById("cart-drawer-backdrop");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartCounter = document.getElementById("cart-counter");
  const subtotalDisplay = document.getElementById("cart-subtotal");
  const taxDisplay = document.getElementById("cart-tax");
  const totalDisplay = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Modals
  const recipeModal = document.getElementById("recipe-modal");
  const recipeModalClose = document.getElementById("recipe-modal-close");
  const recipeModalContent = document.getElementById("recipe-modal-content");
  
  const successModal = document.getElementById("success-modal");
  const successClose = document.getElementById("success-close");
  const successTitle = document.getElementById("success-title");
  const successMessage = document.getElementById("success-message");

  // Forms
  const reservationForm = document.getElementById("reservation-form");
  const reviewForm = document.getElementById("review-form");
  const starBtns = document.querySelectorAll(".star-btn");
  const ratingValueInput = document.getElementById("review-rating-value");
  const testimonialsGrid = document.getElementById("testimonials-grid");

  // Checkout elements
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutModalClose = document.getElementById("checkout-modal-close");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutTableNum = document.getElementById("checkout-table-num");
  const checkoutBillTotal = document.getElementById("checkout-bill-total");
  const payMethodTelebirr = document.getElementById("pay-method-telebirr");
  const payMethodCbe = document.getElementById("pay-method-cbe");
  const selectedPaymentMethod = document.getElementById("selected-payment-method");
  const panelTelebirr = document.getElementById("panel-telebirr");
  const panelCbe = document.getElementById("panel-cbe");
  const checkoutPhone = document.getElementById("checkout-phone");
  const checkoutRefNo = document.getElementById("checkout-ref-no");
  const checkoutFormContainer = document.getElementById("checkout-form-container");
  const checkoutProcessingContainer = document.getElementById("checkout-processing-container");
  const processingTitle = document.getElementById("processing-title");
  const processingStatusText = document.getElementById("processing-status-text");
  const processingBar = document.getElementById("processing-bar");


  // ==========================================
  // 1. Cinematic Intro Pre-loader
  // ==========================================
  const runPreloader = () => {
    let progress = 0;
    const phrases = [
      "እንኳን ደህና መጡ | WELCOME TO ENQOPAZYON",
      "CURATING GOURMET INGREDIENTS...",
      "INFUSING CARDAMOM & EXOTIC SPICES...",
      "PREPARING MODERN FUSION SECRETS...",
      "GARNISHING SIGNATURE MASTERPIECES...",
      "YOUR LUXURY EXPERIENCE IS READY!"
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        progressBar.style.width = "100%";
        statusText.innerText = phrases[phrases.length - 1];

        setTimeout(() => {
          preloader.classList.add("fade-out");
        }, 500);
      } else {
        progressBar.style.width = `${progress}%`;
        // Pick phrase based on progress
        const phraseIdx = Math.min(
          Math.floor((progress / 100) * phrases.length),
          phrases.length - 2
        );
        statusText.innerText = phrases[phraseIdx];
      }
    }, 100);
  };
  runPreloader();


  // ==========================================
  // 2. Navigation & Scrolling Effects
  // ==========================================
  // Header shrink on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll Spy active navigation highlight
    const scrollPos = window.scrollY + 120;
    document.querySelectorAll("section").forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // Mobile menu toggle
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu on nav click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });


  // ==========================================
  // 3. Render Menu Grid & Filtering
  // ==========================================
  const renderMenu = (filterCategory = "all") => {
    menuGrid.innerHTML = "";
    
    const filteredItems = menuItems.filter(item => 
      filterCategory === "all" || item.category === filterCategory
    );

    filteredItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-item-card glass-card";
      card.innerHTML = `
        <div class="item-img-container">
          <span class="item-badge">${item.badge}</span>
          <button class="item-fav-btn" data-id="${item.id}" aria-label="Favorite Dish">
            <i class="fa-regular fa-heart"></i>
          </button>
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="item-card-details">
          <div class="item-meta">
            <span><i class="fa-solid fa-clock"></i> ${item.time}</span>
            <span><i class="fa-solid fa-fire"></i> ${item.calories}</span>
            <span><i class="fa-solid fa-star text-gold"></i> ${item.rating}</span>
          </div>
          <div class="item-title-row">
            <h3>${item.title}</h3>
            <span class="item-price">ETB ${item.price}</span>
          </div>
          <p class="item-description">${item.description}</p>
          <div class="item-card-actions">
            <button class="btn btn-outline btn-card-action view-recipe-btn" data-id="${item.id}">Secret Recipe</button>
            <button class="btn btn-primary btn-card-action add-cart-btn" data-id="${item.id}">Add to Order</button>
          </div>
        </div>
      `;
      menuGrid.appendChild(card);
    });

    // Rebind events to dynamic cards
    bindMenuCardEvents();
  };

  const bindMenuCardEvents = () => {
    // Favorite heart toggle
    document.querySelectorAll(".item-fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.classList.toggle("active");
        const icon = btn.querySelector("i");
        if (btn.classList.contains("active")) {
          icon.className = "fa-solid fa-heart";
        } else {
          icon.className = "fa-regular fa-heart";
        }
      });
    });

    // View Recipe Modal
    document.querySelectorAll(".view-recipe-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        openRecipeModal(id);
      });
    });

    // Add to Cart
    document.querySelectorAll(".add-cart-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
      });
    });
  };

  // Category buttons filtering click
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.category;
      
      // Animation transition fade-out/in
      menuGrid.style.opacity = 0;
      setTimeout(() => {
        renderMenu(category);
        menuGrid.style.opacity = 1;
      }, 200);
    });
  });

  // Initial Menu Render
  renderMenu();


  // ==========================================
  // 4. Shopping Cart Logic
  // ==========================================
  const updateCartUI = () => {
    cartItemsList.innerHTML = "";
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-utensils"></i>
          <p>Your culinary selection is empty.</p>
        </div>
      `;
      cartCounter.innerText = "0";
      subtotalDisplay.innerText = "ETB 0.00";
      taxDisplay.innerText = "ETB 0.00";
      totalDisplay.innerText = "ETB 0.00";
      checkoutBtn.disabled = true;
      return;
    }

    checkoutBtn.disabled = false;
    let subtotal = 0;

    cart.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.id);
      if (!menuItem) return;

      const itemTotal = menuItem.price * item.quantity;
      subtotal += itemTotal;

      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
        <img src="${menuItem.image}" alt="${menuItem.title}" class="cart-item-img">
        <div class="cart-item-details">
          <h4>${menuItem.title}</h4>
          <span>ETB ${menuItem.price}</span>
        </div>
        <div class="cart-item-actions">
          <div class="cart-qty-control">
            <button class="cart-qty-btn qty-minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="cart-qty-btn qty-plus" data-id="${item.id}">+</button>
          </div>
          <button class="cart-remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartItemsList.appendChild(itemElement);
    });

    const tax = subtotal * 0.1; // 10% VAT & Service Charge
    const total = subtotal + tax;

    cartCounter.innerText = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    subtotalDisplay.innerText = `ETB ${subtotal.toFixed(2)}`;
    taxDisplay.innerText = `ETB ${tax.toFixed(2)}`;
    totalDisplay.innerText = `ETB ${total.toFixed(2)}`;

    // Quantity Adjustments and Removal bindings
    document.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", () => {
        adjustCartQty(parseInt(btn.dataset.id), -1);
      });
    });
    document.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        adjustCartQty(parseInt(btn.dataset.id), 1);
      });
    });
    document.querySelectorAll(".cart-remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        removeFromCart(parseInt(btn.dataset.id));
      });
    });
  };

  const addToCart = (id) => {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: id, quantity: 1 });
    }
    
    localStorage.setItem("enqopazyon_cart", JSON.stringify(cart));
    updateCartUI();
    
    // Open drawer automatically on item add to give direct feedback
    openCartDrawer();
  };

  const adjustCartQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      localStorage.setItem("enqopazyon_cart", JSON.stringify(cart));
      updateCartUI();
    }
  };

  const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("enqopazyon_cart", JSON.stringify(cart));
    updateCartUI();
  };

  // Drawer toggles
  const openCartDrawer = () => {
    cartDrawerBackdrop.classList.add("active");
  };

  const closeCartDrawer = () => {
    cartDrawerBackdrop.classList.remove("active");
  };

  cartTrigger.addEventListener("click", openCartDrawer);
  cartClose.addEventListener("click", closeCartDrawer);
  cartDrawerBackdrop.addEventListener("click", (e) => {
    if (e.target === cartDrawerBackdrop) closeCartDrawer();
  });

  // Initial cart UI load
  updateCartUI();


  // ==========================================
  // 5. Recipe Modal & Cooking Guide Mode
  // ==========================================
  const openRecipeModal = (id) => {
    const item = menuItems.find(m => m.id === id);
    if (!item) return;

    activeCookingRecipe = item;
    renderRecipeDetails(item.servings);
    recipeModal.classList.add("active");
  };

  const closeRecipeModal = () => {
    recipeModal.classList.remove("active");
    stopCookingTimer();
    activeCookingRecipe = null;
  };

  recipeModalClose.addEventListener("click", closeRecipeModal);
  recipeModal.addEventListener("click", (e) => {
    if (e.target === recipeModal) closeRecipeModal();
  });

  const renderRecipeDetails = (currentServings) => {
    const item = activeCookingRecipe;
    const ratio = currentServings / item.servings;

    recipeModalContent.innerHTML = `
      <div class="modal-recipe-header">
        <h2>${item.title}</h2>
        <p class="highlight-green">${item.badge}</p>
      </div>

      <div class="modal-recipe-grid">
        <div class="modal-recipe-image-col">
          <div class="modal-recipe-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="modal-meta-row" style="margin-top: 16px;">
            <div class="modal-meta-item"><i class="fa-solid fa-clock"></i> <span>Prep: ${item.time}</span></div>
            <div class="modal-meta-item"><i class="fa-solid fa-fire"></i> <span>Cal: ${item.calories}</span></div>
          </div>
        </div>

        <div class="modal-recipe-info-col">
          <div class="modal-ingredients">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h3>Ingredients</h3>
              <div class="servings-adjuster">
                <span style="font-size: 12px; color: var(--text-muted);">Servings:</span>
                <button class="adjust-btn" id="servings-down"><i class="fa-solid fa-minus"></i></button>
                <span id="servings-val" style="font-weight: 700;">${currentServings}</span>
                <button class="adjust-btn" id="servings-up"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
            <ul style="margin-top: 16px;">
              ${item.ingredients.map(ing => {
                const adjustedAmount = (ing.amount * ratio).toFixed(ing.amount % 1 === 0 ? 0 : 1);
                return `<li>${adjustedAmount} ${ing.unit} of ${ing.name}</li>`;
              }).join("")}
            </ul>
          </div>

          <div class="modal-instructions">
            <h3>Method Overview</h3>
            <ol>
              ${item.steps.map(step => `<li>${step.text}</li>`).join("")}
            </ol>
          </div>
        </div>
      </div>

      <div class="modal-recipe-footer">
        <button class="btn btn-outline" id="modal-close-footer">Back</button>
        <button class="btn btn-primary" id="start-cooking-btn">Start Cooking Guide <i class="fa-solid fa-kitchen-set"></i></button>
      </div>
    `;

    // Servings adjuster listeners
    document.getElementById("servings-down").addEventListener("click", () => {
      if (currentServings > 1) {
        renderRecipeDetails(currentServings - 1);
      }
    });
    document.getElementById("servings-up").addEventListener("click", () => {
      renderRecipeDetails(currentServings + 1);
    });

    // Close button
    document.getElementById("modal-close-footer").addEventListener("click", closeRecipeModal);

    // Start Cooking Mode
    document.getElementById("start-cooking-btn").addEventListener("click", startCookingGuide);
  };


  // --- Step-By-Step Cooking Guide Engine ---
  const startCookingGuide = () => {
    currentCookingStepIndex = 0;
    renderCookingStep();
  };

  const renderCookingStep = () => {
    const item = activeCookingRecipe;
    const step = item.steps[currentCookingStepIndex];

    recipeModalContent.innerHTML = `
      <div class="cooking-guide-container">
        <div class="cooking-progress-tracker">
          ${item.steps.map((s, idx) => `
            <div class="progress-dot ${idx === currentCookingStepIndex ? 'active' : (idx < currentCookingStepIndex ? 'completed' : '')}"></div>
          `).join("")}
        </div>

        <div class="cooking-step-card">
          <span class="step-number">Step ${currentCookingStepIndex + 1} of ${item.steps.length}</span>
          <h2 class="step-instruction">${step.text}</h2>
        </div>

        ${step.time ? `
          <div class="timer-widget">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Step Timer</span>
            <div class="timer-display" id="step-timer-val">${formatTime(step.time)}</div>
            <div class="timer-controls">
              <button class="timer-btn" id="timer-toggle">Start</button>
              <button class="timer-btn" id="timer-reset">Reset</button>
            </div>
          </div>
        ` : ''}

        <div class="cooking-actions">
          <button class="btn btn-outline" id="cooking-back-btn" ${currentCookingStepIndex === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-angle-left"></i> Previous
          </button>
          
          ${currentCookingStepIndex === item.steps.length - 1 ? `
            <button class="btn btn-primary" id="cooking-finish-btn">
              Finish Cooking <i class="fa-solid fa-circle-check"></i>
            </button>
          ` : `
            <button class="btn btn-primary" id="cooking-next-btn">
              Next Step <i class="fa-solid fa-angle-right"></i>
            </button>
          `}
        </div>
      </div>
    `;

    // Handle timer binding
    if (step.time) {
      cookingTimerTime = step.time;
      isTimerRunning = false;
      
      const toggleBtn = document.getElementById("timer-toggle");
      const resetBtn = document.getElementById("timer-reset");
      const display = document.getElementById("step-timer-val");

      toggleBtn.addEventListener("click", () => {
        if (isTimerRunning) {
          stopCookingTimer();
          toggleBtn.innerText = "Start";
        } else {
          startCookingTimer(display, toggleBtn);
          toggleBtn.innerText = "Pause";
        }
      });

      resetBtn.addEventListener("click", () => {
        stopCookingTimer();
        cookingTimerTime = step.time;
        display.innerText = formatTime(cookingTimerTime);
        toggleBtn.innerText = "Start";
      });
    }

    // Step navigation actions
    document.getElementById("cooking-back-btn").addEventListener("click", () => {
      stopCookingTimer();
      currentCookingStepIndex--;
      renderCookingStep();
    });

    const nextBtn = document.getElementById("cooking-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        stopCookingTimer();
        currentCookingStepIndex++;
        renderCookingStep();
      });
    }

    const finishBtn = document.getElementById("cooking-finish-btn");
    if (finishBtn) {
      finishBtn.addEventListener("click", () => {
        stopCookingTimer();
        closeRecipeModal();
        openSuccessModal("Gourmet Cooking Completed!", "You have finished preparing the secret ENQOPAZYON recipe! Let us know how it tasted by leaving a review.");
      });
    }
  };

  const startCookingTimer = (displayEl, toggleBtn) => {
    isTimerRunning = true;
    cookingTimerInterval = setInterval(() => {
      cookingTimerTime--;
      if (cookingTimerTime <= 0) {
        clearInterval(cookingTimerInterval);
        isTimerRunning = false;
        cookingTimerTime = 0;
        displayEl.innerText = "00:00";
        toggleBtn.innerText = "Start";
        
        // Play beep sound or alert
        playTimerAlarm();
      } else {
        displayEl.innerText = formatTime(cookingTimerTime);
      }
    }, 1000);
  };

  const stopCookingTimer = () => {
    clearInterval(cookingTimerInterval);
    isTimerRunning = false;
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const playTimerAlarm = () => {
    // Gentle audio notification (vibration, or synth alert if supported, otherwise visual alert)
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 500);
    } catch (e) {
      console.log("Audio not supported or user gesture needed");
    }
    
    // Highlight timer visual
    const display = document.getElementById("step-timer-val");
    if (display) {
      display.style.color = "#ff4757";
      setTimeout(() => {
        display.style.color = "var(--secondary-gold)";
      }, 1500);
    }
  };


  // ==========================================
  // 6. Checkout Simulation
  // ==========================================
  // 6. Tableside Checkout & Payment Simulation
  // ==========================================
  // Open checkout modal
  checkoutBtn.addEventListener("click", () => {
    closeCartDrawer();
    
    // Calculate total price
    let subtotal = 0;
    cart.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.id);
      if (menuItem) subtotal += menuItem.price * item.quantity;
    });
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    checkoutBillTotal.innerText = `ETB ${total.toFixed(2)}`;
    
    // Reset forms
    checkoutForm.reset();
    selectedPaymentMethod.value = "telebirr";
    payMethodTelebirr.classList.add("active");
    payMethodCbe.classList.remove("active");
    panelTelebirr.classList.add("active");
    panelCbe.classList.remove("active");
    
    checkoutPhone.required = true;
    checkoutRefNo.required = false;

    checkoutFormContainer.style.display = "block";
    checkoutProcessingContainer.style.display = "none";

    checkoutModal.classList.add("active");
  });

  // Close checkout modal
  const closeCheckoutModal = () => {
    checkoutModal.classList.remove("active");
  };
  checkoutModalClose.addEventListener("click", closeCheckoutModal);
  checkoutModal.addEventListener("click", (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  // Toggle payment methods
  payMethodTelebirr.addEventListener("click", () => {
    selectedPaymentMethod.value = "telebirr";
    payMethodTelebirr.classList.add("active");
    payMethodCbe.classList.remove("active");
    panelTelebirr.classList.add("active");
    panelCbe.classList.remove("active");
    
    checkoutPhone.required = true;
    checkoutRefNo.required = false;
  });

  payMethodCbe.addEventListener("click", () => {
    selectedPaymentMethod.value = "cbe";
    payMethodCbe.classList.add("active");
    payMethodTelebirr.classList.remove("active");
    panelCbe.classList.add("active");
    panelTelebirr.classList.remove("active");
    
    checkoutRefNo.required = true;
    checkoutPhone.required = false;
  });

  // Handle checkout form submit
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const tableNum = checkoutTableNum.value;
    const method = selectedPaymentMethod.value;
    
    // Additional validation
    if (method === "telebirr") {
      const phone = checkoutPhone.value.trim();
      const phoneRegex = /^(09|07)\d{8}$/;
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid Ethiopian mobile number (09xxxxxxxx or 07xxxxxxxx).");
        return;
      }
    } else if (method === "cbe") {
      const refNo = checkoutRefNo.value.trim();
      if (refNo.length < 6) {
        alert("Please enter a valid CBE Transaction Reference Number.");
        return;
      }
    }

    // Switch to processing view
    checkoutFormContainer.style.display = "none";
    checkoutProcessingContainer.style.display = "block";
    
    // Simulate transaction progress
    let progress = 0;
    const paymentName = method === "telebirr" ? "Telebirr" : "CBE Birr";
    const statusPhrases = [
      `Connecting to secure ${paymentName} gateway...`,
      `Table #${tableNum} reservation lock checked...`,
      `Initiating payment request to account...`,
      "Waiting for bank ledger approval...",
      "Transaction successful! Finalizing invoice...",
      "Order placed successfully!"
    ];

    processingBar.style.width = "0%";
    processingTitle.innerText = "Processing Payment...";
    processingStatusText.innerText = statusPhrases[0];

    const timer = setInterval(() => {
      progress += 5;
      if (progress > 100) {
        progress = 100;
        clearInterval(timer);
        
        // Finalize order
        setTimeout(() => {
          // Build summary of items
          let itemsSummary = cart.map(item => {
            const menuItem = menuItems.find(m => m.id === item.id);
            return menuItem ? `${item.quantity}x ${menuItem.title}` : "";
          }).filter(n => n !== "").join(", ");

          closeCheckoutModal();
          
          openSuccessModal(
            "Payment & Order Confirmed! | ክፍያዎ ተረጋግጧል!", 
            `Thank you! Payment via ${paymentName} was successfully processed. Your order [${itemsSummary}] has been dispatched to the kitchen. It will be served directly to Table #${tableNum}. A Telegram alert has been dispatched to our wait staff.`
          );

          // Clear cart
          cart = [];
          localStorage.removeItem("enqopazyon_cart");
          updateCartUI();
        }, 300);
      } else {
        processingBar.style.width = `${progress}%`;
        const phraseIndex = Math.min(
          Math.floor((progress / 100) * statusPhrases.length),
          statusPhrases.length - 2
        );
        processingStatusText.innerText = statusPhrases[phraseIndex];
      }
    }, 150);
  });


  // ==========================================
  // 7. Table Reservation Form Handler
  // ==========================================
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reserve-name").value;
    const date = document.getElementById("reserve-date").value;
    const time = document.getElementById("reserve-time").value;
    const guests = document.getElementById("reserve-guests").value;
    const lounge = document.getElementById("reserve-experience").value;

    openSuccessModal(
      "Reservation Confirmed!", 
      `Greetings, ${name}! Your table for ${guests} on ${date} at ${time} in the ${lounge.toUpperCase()} has been reserved. A confirmation alert has been forwarded to our hostess.`
    );

    reservationForm.reset();
  });


  // ==========================================
  // 8. Reviews and Ratings Grid
  // ==========================================
  const renderTestimonials = () => {
    testimonialsGrid.innerHTML = "";
    
    testimonials.forEach(t => {
      const card = document.createElement("div");
      card.className = "testimonial-card glass-card";
      
      let starsHTML = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= t.rating) {
          starsHTML += `<i class="fa-solid fa-star"></i>`;
        } else {
          starsHTML += `<i class="fa-regular fa-star"></i>`;
        }
      }

      card.innerHTML = `
        <div class="testimonial-stars">
          ${starsHTML}
        </div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-user">
          <div class="user-avatar-initial">${t.initials}</div>
          <div class="user-info">
            <h4>${t.name}</h4>
            <span>Gourmet Guest • ${t.date}</span>
          </div>
        </div>
      `;
      testimonialsGrid.appendChild(card);
    });
  };

  // Interactive review stars selection
  starBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const val = parseInt(btn.dataset.value);
      ratingValueInput.value = val;
      
      starBtns.forEach(s => {
        const sVal = parseInt(s.dataset.value);
        if (sVal <= val) {
          s.className = "fa-star fa-solid star-btn active";
        } else {
          s.className = "fa-star fa-regular star-btn";
        }
      });
    });
  });

  // Submit Review Form
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("review-name").value;
    const text = document.getElementById("review-text").value;
    const rating = parseInt(ratingValueInput.value);
    
    // Create initials
    const initials = name.split(" ")
      .map(part => part.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase() || "GG";

    const newReview = {
      name: name,
      rating: rating,
      text: text,
      initials: initials,
      date: "Just Now"
    };

    testimonials.unshift(newReview);
    localStorage.setItem("enqopazyon_reviews", JSON.stringify(testimonials));
    
    // Rerender testimonials and reset form
    renderTestimonials();
    reviewForm.reset();
    
    // Reset stars to 5 stars
    starBtns.forEach(s => s.className = "fa-star fa-solid star-btn active");
    ratingValueInput.value = "5";

    // Visual confirmation
    openSuccessModal("Review Submitted!", "Thank you for sharing your experience. Your feedback helps us maintain our gemstone standard.");
  });

  // Initial Testimonials Render
  renderTestimonials();


  // ==========================================
  // 9. Success Modal Actions
  // ==========================================
  const openSuccessModal = (title, message) => {
    successTitle.innerText = title;
    successMessage.innerText = message;
    successModal.classList.add("active");
  };

  const closeSuccessModal = () => {
    successModal.classList.remove("active");
  };

  successClose.addEventListener("click", closeSuccessModal);
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) closeSuccessModal();
  });

});
