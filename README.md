# Account Tier Feature Admin Panel

An internal admin panel for operations staff to manage which banking features are available on each account tier. Built with plain HTML, CSS and JavaScript (no dependencies, no build step).

## Video walkthrough

**Code explanation (5 min):** https://REPLACE-WITH-YOUR-PUBLIC-VIDEO-URL

## Features

- **Feature matrix:** features as rows (Instant Transfers, Crypto Trading, High-Yield Savings, International Wires, Virtual Cards, Priority Support) and tiers as columns (Basic, Gold, Platinum), with a switch in every cell.
- **Audit log:** every switch click adds an entry such as `10:15 PM: Activated 'Crypto Trading' for Gold accounts`. The log updates live and the newest entry is always at the top.
- Entries are colour-coded (green for activated, red for deactivated) and a counter shows how many changes were made this session.
- Responsive layout, automatic dark mode, keyboard accessible (Tab to a switch, Space to toggle), and screen readers announce new log entries.

## Run it

Open `index.html` in any browser.

## How it works

- `FEATURES` and `TIERS` define the grid. `state` holds the on/off value for every feature and tier pair, starting from `DEFAULTS`.
- The grid is rendered once. A single `change` listener on the table body (event delegation) handles all switches: it updates `state` and calls `addAuditEntry`.
- `addAuditEntry` puts the new entry at the **start** of the `auditLog` array (`unshift`), so the array is always newest first, then re-renders the list.
- The log lives in memory only, so it resets when the page is refreshed ("changes made during the session").

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure: matrix table and audit log container |
| `styles.css` | Layout, switch styling, log styling, responsive and dark mode |
| `script.js` | Data, rendering, toggle handling, audit log |
| `VIDEO_SCRIPT.md` | Talking points for the walkthrough video |

## Notes and next steps

This is a front-end demo. In production the toggle would also send the change to a backend API, and the audit entry would be saved server-side with the staff member's identity and a full timestamp.
# audit-log