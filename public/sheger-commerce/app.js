document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. FUTURISTIC CYBERPUNK PRELOADER
  // ==========================================
  const preloader = document.getElementById("cyber-preloader");
  const workspace = document.getElementById("app-workspace");
  const progressFill = document.getElementById("preloader-progress");
  const progressPercent = document.getElementById("preloader-percent");
  const progressPhrase = document.getElementById("preloader-phrase");

  const phrases = [
    { threshold: 0, text: "Connecting to secure payment pipelines..." },
    { threshold: 25, text: "Loading Telebirr & Chapa gateway handshakes..." },
    { threshold: 50, text: "Syncing automated inventory catalog database..." },
    { threshold: 75, text: "Optimizing premium technology storefront..." },
    { threshold: 95, text: "Sheger Commerce ready!" }
  ];

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 8) + 2;
    if (loadProgress > 100) loadProgress = 100;

    progressFill.style.width = `${loadProgress}%`;
    progressPercent.innerText = `${loadProgress}%`;

    const activePhrase = phrases.reduce((prev, curr) => {
      return loadProgress >= curr.threshold ? curr : prev;
    });
    progressPhrase.innerText = activePhrase.text;

    if (loadProgress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transform = "scale(1.05)";
        
        workspace.style.display = "flex";
        setTimeout(() => {
          workspace.style.opacity = "1";
          workspace.style.transform = "scale(1)";
          preloader.style.display = "none";
        }, 300);
      }, 600);
    }
  }, 100);

  // ==========================================
  // 2. PRODUCT DATABASE & STORAGE SEEDING
  // ==========================================
  const defaultProducts = [
    { id: 9001, name: "MacBook Pro 16\" M3 Max", category: "laptops", price: 185000, stock: 6, desc: "Liquid Retina XDR display, 36GB unified memory, 1TB SSD. Built for extreme workflows.", image: "images/laptop.jpg" },
    { id: 9002, name: "iPhone 15 Pro Max Flagship", category: "phones", price: 98000, stock: 12, desc: "Titanium design, A17 Pro chip, 48MP main camera. The ultimate Apple device.", image: "images/smartphone.jpg" },
    { id: 9003, name: "Sony WH-1000XM5 Studio", category: "audio", price: 24500, stock: 2, desc: "Industry-leading noise cancellation, exceptional sound quality, 30-hour battery life.", image: "images/headphones.jpg" },
    { id: 9004, name: "Apple Watch Ultra 2 GPS", category: "wearables", price: 49000, stock: 8, desc: "Rugged design, customizable action button, dual-frequency GPS. Built for outdoor athletes.", image: "images/smartwatch.jpg" },
    { id: 9005, name: "Google Nest Smart Hub v2", category: "wearables", price: 11500, stock: 0, desc: "7-inch smart display with speaker. Control your smart home, watch videos, and listen to music.", image: "images/smarthome.jpg" }
  ];

  if (!localStorage.getItem("sheger_products")) {
    localStorage.setItem("sheger_products", JSON.stringify(defaultProducts));
  }

  if (!localStorage.getItem("sheger_sales_revenue")) {
    localStorage.setItem("sheger_sales_revenue", "0");
  }

  if (!localStorage.getItem("sheger_sales_orders")) {
    localStorage.setItem("sheger_sales_orders", "0");
  }

  // State Variables
  let products = JSON.parse(localStorage.getItem("sheger_products"));
  let cart = [];
  let currentCategory = "all";
  let activeTab = "store";

  // ==========================================
  // 3. UI ELEMENT REFERENCES
  // ==========================================
  const productGrid = document.getElementById("product-grid");
  const categoriesRow = document.querySelector(".categories-row");
  const cartTrigger = document.getElementById("cart-trigger");
  const cartCountBadge = document.getElementById("cart-count-badge");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
  const closeCart = document.getElementById("close-cart");
  const cartBody = document.getElementById("cart-body");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");

  // Navigation switchers
  const navBtnStore = document.getElementById("nav-btn-store");
  const navBtnAdmin = document.getElementById("nav-btn-admin");
  const tabStore = document.getElementById("tab-store");
  const tabAdmin = document.getElementById("tab-admin");
  const viewportTitle = document.getElementById("viewport-title");
  const viewportSubtitle = document.getElementById("viewport-subtitle");

  // Admin stats
  const statRevenue = document.getElementById("stat-revenue");
  const statOrders = document.getElementById("stat-orders");
  const statAlerts = document.getElementById("stat-alerts");
  const statAlertsSubtitle = document.getElementById("stat-alerts-subtitle");
  const stockAlertsBadge = document.getElementById("stock-alerts-badge");
  const inventoryTableBody = document.getElementById("inventory-table-body");
  const telegramConsole = document.getElementById("telegram-console");

  // Payment modals
  const telebirrModal = document.getElementById("telebirr-modal");
  const chapaModal = document.getElementById("chapa-modal");
  const successModal = document.getElementById("success-modal");
  const chapaForm = document.getElementById("chapa-checkout-form");
  const chapaLoadingScreen = document.getElementById("chapa-loading-screen");
  const telebirrPayable = document.getElementById("telebirr-payable-amount");
  const chapaPayable = document.getElementById("chapa-payable-amount");
  const successReceipt = document.getElementById("success-receipt-details");

  // Add Item Modal
  const addItemModal = document.getElementById("add-item-modal");
  const openAddModalBtn = document.getElementById("open-add-modal-btn");
  const addProductForm = document.getElementById("add-product-form");

  // ==========================================
  // 4. CORE CONTROLLERS & RENDERING FUNCTIONS
  // ==========================================
  
  // Format Currency Utility
  const formatCurrency = (amount) => {
    return "ETB " + parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Render Product Catalog Storefront
  const renderCatalog = () => {
    productGrid.innerHTML = "";
    
    const filteredProducts = currentCategory === "all" 
      ? products 
      : products.filter(p => p.category === currentCategory);

    if (filteredProducts.length === 0) {
      productGrid.innerHTML = `
        <div class="cart-empty" style="grid-column: 1/-1; padding: 40px 0;">
          <i class="fa-solid fa-store-slash"></i>
          <p>No products found in this category.</p>
        </div>
      `;
      return;
    }

    filteredProducts.forEach(product => {
      let stockClass = "in-stock";
      let stockText = "In Stock";
      
      if (product.stock === 0) {
        stockClass = "out-stock";
        stockText = "Out of Stock";
      } else if (product.stock <= 3) {
        stockClass = "low-stock";
        stockText = `Low Stock (${product.stock})`;
      }

      const card = document.createElement("div");
      card.className = "product-card glass-card";
      card.innerHTML = `
        <div class="product-img-wrapper">
          <img src="${product.image}" class="product-img" alt="${product.name}">
          <span class="stock-tag ${stockClass}">${stockText}</span>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3>${product.name}</h3>
          <p class="product-desc">${product.desc}</p>
          <div class="product-footer">
            <div class="product-price">
              <span>Price</span>
              <strong>${formatCurrency(product.price)}</strong>
            </div>
            <button class="add-cart-btn" data-id="${product.id}" ${product.stock === 0 ? "disabled" : ""}>
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      `;
      productGrid.appendChild(card);
    });

    // Wire up add-to-cart click events
    document.querySelectorAll(".add-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        addToCart(id);
      });
    });
  };

  // Render Admin inventory table & update stat counters
  const renderAdminConsole = () => {
    inventoryTableBody.innerHTML = "";
    
    // 1. Calculate and update stats counters
    const totalRev = parseFloat(localStorage.getItem("sheger_sales_revenue"));
    const totalOrdersCount = parseInt(localStorage.getItem("sheger_sales_orders"));
    
    statRevenue.innerText = formatCurrency(totalRev);
    statOrders.innerText = totalOrdersCount;

    const lowStockItems = products.filter(p => p.stock <= 3);
    const lowStockCount = lowStockItems.length;
    statAlerts.innerText = `${lowStockCount} items`;

    if (lowStockCount > 0) {
      statAlertsSubtitle.innerText = `${lowStockCount} items require replenishment`;
      statAlertsSubtitle.className = "stat-trend negative";
      stockAlertsBadge.style.display = "inline-block";
      stockAlertsBadge.innerText = lowStockCount;
    } else {
      statAlertsSubtitle.innerText = "All inventory levels healthy";
      statAlertsSubtitle.className = "stat-trend positive";
      stockAlertsBadge.style.display = "none";
    }

    // 2. Populate table rows
    products.forEach(product => {
      let stockClass = "in-stock";
      let stockText = `In Stock (${product.stock})`;
      
      if (product.stock === 0) {
        stockClass = "out-stock";
        stockText = "Out of Stock";
      } else if (product.stock <= 3) {
        stockClass = "low-stock";
        stockText = `Low Stock (${product.stock})`;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>#${product.id}</td>
        <td>
          <div class="product-row-meta">
            <img src="${product.image}" alt="${product.name}">
            <div>
              <strong>${product.name}</strong>
              <span class="text-muted">${product.desc.substring(0, 45)}...</span>
            </div>
          </div>
        </td>
        <td><span class="category-btn" style="padding: 4px 10px; pointer-events: none; border-radius: 6px; text-transform: capitalize;">${product.category}</span></td>
        <td><strong>${formatCurrency(product.price)}</strong></td>
        <td><span class="stock-pill ${stockClass}">${stockText}</span></td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn restock-btn" data-id="${product.id}"><i class="fa-solid fa-plus-minus"></i></button>
            <button class="action-icon-btn delete action-icon-btn delete-btn" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;
      inventoryTableBody.appendChild(tr);
    });

    // Wire table button click handlers
    document.querySelectorAll(".restock-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        const amtStr = prompt("Enter stock modification delta (positive to restock, negative to reduce):", "5");
        if (amtStr !== null) {
          const delta = parseInt(amtStr);
          if (!isNaN(delta)) {
            restockProduct(id, delta);
          }
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        if (confirm("Are you sure you want to delete this product from the inventory database?")) {
          deleteProduct(id);
        }
      });
    });
  };

  // ==========================================
  // 5. INVENTORY MODIFIERS
  // ==========================================
  const restockProduct = (id, delta) => {
    products = products.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);
        return { ...p, stock: newStock };
      }
      return p;
    });
    saveProductsState();
  };

  const deleteProduct = (id) => {
    products = products.filter(p => p.id !== id);
    saveProductsState();
  };

  const saveProductsState = () => {
    localStorage.setItem("sheger_products", JSON.stringify(products));
    renderCatalog();
    renderAdminConsole();
  };

  // ==========================================
  // 6. CART STATE ACTIONS
  // ==========================================
  const addToCart = (id) => {
    const product = products.find(p => p.id === id);
    if (!product || product.stock <= 0) return;

    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      if (cartItem.qty < product.stock) {
        cartItem.qty++;
      } else {
        alert("Cannot add more. Limit reached (Only " + product.stock + " items in stock).");
        return;
      }
    } else {
      cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    openCartDrawer();
  };

  const updateCartQty = (id, change) => {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    if (!cartItem) return;

    cartItem.qty += change;
    if (cartItem.qty <= 0) {
      cart = cart.filter(item => item.id !== id);
    } else if (cartItem.qty > product.stock) {
      cartItem.qty = product.stock;
      alert("Only " + product.stock + " items available in stock.");
    }
    updateCartUI();
  };

  const openCartDrawer = () => {
    cartDrawer.classList.add("active");
    cartDrawerOverlay.style.display = "block";
  };

  const closeCartDrawer = () => {
    cartDrawer.classList.remove("active");
    cartDrawerOverlay.style.display = "none";
  };

  const updateCartUI = () => {
    cartBody.innerHTML = "";
    
    const checkoutTelebirrBtn = document.getElementById("checkout-telebirr-btn");
    const checkoutChapaBtn = document.getElementById("checkout-chapa-btn");

    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Your cart is empty.</p>
        </div>
      `;
      cartCountBadge.innerText = "0";
      cartSubtotal.innerText = "ETB 0.00";
      cartTotal.innerText = "ETB 0.00";
      checkoutTelebirrBtn.disabled = true;
      checkoutChapaBtn.disabled = true;
      return;
    }

    checkoutTelebirrBtn.disabled = false;
    checkoutChapaBtn.disabled = false;

    let subTotalVal = 0;
    let totalCount = 0;

    cart.forEach(item => {
      subTotalVal += item.price * item.qty;
      totalCount += item.qty;

      const itemRow = document.createElement("div");
      itemRow.className = "cart-item";
      itemRow.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-meta">
          <h4>${item.name}</h4>
          <span>${formatCurrency(item.price)}</span>
        </div>
        <div class="cart-qty-ctrl">
          <button class="qty-dec" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
          <span>${item.qty}</span>
          <button class="qty-inc" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
        </div>
      `;
      cartBody.appendChild(itemRow);
    });

    cartCountBadge.innerText = totalCount;
    cartSubtotal.innerText = formatCurrency(subTotalVal);
    
    const finalTotalVal = subTotalVal + 150; // subtotal + 150 shipping
    cartTotal.innerText = formatCurrency(finalTotalVal);

    // Qty controls listeners
    document.querySelectorAll(".qty-dec").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        updateCartQty(id, -1);
      });
    });
    document.querySelectorAll(".qty-inc").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        updateCartQty(id, 1);
      });
    });
  };

  // ==========================================
  // 7. PAYMENTS GATEWAYS INTEGRATION FLOW
  // ==========================================
  window.closePaymentModal = (provider) => {
    const modal = document.getElementById(`${provider}-modal`);
    if (modal) modal.classList.remove("active");
  };

  const triggerPaymentFlow = (provider) => {
    let subTotalVal = 0;
    cart.forEach(item => { subTotalVal += item.price * item.qty; });
    const finalTotal = subTotalVal + 150;

    closeCartDrawer();

    if (provider === "telebirr") {
      telebirrPayable.innerText = formatCurrency(finalTotal);
      telebirrModal.classList.add("active");
      
      // Simulate Telebirr payment confirmation socket tick
      setTimeout(() => {
        finalizeCheckout("Telebirr");
      }, 4000);
      
    } else if (provider === "chapa") {
      chapaPayable.innerText = formatCurrency(finalTotal);
      chapaModal.classList.add("active");
      chapaForm.style.display = "block";
      chapaLoadingScreen.style.display = "none";
    }
  };

  // Chapa Card submit handler
  chapaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    chapaForm.style.display = "none";
    chapaLoadingScreen.style.display = "flex";

    setTimeout(() => {
      finalizeCheckout("Chapa Card");
    }, 3500);
  });

  const finalizeCheckout = (paymentMethod) => {
    // 1. Deduct inventory items stock
    products = products.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: Math.max(0, product.stock - cartItem.qty) };
      }
      return product;
    });
    
    // Save stock reduction state
    saveProductsState();

    // 2. Update dashboard stats totals
    let orderTotalVal = 0;
    let orderedItemLines = [];
    cart.forEach(item => {
      orderTotalVal += item.price * item.qty;
      orderedItemLines.push(`${item.qty}x ${item.name}`);
    });
    const finalTotal = orderTotalVal + 150;

    const currentRevenue = parseFloat(localStorage.getItem("sheger_sales_revenue")) + finalTotal;
    const currentOrders = parseInt(localStorage.getItem("sheger_sales_orders")) + 1;
    
    localStorage.setItem("sheger_sales_revenue", currentRevenue.toString());
    localStorage.setItem("sheger_sales_orders", currentOrders.toString());

    // Close checkout modals
    closePaymentModal("telebirr");
    closePaymentModal("chapa");

    // 3. Populate and show success receipt modal
    const orderId = Math.floor(Math.random() * 900000) + 100000;
    successReceipt.innerHTML = `
      <div class="receipt-row">
        <span>Invoice Number</span>
        <strong>#INV-${orderId}</strong>
      </div>
      <div class="receipt-row">
        <span>Payment Gateway</span>
        <strong>${paymentMethod}</strong>
      </div>
      <div class="receipt-row">
        <span>Purchased Items</span>
        <strong style="text-align: right; max-width: 250px; font-size: 11px;">${orderedItemLines.join(", ")}</strong>
      </div>
      <div class="receipt-row">
        <span>Total Deducted</span>
        <strong style="color: var(--primary-cyan);">${formatCurrency(finalTotal)}</strong>
      </div>
    `;
    successModal.classList.add("active");

    // 4. Trigger Webhook Telegram dispatch logs
    dispatchTelegramWebhook(orderId, paymentMethod, finalTotal, orderedItemLines);

    // Reset Cart
    cart = [];
    updateCartUI();
    renderAdminConsole();
  };

  // ==========================================
  // 8. TELEGRAM SIMULATED WEBHOOKS ENGINE
  // ==========================================
  const dispatchTelegramWebhook = (orderId, method, total, items) => {
    // Hide empty placeholder in logs console
    const placeholder = telegramConsole.querySelector(".console-placeholder");
    if (placeholder) placeholder.style.display = "none";

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    
    const payload = {
      event: "order.checkout_success",
      timestamp: now.toISOString(),
      order_details: {
        invoice_id: `INV-${orderId}`,
        gateway: method.toLowerCase().replace(" ", "_"),
        currency: "ETB",
        total_payable: total,
        items_ordered: items
      },
      telegram_routing: {
        chat_id: "-100204918204",
        alert_status: "dispatched",
        parse_mode: "markdown"
      }
    };

    const entry = document.createElement("div");
    entry.className = "console-entry";
    entry.innerHTML = `
      <div>
        <span class="timestamp">[${timeStr}]</span>
        <span class="badge">TELEGRAM WEBHOOK DISPATCHED</span>
      </div>
      <pre><code>${JSON.stringify(payload, null, 2)}</code></pre>
    `;
    
    telegramConsole.insertBefore(entry, telegramConsole.firstChild);
  };

  // ==========================================
  // 9. TABS SWAPPING & CONTROLS
  // ==========================================
  const switchTab = (target) => {
    activeTab = target;
    
    // Swapping nav list active states
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });
    
    if (target === "store") {
      navBtnStore.classList.add("active");
      tabStore.classList.add("active");
      tabAdmin.classList.remove("active");
      viewportTitle.innerText = "Premium Catalog";
      viewportSubtitle.innerText = "Browse and order high-performance technology";
    } else {
      navBtnAdmin.classList.add("active");
      tabAdmin.classList.add("active");
      tabStore.classList.remove("active");
      viewportTitle.innerText = "Management Dashboard";
      viewportSubtitle.innerText = "Monitor inventory levels, sales revenue, and API log telemetry";
      renderAdminConsole();
    }
  };

  navBtnStore.addEventListener("click", () => switchTab("store"));
  navBtnAdmin.addEventListener("click", () => switchTab("admin"));

  // Store Category filter switching
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".category-btn").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentCategory = e.currentTarget.dataset.category;
      renderCatalog();
    });
  });

  // Cart Drawer open/close
  cartTrigger.addEventListener("click", openCartDrawer);
  closeCart.addEventListener("click", closeCartDrawer);
  cartDrawerOverlay.addEventListener("click", closeCartDrawer);

  // checkout actions
  document.getElementById("checkout-telebirr-btn").addEventListener("click", () => triggerPaymentFlow("telebirr"));
  document.getElementById("checkout-chapa-btn").addEventListener("click", () => triggerPaymentFlow("chapa"));

  // Restock Add Item modal triggers
  openAddModalBtn.addEventListener("click", () => {
    addItemModal.classList.add("active");
  });

  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("add-name").value;
    const category = document.getElementById("add-category").value;
    const price = parseFloat(document.getElementById("add-price").value);
    const stock = parseInt(document.getElementById("add-stock").value);
    const desc = document.getElementById("add-desc").value;
    const image = document.getElementById("add-image").value;

    const newProd = {
      id: Math.floor(Math.random() * 9000) + 1000,
      name,
      category,
      price,
      stock,
      desc,
      image
    };

    products.push(newProd);
    saveProductsState();
    
    closePaymentModal("add-item");
    addProductForm.reset();
    
    alert(`"${name}" successfully added to inventory database.`);
  });

  // Initialization
  renderCatalog();
  updateCartUI();

});
