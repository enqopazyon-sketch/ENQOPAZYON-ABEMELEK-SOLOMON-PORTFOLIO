document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. VAULT-DECRYPTION PRELOADER
  // ==========================================
  const preloader = document.getElementById("vault-preloader");
  const workspace = document.getElementById("app-workspace");
  const progressFill = document.getElementById("preloader-progress");
  const progressPercent = document.getElementById("preloader-percent");
  const progressPhrase = document.getElementById("preloader-phrase");

  const phrases = [
    { threshold: 0, text: "Establishing secure SSL tunnel handshake..." },
    { threshold: 25, text: "Configuring end-to-end envelope encryption (AES-256)..." },
    { threshold: 50, text: "Syncing decentralized bank ledger streams..." },
    { threshold: 75, text: "Decrypting Adugna Wealth Wallet keychain..." },
    { threshold: 95, text: "Wallet unlocked! Initializing telemetry..." }
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
  }, 90);

  // ==========================================
  // 2. WEALTH STATE & LEDGER SEED DATA
  // ==========================================
  const defaultTransactions = [
    { id: 701, desc: "Salary Direct Deposit", bank: "Commercial Bank of Ethiopia (CBE)", amount: 85000, type: "income", category: "Salary", date: "2026-07-18" },
    { id: 702, desc: "Bole Organic Market Checkout", bank: "Telebirr Wallet", amount: 1650, type: "expense", category: "Food & Groceries", date: "2026-07-19" },
    { id: 703, desc: "Sheger Commerce Tech order", bank: "Cooperative Bank of Oromia", amount: 48000, type: "expense", category: "Tech & Electronics", date: "2026-07-19" },
    { id: 704, desc: "Monthly Rent Payment", bank: "Commercial Bank of Ethiopia (CBE)", amount: 18000, type: "expense", category: "Rent & Housing", date: "2026-07-01" },
    { id: 705, desc: "Netflix Subscription", bank: "Telebirr Wallet", amount: 380, type: "expense", category: "Entertainment", date: "2026-07-15" }
  ];

  const defaultBudgets = [
    { category: "Food & Groceries", limit: 12000 },
    { category: "Rent & Housing", limit: 30000 },
    { category: "Tech & Electronics", limit: 60000 },
    { category: "Entertainment", limit: 5000 }
  ];

  if (!localStorage.getItem("adugna_bank_balance")) {
    localStorage.setItem("adugna_bank_balance", "254800");
  }
  if (!localStorage.getItem("adugna_investments")) {
    localStorage.setItem("adugna_investments", "1165700");
  }
  if (!localStorage.getItem("adugna_transactions")) {
    localStorage.setItem("adugna_transactions", JSON.stringify(defaultTransactions));
  }
  if (!localStorage.getItem("adugna_budgets")) {
    localStorage.setItem("adugna_budgets", JSON.stringify(defaultBudgets));
  }

  // State Variables
  let bankBalance = parseFloat(localStorage.getItem("adugna_bank_balance"));
  let investmentsVal = parseFloat(localStorage.getItem("adugna_investments"));
  let transactions = JSON.parse(localStorage.getItem("adugna_transactions"));
  let budgets = JSON.parse(localStorage.getItem("adugna_budgets"));
  
  let currentFilter = "all";
  let activeTab = "dashboard";

  // ==========================================
  // 3. UI ELEMENT REFERENCES
  // ==========================================
  const netWorthValEl = document.getElementById("net-worth-val");
  const bankBalanceValEl = document.getElementById("bank-balance-val");
  const investmentsValEl = document.getElementById("investments-val");
  const ledgerList = document.getElementById("ledger-list");
  
  // Navigation elements
  const navBtnDashboard = document.getElementById("nav-btn-dashboard");
  const navBtnBudgeting = document.getElementById("nav-btn-budgeting");
  const navBtnSecurity = document.getElementById("nav-btn-security");
  const tabDashboard = document.getElementById("tab-dashboard");
  const tabBudgeting = document.getElementById("tab-budgeting");
  const tabSecurity = document.getElementById("tab-security");
  const viewportTitle = document.getElementById("viewport-title");
  const viewportSubtitle = document.getElementById("viewport-subtitle");

  // Transfer Modal elements
  const transferModal = document.getElementById("transfer-modal");
  const openTransferBtn = document.getElementById("open-transfer-btn");
  const transferForm = document.getElementById("transfer-funds-form");
  const transferProcessing = document.getElementById("transfer-processing");

  // Budgeting elements
  const budgetTrackersList = document.getElementById("budget-trackers-list");
  const budgetSettingsForm = document.getElementById("budget-settings-form");

  // Security elements
  const securityTerminal = document.getElementById("security-terminal");
  const notificationContainer = document.getElementById("notification-container");

  // ==========================================
  // 4. CORE DATA RENDERERS
  // ==========================================

  // Format Currency
  const formatCurrency = (amount) => {
    return "ETB " + parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Render Dashboard statistics totals
  const renderDashboardStats = () => {
    bankBalanceValEl.innerText = formatCurrency(bankBalance);
    investmentsValEl.innerText = formatCurrency(investmentsVal);
    
    const netWorth = bankBalance + investmentsVal;
    netWorthValEl.innerText = formatCurrency(netWorth);
  };

  // Render transaction history ledger list
  const renderLedger = () => {
    ledgerList.innerHTML = "";
    
    const filteredLedger = currentFilter === "all"
      ? transactions
      : transactions.filter(t => t.type === currentFilter);

    if (filteredLedger.length === 0) {
      ledgerList.innerHTML = `
        <div class="cart-empty" style="padding: 20px 0;">
          <i class="fa-solid fa-receipt" style="opacity:0.1; font-size: 24px;"></i>
          <p style="font-size:11px; color:var(--text-muted);">No records found in this category.</p>
        </div>
      `;
      return;
    }

    filteredLedger.forEach(item => {
      const isIncome = item.type === "income";
      const iconClass = isIncome ? "fa-solid fa-arrow-trend-up income" : "fa-solid fa-arrow-trend-down expense";
      const amountSign = isIncome ? "+" : "-";
      const amountClass = isIncome ? "income" : "expense";

      const li = document.createElement("li");
      li.className = "ledger-item";
      li.innerHTML = `
        <div class="ledger-meta">
          <div class="ledger-icon ${amountClass}"><i class="${iconClass}"></i></div>
          <div class="ledger-desc">
            <strong>${item.desc}</strong>
            <span>${item.bank} • ${item.date}</span>
          </div>
        </div>
        <strong class="ledger-amount ${amountClass}">${amountSign} ${parseFloat(item.amount).toLocaleString('en-US')}</strong>
      `;
      ledgerList.appendChild(li);
    });
  };

  // Render budget progress monitors
  const renderBudgetTrackers = () => {
    budgetTrackersList.innerHTML = "";

    budgets.forEach(budget => {
      // Calculate total expenses for this budget category
      const expenses = transactions
        .filter(t => t.type === "expense" && t.category === budget.category)
        .reduce((sum, curr) => sum + curr.amount, 0);

      const percent = Math.min(100, Math.round((expenses / budget.limit) * 100)) || 0;
      
      let fillClass = "normal";
      if (percent >= 90) {
        fillClass = "critical";
      } else if (percent >= 70) {
        fillClass = "warning";
      }

      const card = document.createElement("div");
      card.className = "budget-progress-card";
      card.innerHTML = `
        <div class="budget-meta-row">
          <span>${budget.category}</span>
          <strong>${formatCurrency(expenses)} / ${formatCurrency(budget.limit)}</strong>
        </div>
        <div class="budget-bar-bg">
          <div class="budget-bar-fill ${fillClass}" style="width: ${percent}%;"></div>
        </div>
        <div class="budget-status-row">
          <span>${percent}% utilized</span>
          <span>ETB ${(budget.limit - expenses).toLocaleString('en-US')} remaining</span>
        </div>
      `;
      budgetTrackersList.appendChild(card);
    });
  };

  // ==========================================
  // 5. QUICK TRANSFER CONTROLLERS
  // ==========================================
  window.closeModal = (id) => {
    const modal = document.getElementById(`${id}-modal`);
    if (modal) modal.classList.remove("active");
  };

  openTransferBtn.addEventListener("click", () => {
    transferModal.classList.add("active");
    transferProcessing.style.display = "none";
    transferForm.style.display = "block";
  });

  transferForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const recipient = document.getElementById("transfer-recipient").value;
    const bank = document.getElementById("transfer-bank").value;
    const amount = parseFloat(document.getElementById("transfer-amount").value);
    const category = document.getElementById("transfer-category").value;

    if (amount > bankBalance) {
      alert("Insufficient liquidity in wallet database. Available: " + formatCurrency(bankBalance));
      return;
    }

    transferForm.style.display = "none";
    transferProcessing.style.display = "flex";

    // Simulate blockchain ledger signing handshake
    setTimeout(() => {
      // Deduct balance
      bankBalance -= amount;
      localStorage.setItem("adugna_bank_balance", bankBalance.toString());

      // Add to transaction ledger
      const newTx = {
        id: Math.floor(Math.random() * 900) + 100,
        desc: `Transfer to ${recipient}`,
        bank: bank,
        amount: amount,
        type: "expense",
        category: category,
        date: new Date().toISOString().substring(0, 10)
      };

      transactions.unshift(newTx);
      localStorage.setItem("adugna_transactions", JSON.stringify(transactions));

      // Close modal
      closeModal("transfer");
      transferForm.reset();

      // Update Views
      renderDashboardStats();
      renderLedger();
      renderBudgetTrackers();

      // Trigger automatic transaction notification alert
      triggerNotificationAlert(recipient, amount);
      
      // Dispatch block ledger log in security
      addSecurityTerminalLog(`[BLOCKCHAIN] Sealed ledger block #${Math.floor(Math.random()*90000)+10000} for transfer of ETB ${amount.toLocaleString()} to ${recipient}`);

    }, 2500);
  });

  // Budget Limit Ceiling editor form
  budgetSettingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const category = document.getElementById("budget-category-select").value;
    const limit = parseFloat(document.getElementById("budget-limit-input").value);

    budgets = budgets.map(b => {
      if (b.category === category) {
        return { ...b, limit: limit };
      }
      return b;
    });

    localStorage.setItem("adugna_budgets", JSON.stringify(budgets));
    renderBudgetTrackers();
    budgetSettingsForm.reset();

    alert(`Spending ceiling for "${category}" adjusted to ${formatCurrency(limit)}.`);
    addSecurityTerminalLog(`[BUDGET] Updated spending ceiling ceiling threshold for category: "${category}" to ETB ${limit.toLocaleString()}`);
  });

  // ==========================================
  // 6. NOTIFICATION SYSTEM (ALERT ALERTS)
  // ==========================================
  const triggerNotificationAlert = (recipient, amount) => {
    const alert = document.createElement("div");
    alert.className = "notification-alert";
    alert.innerHTML = `
      <div class="alert-icon"><i class="fa-solid fa-bell"></i></div>
      <div class="alert-body">
        <h4>Transaction Successful</h4>
        <p>Sent <strong>ETB ${amount.toLocaleString()}</strong> to ${recipient}. Deducted from secure bank pipeline.</p>
      </div>
    `;
    notificationContainer.appendChild(alert);

    // Audio beep simulation cue using browser synthesis
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // high pitched clean beep
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // browser blocked audio Context
    }

    setTimeout(() => {
      alert.style.opacity = "0";
      alert.style.transform = "translateX(50px) scale(0.9)";
      setTimeout(() => {
        alert.remove();
      }, 350);
    }, 4500);
  };

  // ==========================================
  // 7. SECURITY TERMINAL ACTIVE LOG TICKER
  // ==========================================
  const addSecurityTerminalLog = (message) => {
    // Hide placeholder
    const placeholder = securityTerminal.querySelector(".terminal-placeholder");
    if (placeholder) placeholder.style.display = "none";

    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const log = document.createElement("div");
    log.className = "terminal-entry";
    log.innerHTML = `<span class="time">[${timeStr}]</span> ${message}`;
    securityTerminal.appendChild(log);
    
    // Auto-scroll
    securityTerminal.scrollTop = securityTerminal.scrollHeight;
  };

  // Simulated continuous security telemetry ticker
  const securityPhrases = [
    () => `[SSL] RSA-4096 crypt key validated with CBE server node API.`,
    () => `[SECURITY] Active envelope encapsulation established on sync pipelines.`,
    () => `[SYNC] Encrypted balance telemetry successfully validated. Code: AES-256-GCM.`,
    () => `[SECURE] Verification block #${Math.floor(Math.random()*900000)+100000} hashed successfully. Node: 0x${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
    () => `[API] Ping response: 18ms. Server status: fully synchronized.`,
    () => `[LEDGER] SHA-256 block validations passed on database registers.`
  ];

  // Tick every 4-5 seconds
  setInterval(() => {
    if (activeTab === "security" || Math.random() > 0.6) {
      const idx = Math.floor(Math.random() * securityPhrases.length);
      addSecurityTerminalLog(securityPhrases[idx]());
    }
  }, 4500);

  // Pre-seed terminal logs
  setTimeout(() => {
    addSecurityTerminalLog("[INIT] Encryption decrypt pipelines initialized.");
    addSecurityTerminalLog("[SSL] Handshake validated with CBE Core Bank Server.");
    addSecurityTerminalLog("[AES] Secure envelope active. Tunnel established.");
  }, 1000);

  // ==========================================
  // 8. TABS SWAPPING NAVIGATION CONTROLS
  // ==========================================
  const switchTab = (target) => {
    activeTab = target;
    
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });
    
    if (target === "dashboard") {
      navBtnDashboard.classList.add("active");
      tabDashboard.classList.add("active");
      tabBudgeting.classList.remove("active");
      tabSecurity.classList.remove("active");
      viewportTitle.innerText = "Net Worth Analysis";
      viewportSubtitle.innerText = "Real-time telemetry of asset allocations";
    } else if (target === "budgeting") {
      navBtnBudgeting.classList.add("active");
      tabBudgeting.classList.add("active");
      tabDashboard.classList.remove("active");
      tabSecurity.classList.remove("active");
      viewportTitle.innerText = "Budgeting Console";
      viewportSubtitle.innerText = "Monitor utilization rates and adjust spending ceilings";
      renderBudgetTrackers();
    } else if (target === "security") {
      navBtnSecurity.classList.add("active");
      tabSecurity.classList.add("active");
      tabDashboard.classList.remove("active");
      tabBudgeting.classList.remove("active");
      viewportTitle.innerText = "Security Pipelines";
      viewportSubtitle.innerText = "Audit cryptographic handshakes and database ledger logs";
    }
  };

  navBtnDashboard.addEventListener("click", () => switchTab("dashboard"));
  navBtnBudgeting.addEventListener("click", () => switchTab("budgeting"));
  navBtnSecurity.addEventListener("click", () => switchTab("security"));

  // Transactions ledger filter tabs switching
  document.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentFilter = e.currentTarget.dataset.filter;
      renderLedger();
    });
  });

  // Initial Run
  renderDashboardStats();
  renderLedger();
  renderBudgetTrackers();

});
