/* ==========================================
   GEBETA DELIVERY - Core Logic & Tracking
   Premium On-Demand Delivery Dashboard
   ========================================== */

// --- Partner Merchants & Menu Database ---
const merchants = [
  {
    id: 1,
    name: "Habesha Gourmet",
    cuisine: "Traditional Ethiopian",
    rating: 4.9,
    deliveryTime: "25-35 min",
    deliveryFee: 90,
    minOrder: 200,
    image: "images/merchant_habesha.jpg",
    icon: "fa-solid fa-utensils",
    description: "Exquisite traditional stews, freshly baked injera, and premium meat dishes prepared using time-honored family recipes.",
    menu: [
      { id: 101, name: "Special Doro Wat", price: 580, desc: "Slow-simmered chicken stew in rich berbere sauce with hard-boiled eggs and traditional spices.", image: "images/doro_wat.jpg" },
      { id: 102, name: "Beef Kitfo Premium", price: 490, desc: "Minced raw beef seasoned with cardamon and spiced butter, served with cottage cheese.", image: "images/beef_kitfo.jpg" },
      { id: 103, name: "Veggie Beyaynetu", price: 380, desc: "A colorful platter of lentils, split peas, collard greens, and cabbage stews.", image: "images/veggie_beyaynetu.jpg" }
    ]
  },
  {
    id: 2,
    name: "Sheger Burger & Grill",
    cuisine: "Fast Food Fusion",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 90,
    minOrder: 150,
    image: "images/merchant_burger.jpg",
    icon: "fa-solid fa-burger",
    description: "Juicy, fire-grilled burgers, crispy loaded fries, and premium dynamic milkshakes with a local spice twist.",
    menu: [
      { id: 201, name: "Double Sheger Cheese Burger", price: 420, desc: "Two beef patties, cheddar cheese, dynamic house sauce, lettuce, and pickles on a brioche bun.", image: "images/sheger_burger.jpg" },
      { id: 202, name: "Awaze Chicken Wings", price: 340, desc: "Crispy chicken wings glazed with hot honey-awaze reduction sauce.", image: "images/awaze_wings.jpg" },
      { id: 203, name: "Truffle Hand-Cut Fries", price: 180, desc: "Fresh potato fries tossed with black truffle oil, parmesan, and parsley.", image: "images/truffle_fries.jpg" }
    ]
  },
  {
    id: 3,
    name: "Bole Organic Market",
    cuisine: "Groceries & Fresh Produce",
    rating: 4.8,
    deliveryTime: "30-45 min",
    deliveryFee: 120,
    minOrder: 300,
    image: "images/merchant_grocery.jpg",
    icon: "fa-solid fa-leaf",
    description: "Certified organic fruits, vegetables, local honey, farm-fresh dairy, and artisanal grocery essentials.",
    menu: [
      { id: 301, name: "Fresh Organic Avocados", price: 180, desc: "Premium fresh green avocados sourced from local organic farms.", image: "images/organic_avocado.jpg" },
      { id: 302, name: "Forest Honey Jar (500g)", price: 390, desc: "100% pure organic wild forest honey packaged in a 500g glass jar.", image: "images/forest_honey.jpg" },
      { id: 303, name: "Packaged Harar Coffee (250g)", price: 320, desc: "Premium ground Harar coffee powder packaged in a fresh-lock bag.", image: "images/harar_coffee.jpg" },
      { id: 304, name: "Fresh Red Onions (1kg)", price: 120, desc: "Crispy, farm-fresh red onions purchased directly from the produce aisle.", image: "images/fresh_onion.jpg" },
      { id: 305, name: "Ripe Red Tomatoes (1kg)", price: 140, desc: "Plump, vine-ripened organic tomatoes selected for sweetness and freshness.", image: "images/fresh_tomato.jpg" },
      { id: 306, name: "Fresh Cabbage (ጥቅል ጎመን)", price: 80, desc: "Crispy, green organic head cabbage fresh from the local farm.", image: "images/fresh_cabbage.jpg" }
    ]
  }
];

// --- Application State ---
let cart = [];
let activeMerchant = null;
let activeOrder = null;
let trackingInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  // Pre-loader elements
  const preloader = document.getElementById("intro-overlay");
  const progressBar = document.getElementById("intro-progress");
  const statusText = document.getElementById("intro-status");
  const introRider = document.getElementById("intro-rider");

  // Sidebar toggle
  const sidebar = document.getElementById("app-sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");

  // Tabs
  const navItems = document.querySelectorAll(".nav-item");
  const viewportTabs = document.querySelectorAll(".viewport-tab");

  // Directories & Menu
  const merchantsGrid = document.getElementById("merchants-grid");
  const merchantMenuView = document.getElementById("merchant-menu-view");
  const merchantDirectory = document.getElementById("merchant-directory");
  const closeMenuViewBtn = document.getElementById("close-menu-view");
  const menuMerchantHeader = document.getElementById("menu-merchant-header");
  const menuItemsGrid = document.getElementById("menu-items-grid");

  // Cart
  const cartTrigger = document.getElementById("cart-trigger");
  const cartClose = document.getElementById("cart-close");
  const cartDrawerBackdrop = document.getElementById("cart-drawer-backdrop");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartCounter = document.getElementById("cart-counter");
  const subtotalDisplay = document.getElementById("cart-subtotal");
  const deliveryDisplay = document.getElementById("cart-delivery-fee");
  const totalDisplay = document.getElementById("cart-total");
  const checkoutTriggerBtn = document.getElementById("checkout-trigger-btn");

  // Checkout Modal
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutModalClose = document.getElementById("checkout-modal-close");
  const checkoutForm = document.getElementById("checkout-form");
  const payMethodTelebirr = document.getElementById("pay-method-telebirr");
  const payMethodCbe = document.getElementById("pay-method-cbe");
  const selectedPaymentMethod = document.getElementById("selected-payment-method");
  const panelTelebirr = document.getElementById("panel-telebirr");
  const panelCbe = document.getElementById("panel-cbe");
  const checkoutTelebirrPhone = document.getElementById("checkout-telebirr-phone");
  const checkoutCbeRef = document.getElementById("checkout-cbe-ref");
  
  const checkoutFormContainer = document.getElementById("checkout-form-container");
  const checkoutProcessingContainer = document.getElementById("checkout-processing-container");
  const processingTitle = document.getElementById("processing-title");
  const processingStatus = document.getElementById("processing-status-text");
  const processingBar = document.getElementById("processing-bar");

  // Tracking Elements
  const trackingActiveIndicator = document.getElementById("tracking-active-indicator");
  const trackStatusBadge = document.getElementById("track-status-badge");
  const trackMerchantName = document.getElementById("track-merchant-name");
  const trackOrderSummary = document.getElementById("track-order-summary");
  const trackDriverCard = document.getElementById("track-driver-card");
  const trackEta = document.getElementById("track-eta");
  const trackDistance = document.getElementById("track-distance");
  const trackStatusLogs = document.getElementById("track-status-logs");
  
  const mapIdleOverlay = document.getElementById("map-idle-overlay");
  const trackingMapSvg = document.getElementById("tracking-map-svg");
  const routePathLine = document.getElementById("route-path-line");
  const mapRiderCourier = document.getElementById("map-rider-courier");

  // Orders list
  const ordersListWrapper = document.getElementById("orders-list-wrapper");

  // ==========================================
  // 1. Cinematic Delivery Pre-loader
  // ==========================================
  const runPreloader = () => {
    let progress = 0;
    const phrases = [
      "ACQUIRING SATELLITE TELEMETRY...",
      "CALCULATING HEURISTIC ROUTES...",
      "SYNCING DISPATCH SERVERS...",
      "OPTIMIZING SMART CORRIDORS...",
      "CONCIERGE READY!"
    ];

    const loaderInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);
        progressBar.style.width = "100%";
        introRider.style.left = "100%";
        statusText.innerText = phrases[phrases.length - 1];

        setTimeout(() => {
          preloader.classList.add("fade-out");
        }, 500);
      } else {
        progressBar.style.width = `${progress}%`;
        introRider.style.left = `${progress}%`;
        
        const phraseIndex = Math.min(
          Math.floor((progress / 100) * phrases.length),
          phrases.length - 2
        );
        statusText.innerText = phrases[phraseIndex];
      }
    }, 100);
  };
  runPreloader();


  // ==========================================
  // 2. Sidebar Navigation & Layout
  // ==========================================
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // Tab switching
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.dataset.target;
      
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");

      viewportTabs.forEach(tab => {
        tab.classList.remove("active");
        if (tab.getAttribute("id") === `tab-${target}`) {
          tab.classList.add("active");
        }
      });
      
      // Close sidebar on mobile navigation
      sidebar.classList.remove("active");
    });
  });


  // ==========================================
  // 3. Render Store Directory & Menus
  // ==========================================
  const renderDirectory = () => {
    merchantsGrid.innerHTML = "";
    
    merchants.forEach(m => {
      const card = document.createElement("div");
      card.className = "merchant-card glass-card";
      card.innerHTML = `
        <div class="merchant-img-wrapper">
          <span class="merchant-cuisine-badge">${m.cuisine}</span>
          <img src="${m.image}" alt="${m.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
        </div>
        <div class="merchant-details">
          <div class="merchant-header-row">
            <h3>${m.name}</h3>
            <span class="merchant-rating"><i class="fa-solid fa-star text-gold"></i> ${m.rating}</span>
          </div>
          <p class="merchant-desc">${m.description}</p>
          <div class="merchant-meta">
            <span><i class="fa-solid fa-clock"></i> ${m.deliveryTime}</span>
            <span><i class="fa-solid fa-motorcycle"></i> ETB ${m.deliveryFee}</span>
          </div>
        </div>
      `;
      card.addEventListener("click", () => openMerchantMenu(m));
      merchantsGrid.appendChild(card);
    });
  };

  const openMerchantMenu = (merchant) => {
    activeMerchant = merchant;
    
    // Set Header Info
    menuMerchantHeader.innerHTML = `
      <div class="menu-header-logo">
        <i class="${merchant.icon}"></i>
      </div>
      <div class="menu-header-info">
        <h2>${merchant.name}</h2>
        <div class="menu-header-meta">
          <span><i class="fa-solid fa-star text-gold"></i> ${merchant.rating}</span>
          <span>•</span>
          <span><i class="fa-solid fa-motorcycle"></i> ETB ${merchant.deliveryFee} Delivery</span>
          <span>•</span>
          <span><i class="fa-solid fa-clock"></i> ${merchant.deliveryTime}</span>
        </div>
      </div>
    `;

    // Render Menu Items
    menuItemsGrid.innerHTML = "";
    merchant.menu.forEach(item => {
      const itemCard = document.createElement("div");
      itemCard.className = "menu-item-card glass-card";
      itemCard.innerHTML = `
        <div class="menu-item-img-wrapper" style="height: 140px; overflow: hidden; border-radius: 8px; margin-bottom: 12px; background: var(--bg-dark-subtle);">
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9; transition: var(--transition-smooth);">
        </div>
        <div class="menu-item-title-row">
          <h4>${item.name}</h4>
          <span class="menu-item-price">ETB ${item.price}</span>
        </div>
        <p class="menu-item-desc">${item.desc}</p>
        <button class="btn btn-primary menu-item-btn add-to-basket-btn" data-id="${item.id}">
          Add to Basket <i class="fa-solid fa-plus"></i>
        </button>
      `;
      menuItemsGrid.appendChild(itemCard);
    });

    // Bind item buttons
    document.querySelectorAll(".add-to-basket-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(parseInt(btn.dataset.id));
      });
    });

    // Transition viewports
    merchantDirectory.style.display = "none";
    merchantMenuView.style.display = "block";
  };

  closeMenuViewBtn.addEventListener("click", () => {
    merchantMenuView.style.display = "none";
    merchantDirectory.style.display = "block";
    activeMerchant = null;
  });

  renderDirectory();


  // ==========================================
  // 4. Shopping Basket Logic
  // ==========================================
  const updateCartUI = () => {
    cartItemsList.innerHTML = "";
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Your delivery basket is empty.</p>
        </div>
      `;
      cartCounter.innerText = "0";
      subtotalDisplay.innerText = "ETB 0.00";
      deliveryDisplay.innerText = "ETB 0.00";
      totalDisplay.innerText = "ETB 0.00";
      checkoutTriggerBtn.disabled = true;
      return;
    }

    checkoutTriggerBtn.disabled = false;
    let subtotal = 0;
    
    // Find active merchant to query delivery fee
    const currentMerchant = merchants.find(m => 
      m.menu.some(item => item.id === cart[0].id)
    );
    const fee = currentMerchant ? currentMerchant.deliveryFee : 90;

    cart.forEach(item => {
      // Find menu item details
      let menuItem = null;
      merchants.forEach(m => {
        const found = m.menu.find(i => i.id === item.id);
        if (found) menuItem = found;
      });

      if (!menuItem) return;

      const itemTotal = menuItem.price * item.quantity;
      subtotal += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div class="cart-item-details">
          <h4>${menuItem.name}</h4>
          <span>ETB ${menuItem.price}</span>
        </div>
        <div class="cart-item-actions">
          <div class="cart-qty-control">
            <button class="cart-qty-btn qty-minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="cart-qty-btn qty-plus" data-id="${item.id}">+</button>
          </div>
          <span class="cart-remove-btn" data-id="${item.id}">Remove</span>
        </div>
      `;
      cartItemsList.appendChild(itemEl);
    });

    const total = subtotal + fee;

    cartCounter.innerText = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    subtotalDisplay.innerText = `ETB ${subtotal.toFixed(2)}`;
    deliveryDisplay.innerText = `ETB ${fee.toFixed(2)}`;
    totalDisplay.innerText = `ETB ${total.toFixed(2)}`;

    // Quantity buttons
    document.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", () => adjustQty(parseInt(btn.dataset.id), -1));
    });
    document.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", () => adjustQty(parseInt(btn.dataset.id), 1));
    });
    document.querySelectorAll(".cart-remove-btn").forEach(btn => {
      btn.addEventListener("click", () => removeFromCart(parseInt(btn.dataset.id)));
    });
  };

  const addToCart = (id) => {
    // If cart has items from a different merchant, ask/clear
    const itemMerchant = merchants.find(m => m.menu.some(i => i.id === id));
    
    if (cart.length > 0) {
      const activeCartMerchant = merchants.find(m => m.menu.some(i => i.id === cart[0].id));
      if (activeCartMerchant.id !== itemMerchant.id) {
        if (confirm(`You have items from ${activeCartMerchant.name} in your basket. Clear basket to order from ${itemMerchant.name}?`)) {
          cart = [];
        } else {
          return;
        }
      }
    }

    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: id, quantity: 1 });
    }

    updateCartUI();
    openCartDrawer();
  };

  const adjustQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  };

  const removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
  };

  const openCartDrawer = () => cartDrawerBackdrop.classList.add("active");
  const closeCartDrawer = () => cartDrawerBackdrop.classList.remove("active");

  cartTrigger.addEventListener("click", openCartDrawer);
  cartClose.addEventListener("click", closeCartDrawer);
  cartDrawerBackdrop.addEventListener("click", (e) => {
    if (e.target === cartDrawerBackdrop) closeCartDrawer();
  });


  // ==========================================
  // 5. Checkout Modal & Payment Selector
  // ==========================================
  checkoutTriggerBtn.addEventListener("click", () => {
    closeCartDrawer();
    
    // Reset forms
    checkoutForm.reset();
    selectedPaymentMethod.value = "telebirr";
    payMethodTelebirr.classList.add("active");
    payMethodCbe.classList.remove("active");
    panelTelebirr.classList.add("active");
    panelCbe.classList.remove("active");
    
    checkoutTelebirrPhone.required = true;
    checkoutCbeRef.required = false;

    checkoutFormContainer.style.display = "block";
    checkoutProcessingContainer.style.display = "none";
    checkoutModal.classList.add("active");
  });

  const closeCheckoutModal = () => checkoutModal.classList.remove("active");
  checkoutModalClose.addEventListener("click", closeCheckoutModal);
  checkoutModal.addEventListener("click", (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  // Select Payment
  payMethodTelebirr.addEventListener("click", () => {
    selectedPaymentMethod.value = "telebirr";
    payMethodTelebirr.classList.add("active");
    payMethodCbe.classList.remove("active");
    panelTelebirr.classList.add("active");
    panelCbe.classList.remove("active");

    checkoutTelebirrPhone.required = true;
    checkoutCbeRef.required = false;
  });

  payMethodCbe.addEventListener("click", () => {
    selectedPaymentMethod.value = "cbe";
    payMethodCbe.classList.add("active");
    payMethodTelebirr.classList.remove("active");
    panelCbe.classList.add("active");
    panelTelebirr.classList.remove("active");

    checkoutCbeRef.required = true;
    checkoutTelebirrPhone.required = false;
  });

  // Confirm and submit order
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const address = document.getElementById("checkout-address").value.trim();
    const phone = document.getElementById("checkout-phone-num").value.trim();
    const tip = parseInt(document.getElementById("checkout-driver-tip").value);
    const payment = selectedPaymentMethod.value;

    // Validate details
    if (payment === "telebirr") {
      const tPhone = checkoutTelebirrPhone.value.trim();
      if (!/^(09|07)\d{8}$/.test(tPhone)) {
        alert("Please input a valid Telebirr phone number.");
        return;
      }
    } else {
      const ref = checkoutCbeRef.value.trim();
      if (ref.length < 6) {
        alert("Please enter a valid CBE bank reference ID.");
        return;
      }
    }

    // Capture items ordered
    const merchant = merchants.find(m => m.menu.some(i => i.id === cart[0].id));
    const orderedItems = cart.map(c => {
      const found = merchant.menu.find(i => i.id === c.id);
      return found ? `${c.quantity}x ${found.name}` : "";
    }).join(", ");

    // Transition to Processing allocation loader
    checkoutFormContainer.style.display = "none";
    checkoutProcessingContainer.style.display = "block";

    let progress = 0;
    const stages = [
      "Contacting dispatch server...",
      "Allocating nearby couriers...",
      "Optimizing routing matrix...",
      "Rider Tariku Hailu assigned! Dispatched..."
    ];

    processingBar.style.width = "0%";
    processingTitle.innerText = "Finding Rider...";
    processingStatus.innerText = stages[0];

    const allocTimer = setInterval(() => {
      progress += 5;
      if (progress > 100) {
        progress = 100;
        clearInterval(allocTimer);
        
        setTimeout(() => {
          closeCheckoutModal();
          
          // Initiate Order State
          activeOrder = {
            id: Math.floor(Math.random() * 9000) + 1000,
            merchant: merchant.name,
            items: orderedItems,
            address: address,
            tip: tip,
            payment: payment === "telebirr" ? "Telebirr" : "CBE Transfer",
            status: "Dispatched (En Route)"
          };

          // Save active order to history immediately to update counters
          saveOrderToHistory(activeOrder);

          // Reset cart
          cart = [];
          updateCartUI();
          
          // Trigger live tracking interface
          startDriverTracking();
        }, 400);
      } else {
        processingBar.style.width = `${progress}%`;
        const phraseIdx = Math.min(
          Math.floor((progress / 100) * stages.length),
          stages.length - 1
        );
        processingStatus.innerText = stages[phraseIdx];
      }
    }, 150);
  });


  // ==========================================
  // 6. Real-time Driver Tracking Engine
  // ==========================================
  const getActiveOrders = () => {
    const history = JSON.parse(localStorage.getItem("gebeta_order_history")) || [];
    return history.filter(order => !order.status.toLowerCase().includes("delivered"));
  };

  const renderTrackingSelectors = (currentOrder) => {
    const selectorContainer = document.getElementById("tracking-selector-container");
    const selectorsGrid = document.getElementById("tracking-selectors-grid");
    
    if (!selectorContainer || !selectorsGrid) return;
    
    const activeOrders = getActiveOrders();
    
    if (activeOrders.length <= 1) {
      selectorContainer.style.display = "none";
      return;
    }
    
    selectorContainer.style.display = "block";
    selectorsGrid.innerHTML = "";
    
    activeOrders.forEach(order => {
      let routeDesc = "Bole to Home";
      if (order.address.toLowerCase().includes("kazanchis")) routeDesc = "Bole to Kazanchis";
      else if (order.address.toLowerCase().includes("arat kilo")) routeDesc = "Bole to Arat Kilo";
      
      const btn = document.createElement("button");
      btn.className = `tracking-select-btn ${order.id === currentOrder.id ? "active" : ""}`;
      btn.innerHTML = `
        <div>
          <strong class="order-num">#${order.id}</strong>
          <div class="route-desc" style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${routeDesc}</div>
        </div>
        <span class="tracking-status-badge" style="margin-bottom: 0; padding: 2px 8px; font-size: 9px;">${order.status}</span>
      `;
      btn.addEventListener("click", () => {
        activeOrder = order;
        startDriverTracking();
      });
      selectorsGrid.appendChild(btn);
    });
  };

  const startDriverTracking = () => {
    // Clear previous tracking loop
    clearInterval(trackingInterval);

    // If no activeOrder is selected, pick the first active order
    const activeOrders = getActiveOrders();
    if (!activeOrder && activeOrders.length > 0) {
      activeOrder = activeOrders[0];
    }
    
    if (!activeOrder) {
      // Toggle active dots off if no active delivery
      trackingActiveIndicator.style.display = "none";
      return;
    }
    
    // Switch to Tracking Tab
    navItems.forEach(n => {
      n.classList.remove("active");
      if (n.dataset.target === "track") n.classList.add("active");
    });
    viewportTabs.forEach(tab => {
      tab.classList.remove("active");
      if (tab.id === "tab-track") tab.classList.add("active");
    });

    // Toggle active dots on sidebar
    trackingActiveIndicator.style.display = "block";

    // Setup map view
    mapIdleOverlay.style.display = "none";
    trackingMapSvg.style.display = "block";

    // Render active selectors
    renderTrackingSelectors(activeOrder);

    // Configure labels
    trackStatusBadge.className = "tracking-status-badge pulse-saffron";
    trackStatusBadge.innerText = activeOrder.status;
    trackMerchantName.innerText = activeOrder.merchant;
    trackOrderSummary.innerText = `Order #${activeOrder.id} • ${activeOrder.items}`;
    trackDriverCard.style.display = "flex";
    
    // Clear logs view
    trackStatusLogs.innerHTML = "";

    // Determine route path and destination marker coordinates
    let pathD = "M 150,150 L 400,150 L 400,450 L 650,450"; // Default
    let destX = 650, destY = 450;
    let destLabel = "YOUR HOME";
    
    if (activeOrder.address.toLowerCase().includes("kazanchis")) {
      pathD = "M 150,150 L 400,150 L 400,300 L 300,300"; // Bole to Kazanchis
      destX = 300;
      destY = 300;
      destLabel = "KAZANCHIS";
    } else if (activeOrder.address.toLowerCase().includes("arat kilo")) {
      pathD = "M 150,150 L 150,350 L 550,350 L 550,150"; // Bole to Arat Kilo
      destX = 550;
      destY = 150;
      destLabel = "ARAT KILO";
    }
    
    // Update SVG Path & Customer Pin Location
    routePathLine.setAttribute("d", pathD);
    const markerCustomer = document.getElementById("marker-customer");
    const markerLabel = document.getElementById("marker-customer-label");
    if (markerCustomer) markerCustomer.setAttribute("transform", `translate(${destX}, ${destY})`);
    if (markerLabel) markerLabel.textContent = destLabel;

    // Tracking Loop Variables
    const totalDistance = 4.8; // km
    const totalMinutes = 12; // mins
    const pathLength = routePathLine.getTotalLength();

    // Configure tracking state persistence
    if (!window.trackingStates) window.trackingStates = {};
    if (!window.trackingStates[activeOrder.id]) {
      let initialProgress = 0;
      if (activeOrder.id === 5921) initialProgress = 20; // seed Kazanchis at 20%
      if (activeOrder.id === 4812) initialProgress = 50; // seed Arat Kilo at 50%
      
      window.trackingStates[activeOrder.id] = {
        progress: initialProgress,
        logs: []
      };
    }
    
    const state = window.trackingStates[activeOrder.id];
    let trackProgress = state.progress;

    // Set Initial Position
    const startPoint = routePathLine.getPointAtLength((trackProgress / 100) * pathLength);
    mapRiderCourier.setAttribute("transform", `translate(${startPoint.x}, ${startPoint.y})`);

    const logPhrases = [
      { trigger: 0, text: "Tariku Hailu accepted order. Navigating to kitchen.", type: "active" },
      { trigger: 15, text: "Rider arrived at restaurant. Awaiting food packaging.", type: "completed" },
      { trigger: 35, text: "Order picked up. Courier heading to Bole Road corridor.", type: "completed" },
      { trigger: 65, text: "Courier cruising past Churchill Road intersection.", type: "completed" },
      { trigger: 85, text: "Courier entered customer neighborhood. 1 min away.", type: "completed" },
      { trigger: 100, text: "Courier arrived at destination! Collect your Gebeta package.", type: "completed" }
    ];

    const pushLog = (text, type = "completed") => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const logObj = { time: timeStr, text: text, type: type };
      
      // Prevent duplicates
      if (!state.logs.some(l => l.text === text)) {
        state.logs.push(logObj);
      }
      
      // Render
      trackStatusLogs.innerHTML = "";
      state.logs.slice().reverse().forEach((log, index) => {
        const li = document.createElement("li");
        li.className = `log-item ${index === 0 && log.type === "active" ? "active" : "completed"}`;
        li.innerHTML = `<span class="log-time">${log.time}</span> ${log.text}`;
        trackStatusLogs.appendChild(li);
      });
    };

    // Pre-populate past logs up to current progress
    logPhrases.forEach(log => {
      if (trackProgress >= log.trigger) {
        pushLog(log.text, trackProgress === log.trigger ? "active" : "completed");
      }
    });

    trackingInterval = setInterval(() => {
      trackProgress += 1;
      state.progress = trackProgress;
      
      if (trackProgress >= 100) {
        trackProgress = 100;
        state.progress = 100;
        clearInterval(trackingInterval);
        
        trackStatusBadge.className = "tracking-status-badge";
        trackStatusBadge.innerText = "Delivered";
        trackEta.innerText = "Arrived";
        trackDistance.innerText = "0.0 km";
        trackingActiveIndicator.style.display = "none";
        
        pushLog(logPhrases[logPhrases.length - 1].text, "active");

        // Save order to history as delivered
        activeOrder.status = "Delivered";
        saveOrderToHistory(activeOrder);
        
        // Re-render selectors
        renderTrackingSelectors(activeOrder);
      } else {
        // Calculate point along path
        const currentLength = (trackProgress / 100) * pathLength;
        const point = routePathLine.getPointAtLength(currentLength);
        
        // Translate courier icon
        mapRiderCourier.setAttribute("transform", `translate(${point.x}, ${point.y})`);

        // Update ETA & distance
        const distanceRemaining = (totalDistance * (1 - trackProgress / 100)).toFixed(1);
        const etaRemaining = Math.ceil(totalMinutes * (1 - trackProgress / 100));

        trackDistance.innerText = `${distanceRemaining} km`;
        trackEta.innerText = `${etaRemaining} mins`;

        // Check if logs should trigger
        const logTrigger = logPhrases.find(l => l.trigger === trackProgress);
        if (logTrigger) {
          pushLog(logTrigger.text, "active");
        }
      }
    }, 400); // Ticks every 400ms
  };


  // ==========================================
  // 7. Orders Listing History
  // ==========================================
  const saveOrderToHistory = (order) => {
    let history = JSON.parse(localStorage.getItem("gebeta_order_history")) || [];
    const existingIdx = history.findIndex(o => o.id === order.id);
    if (existingIdx !== -1) {
      history[existingIdx].status = order.status;
    } else {
      history.unshift(order);
    }
    localStorage.setItem("gebeta_order_history", JSON.stringify(history));
    renderOrderHistory();
  };

  const renderOrderHistory = () => {
    ordersListWrapper.innerHTML = "";
    
    // Clear legacy mock data cache to ensure fresh seed
    if (localStorage.getItem("gebeta_order_history") && localStorage.getItem("gebeta_order_history").includes("Bole Subcity, Condominium Block 12")) {
      localStorage.removeItem("gebeta_order_history");
    }
    
    // Seed default mock orders if not present
    if (!localStorage.getItem("gebeta_order_history")) {
      const mockHistory = [
        {
          id: 5921,
          merchant: "Sheger Burger & Grill",
          items: "1x Double Sheger Cheese Burger, 1x Truffle Hand-Cut Fries",
          address: "Kazanchis, Block 12, Addis Ababa",
          tip: 30,
          payment: "Telebirr",
          status: "Dispatched (En Route)"
        },
        {
          id: 4812,
          merchant: "Habesha Gourmet",
          items: "1x Special Doro Wat",
          address: "Arat Kilo, House No. 89, Addis Ababa",
          tip: 50,
          payment: "CBE Transfer",
          status: "Dispatched (En Route)"
        },
        {
          id: 3104,
          merchant: "Bole Organic Market",
          items: "1x Fresh Organic Avocados",
          address: "Bole Atlas, Apt 4B, Addis Ababa",
          tip: 0,
          payment: "Telebirr",
          status: "Delivered"
        }
      ];
      localStorage.setItem("gebeta_order_history", JSON.stringify(mockHistory));
    }

    const history = JSON.parse(localStorage.getItem("gebeta_order_history")) || [];

    // Calculate active orders count (statuses other than Delivered)
    const activeCount = history.filter(order => !order.status.toLowerCase().includes("delivered")).length;
    const ordersCounterEl = document.getElementById("orders-counter");
    const ordersHeaderCounterEl = document.getElementById("orders-header-counter");
    if (ordersCounterEl) ordersCounterEl.innerText = activeCount;
    if (ordersHeaderCounterEl) ordersHeaderCounterEl.innerText = activeCount;

    if (history.length === 0) {
      ordersListWrapper.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-receipt"></i>
          <p>No past order history found.</p>
        </div>
      `;
      return;
    }

    history.forEach(order => {
      // Determine status class
      let statusClass = "status-dispatched";
      const statusLower = order.status.toLowerCase();
      if (statusLower.includes("delivered")) {
        statusClass = "status-delivered";
      } else if (statusLower.includes("preparing") || statusLower.includes("ordered")) {
        statusClass = "status-preparing";
      }

      const card = document.createElement("div");
      card.className = "order-history-card glass-card";
      card.innerHTML = `
        <div class="order-history-header">
          <h3>${order.merchant}</h3>
          <span class="tracking-status-badge ${statusClass}">${order.status.toUpperCase()}</span>
        </div>
        <div class="order-history-body">
          <p><strong>Items:</strong> ${order.items}</p>
          <p><strong>Deliver to:</strong> ${order.address}</p>
          <div class="order-history-meta">
            <span>Payment: <strong>${order.payment}</strong></span>
            <span>Tip: <strong>ETB ${order.tip}</strong></span>
            <span>Order ID: <strong>#${order.id}</strong></span>
          </div>
        </div>
      `;
      ordersListWrapper.appendChild(card);
    });
  };

  // Initial render of history
  renderOrderHistory();

});
