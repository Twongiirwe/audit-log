// ---------- Data ----------
const TIERS = ["Basic", "Gold", "Platinum"];

const FEATURES = [
  { id: "instant-transfers", name: "Instant Transfers", note: "Real-time account-to-account payments" },
  { id: "crypto-trading", name: "Crypto Trading", note: "Buy and sell supported digital assets" },
  { id: "high-yield-savings", name: "High-Yield Savings", note: "Premium interest savings pots" },
  { id: "international-wires", name: "International Wires", note: "Cross-border transfers" },
  { id: "virtual-cards", name: "Virtual Cards", note: "Disposable and merchant-locked cards" },
  { id: "priority-support", name: "Priority Support", note: "24/7 dedicated support line" },
];

// Starting state: which tiers have each feature switched on.
const DEFAULTS = {
  "instant-transfers": { Basic: true, Gold: true, Platinum: true },
  "crypto-trading": { Basic: false, Gold: false, Platinum: true },
  "high-yield-savings": { Basic: false, Gold: true, Platinum: true },
  "international-wires": { Basic: false, Gold: true, Platinum: true },
  "virtual-cards": { Basic: true, Gold: true, Platinum: true },
  "priority-support": { Basic: false, Gold: false, Platinum: true },
};

// Copy the defaults so toggling never mutates the DEFAULTS object.
const state = JSON.parse(JSON.stringify(DEFAULTS));

// Audit entries for this session, newest first.
const auditLog = [];

// ---------- Element references ----------
const headRow = document.getElementById("matrix-head");
const body = document.getElementById("matrix-body");
const logList = document.getElementById("audit-log");
const logEmpty = document.getElementById("log-empty");
const logCount = document.getElementById("log-count");

// ---------- Helpers ----------
function formatTime(date) {
  // e.g. "11:24 AM"
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

// ---------- Rendering ----------
function renderMatrix() {
  const headCells = ['<th class="feature" scope="col">Feature</th>']
    .concat(TIERS.map((tier) => `<th scope="col">${tier}</th>`))
    .join("");
  headRow.innerHTML = headCells;

  body.innerHTML = FEATURES.map((feature) => {
    const cells = TIERS.map((tier) => {
      const checked = state[feature.id][tier] ? "checked" : "";
      return `
        <td>
          <label class="switch">
            <input type="checkbox" role="switch"
                   data-feature="${feature.id}" data-tier="${tier}"
                   aria-label="${feature.name} for ${tier} accounts" ${checked} />
            <span class="slider"></span>
          </label>
        </td>`;
    }).join("");

    return `
      <tr>
        <td class="feature">${feature.name}<small>${feature.note}</small></td>
        ${cells}
      </tr>`;
  }).join("");
}

function renderLog() {
  logList.innerHTML = "";

  // auditLog is already newest-first, so render in order.
  for (const entry of auditLog) {
    const li = document.createElement("li");
    li.className = entry.enabled ? "on" : "off";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = `${entry.time}:`;

    const message = document.createElement("span");
    message.textContent = entry.message;

    li.append(time, message);
    logList.appendChild(li);
  }

  logEmpty.hidden = auditLog.length > 0;
  logCount.textContent = `${auditLog.length} ${auditLog.length === 1 ? "change" : "changes"}`;
}

// ---------- Behaviour ----------
function addAuditEntry(feature, tier, enabled) {
  const verb = enabled ? "Activated" : "Deactivated";
  auditLog.unshift({
    time: formatTime(new Date()),
    enabled,
    message: `${verb} '${feature.name}' for ${tier} accounts`,
  });
  renderLog();
}

// One listener on the table handles every switch (event delegation).
body.addEventListener("change", (event) => {
  const input = event.target;
  if (!input.matches('input[type="checkbox"]')) return;

  const feature = FEATURES.find((f) => f.id === input.dataset.feature);
  const tier = input.dataset.tier;
  const enabled = input.checked;

  state[feature.id][tier] = enabled;
  addAuditEntry(feature, tier, enabled);
});

// ---------- Start ----------
renderMatrix();
renderLog();
