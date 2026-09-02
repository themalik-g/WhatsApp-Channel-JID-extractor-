<div align="center">

# 📡 WhatsApp Channel JID Finder

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=22&pause=1000&color=25D366&center=true&vCenter=true&width=600&lines=Extract+Newsletter+JIDs+from+WhatsApp+Web;Find+your+Channel+ID+in+seconds;No+external+tools+needed+on+PC!" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/themalik-g/Newsletter-jid/stargazers"><img src="https://img.shields.io/github/stars/themalik-g/Newsletter-jid?style=for-the-badge&logo=github&color=FFD700" alt="Stars"></a>
  <a href="https://github.com/themalik-g/Newsletter-jid/network/members"><img src="https://img.shields.io/github/forks/themalik-g/Newsletter-jid?style=for-the-badge&logo=github&color=00BFFF" alt="Forks"></a>
  <a href="https://github.com/themalik-g/Newsletter-jid/issues"><img src="https://img.shields.io/github/issues/themalik-g/Newsletter-jid?style=for-the-badge&logo=github&color=FF4500" alt="Issues"></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge&color=25D366" alt="License"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/IndexedDB-000000?style=for-the-badge&logo=indexeddb&logoColor=white" alt="IndexedDB">
  <img src="https://img.shields.io/badge/Console-Hacker?style=for-the-badge&logo=gnubash&logoColor=white&color=2E2E2E" alt="Console">
</p>

---

### ✨ A simple, browser-based method to extract newsletter JIDs from WhatsApp Web — no extensions, no downloads (on PC)!

</div>

---

## ⚠️ IMPORTANT DISCLAIMER & WARNINGS

> **Please read this section carefully before proceeding.**

| 🚨 Risk | Description |
|---------|-------------|
| **Terms of Service** | This tool extracts data from WhatsApp Web's internal storage (IndexedDB). This is **NOT** an official WhatsApp/Meta feature. Using it may violate WhatsApp's Terms of Service. |
| **Account Safety** | WhatsApp may detect unusual activity and restrict or permanently ban your account. Use this at your **own risk**. |
| **No Guarantees** | This script relies on WhatsApp Web's internal structure, which changes frequently. It may stop working without notice. |
| **Educational Purpose** | This repository is intended for educational purposes and for developers who need Channel JIDs for legitimate automation (e.g., Baileys library). |
| **Data Privacy** | The script runs entirely in your browser. No data is sent to any external server. However, always review code before pasting it into your browser console. |

**By using this tool, you acknowledge that you understand these risks and accept full responsibility for any consequences.**

---

## 🚀 Quick Overview

This repository provides a **single JavaScript snippet** that you can run directly in your browser's Developer Console to extract all **WhatsApp Channel Newsletter JIDs** from WhatsApp Web's IndexedDB storage.

> ⚡ **No external software required on PC** — just your browser's built-in DevTools!

> 💡 **Why this exists:** If you're using [Baileys](https://github.com/WhiskeySockets/Baileys) or other WhatsApp automation libraries, you need the Channel JID (e.g., `1234567890123456789@newsletter`) to interact with channels programmatically. WhatsApp Web does **not** expose this ID in the UI. This tool fills that gap.

---

## 📋 Prerequisites

| Platform | Requirement |
|----------|-------------|
| 💻 **PC (Windows/Linux/Mac)** | Any modern browser with Developer Tools |
| 📱 **Mobile** | External browser with DevTools support (recommended: [**Kiwi Browser**](https://www.mediafire.com/file/gshtnfy2wv0g56x/kiwi-browser-139-0-7339-0.apk/file)) |

> 🔔 **Note:** On mobile phones, there is no other browser that gives you developer tools like **Kiwi Browser**. It is the only mobile browser that provides a full-featured DevTools console, making it essential for running this script on Android.

---

## 🛠️ Step-by-Step Guide

### 💻 For PC Users (Windows / Linux / macOS)

> You **do not** need to install any external browser. Use your existing browser's built-in Developer Tools.

#### Step 1: Login to WhatsApp Web & Select Your Channel

1. Open [web.whatsapp.com](https://web.whatsapp.com) in your browser
2. Scan the QR code with your phone to log in
3. Click on the **Channel** you want the JID of

<p align="center">
  <img src="https://h.uguu.se/enmAerFr.jpg" alt="WhatsApp Web opening & Channel Selection" width="600">
  <br>
  <em>📸 Screenshot: WhatsApp Web with channel selected</em>
</p>

---
#### Step 2: Open Developer Tools

| OS | Shortcut |
|----|----------|
| 🪟 **Windows / Linux** | `Ctrl + Shift + I` or press `F12` |
| 🍎 **Mac** | `Cmd + Option + I` |

<p align="center">
  <img src="https://n.uguu.se/QMrYxQZN.jpg" alt="Open DevTools on PC" width="600">
  <br>
  <em>📸 Screenshot: Opening console tab Developer Tools in your browser</em>
</p>

---
#### Step 3: Copy & Run the Script

1. In DevTools, click on the **Console** tab
2. Click the **📋 Copy Script** button below to copy the code
3. Paste it into the console and press **Enter**

<!-- COPY SCRIPT START -->
<div align="center">

### 📋 Copy Script

<button onclick="copyScript()" style="background-color:#25D366;color:white;border:none;padding:12px 24px;font-size:16px;border-radius:8px;cursor:pointer;font-weight:bold;">
  📋 Copy Script to Clipboard
</button>

<script>
function copyScript() {
  const script = `(async () => {
  const channels = new Map();
  const dbs = await indexedDB.databases();
  for (const dbInfo of dbs) {
    try {
      const db = await new Promise((res, rej) => {
        const req = indexedDB.open(dbInfo.name);
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
      });
      const storeNames = Array.from(db.objectStoreNames);
      for (const storeName of storeNames) {
        try {
          const tx = db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const records = await new Promise(res => {
            const req = store.getAll();
            req.onsuccess = () => res(req.result);
            req.onerror = () => res([]);
          });
          records.forEach(item => {
            if (!item) return;
            const str = JSON.stringify(item);
            const jidMatch = str.match(/\d{15,20}@newsletter/);
            if (jidMatch) {
              const jid = jidMatch[0];
              const name = item.name || item.subject || item.title || "Unknown";
              if (!channels.has(jid) || channels.get(jid) === "Unknown") {
                channels.set(jid, name);
              }
            }
          });
        } catch(e) {}
      }
    } catch(e) {}
  }
  console.log("%c--- CHANNEL LIST ---", "color: #00e676; font-weight: bold; font-size: 14px;");
  channels.forEach((name, jid) => {
    console.log(\\`\\${name}: \\${jid}\\`);
  });
  if (channels.size === 0) {
    console.log("%cNo newsletter JIDs found. Make sure you have a channel open.", "color: #ff9800;");
  }
})();`;

  navigator.clipboard.writeText(script).then(() => {
    alert("✅ Script copied to clipboard! Paste it in the console.");
  }).catch(() => {
    alert("❌ Failed to copy. Please select and copy the script manually from the code block below.");
  });
}
</script>

</div>

> 🔔 **Tip:** If the button doesn't work, manually select and copy the code from the block below:

```javascript
(async () => {
  const channels = new Map();
  const dbs = await indexedDB.databases();
  for (const dbInfo of dbs) {
    try {
      const db = await new Promise((res, rej) => {
        const req = indexedDB.open(dbInfo.name);
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
      });
      const storeNames = Array.from(db.objectStoreNames);
      for (const storeName of storeNames) {
        try {
          const tx = db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const records = await new Promise(res => {
            const req = store.getAll();
            req.onsuccess = () => res(req.result);
            req.onerror = () => res([]);
          });
          records.forEach(item => {
            if (!item) return;
            const str = JSON.stringify(item);
            const jidMatch = str.match(/\d{15,20}@newsletter/);
            if (jidMatch) {
              const jid = jidMatch[0];
              const name = item.name || item.subject || item.title || "Unknown";
              if (!channels.has(jid) || channels.get(jid) === "Unknown") {
                channels.set(jid, name);
              }
            }
          });
        } catch(e) {}
      }
    } catch(e) {}
  }
  console.log("%c--- CHANNEL LIST ---", "color: #00e676; font-weight: bold; font-size: 14px;");
  channels.forEach((name, jid) => {
    console.log(`${name}: ${jid}`);
  });
  if (channels.size === 0) {
    console.log("%cNo newsletter JIDs found. Make sure you have a channel open.", "color: #ff9800;");
  }
})();
```
<!-- COPY SCRIPT END -->

<p align="center">
  <img src="https://i.uguu.se/fjPqHjfe.jpg" alt="Getting results from Console" width="600">
  <br>
  <em>📸 Screenshot: Getting results from Console tab in Developer Tools</em>
</p>

---

### 📱 For Mobile Users (Android)

> 📥 **Download Kiwi Browser first:**
>
> **⬇️ [Click here to download Kiwi Browser APK](https://www.mediafire.com/file/gshtnfy2wv0g56x/kiwi-browser-139-0-7339-0.apk/file)**

> 🔔 **Remember:** On mobile phones, there is no other browser that gives you developer tools like Kiwi Browser. You **must** use Kiwi Browser to access the console on Android.

#### Step 1: Install & Open Kiwi Browser

1. Download and install the **Kiwi Browser** APK from the link above
2. Open Kiwi Browser on your Android device

<p align="center">
  <img src="https://i.uguu.se/wXqKqYbQ.jpg" alt="Kiwi Browser installation" width="600">
  <br>
  <em>📸 Screenshot: Kiwi Browser installed and opened</em>
</p>

---

#### Step 2: Login to WhatsApp Web & Select Your Channel

1. Go to [web.whatsapp.com](https://web.whatsapp.com) in Kiwi Browser
2. Tap the **3 dots menu (⋮)** → **Desktop site** to enable desktop mode
3. Scan the QR code with your phone to log in
4. Tap on the **Channel** you want the JID of

<p align="center">
  <img src="https://i.uguu.se/xxxxx.jpg" alt="WhatsApp Web in Kiwi Browser" width="600">
  <br>
  <em>📸 Screenshot: WhatsApp Web opened in Kiwi Browser with channel selected</em>
</p>

---

#### Step 3: Open Developer Tools in Kiwi Browser

1. Tap the **3 dots menu (⋮)** in the top-right corner
2. Scroll down and tap on **Developer tools**
3. The DevTools panel will open at the bottom of the screen

<p align="center">
  <img src="https://i.uguu.se/xxxxx.jpg" alt="DevTools in Kiwi Browser" width="600">
  <br>
  <em>📸 Screenshot: Developer Tools opened in Kiwi Browser</em>
</p>

---

#### Step 4: Paste & Run the Script

1. Switch to the **Console** tab in DevTools
2. Long-press in the console input area and **Paste** the script
3. Tap the **Enter** key on your keyboard to execute

---

## 📤 Output Example

When the script runs successfully, you'll see output like this in the console:

```
--- CHANNEL LIST ---
MEHTAB MD: 120363409689492071@newsletter
FIFA World Cup: 120363404391131888@newsletter
Unknown: 120363403878088232@newsletter
```

> ✅ Copy the JID you need and use it in your Baileys project or other automation tools.

---

## ❓ FAQ

<details>
<summary><b>Is this safe to use?</b></summary>
<br>
The script only reads from your browser's local IndexedDB and does not send data anywhere. However, using it may violate WhatsApp's Terms of Service. Use at your own risk. See the <a href="#-important-disclaimer--warnings">Disclaimer</a> section above.
</details>

<details>
<summary><b>Why do I need the Channel JID?</b></summary>
<br>
WhatsApp automation libraries like <a href="https://github.com/WhiskeySockets/Baileys">Baileys</a> require the JID (e.g., <code>123456789@newsletter</code>) to send messages to or interact with channels programmatically. WhatsApp Web does not display this ID in the user interface.
</details>

<details>
<summary><b>The script isn't finding any JIDs. What's wrong?</b></summary>
<br>
Make sure:
<ol>
  <li>You are logged into WhatsApp Web</li>
  <li>You have clicked on at least one channel (so it's loaded in memory)</li>
  <li>You are using a modern browser with IndexedDB support</li>
  <li>WhatsApp Web hasn't updated their internal structure (the script may need updating)</li>
</ol>
</details>

<details>
<summary><b>Will this work on iPhone/iOS?</b></summary>
<br>
Unfortunately, iOS browsers (including Safari and Chrome) do not provide Developer Tools / Console access. This tool requires a browser with DevTools support. On mobile, only Android with Kiwi Browser is supported.
</details>

<details>
<summary><b>Can WhatsApp ban my account for using this?</b></summary>
<br>
Possibly. This is an unofficial method that accesses WhatsApp Web's internal data. While the script itself is read-only, WhatsApp's anti-spam systems may flag unusual behavior. We recommend using this on a secondary/test account rather than your primary number.
</details>

---

## 🤝 Support & Contact

Need help? Found a bug? Want to suggest a feature? Reach out!

<p align="center">
  <a href="https://wa.me/923257853673">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
  <a href="https://t.me/M347ab">
    <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  </a>
  <a href="https://instagram.com/m347ab">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
  </a>
</p>

<p align="center">
  <a href="https://wa.me/923257853673">📱 WhatsApp: +92 325 7853673</a> • 
  <a href="https://t.me/M347ab">✈️ Telegram: @M347ab</a> • 
  <a href="https://instagram.com/m347ab">📸 Instagram: @m347ab</a>
</p>

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

> ⚠️ **Note:** The MIT License covers the code in this repository. It does not grant permission to violate WhatsApp's Terms of Service. Users are responsible for ensuring their use case complies with all applicable laws and platform policies.

---

<div align="center">

### ⭐ Star this repo if it helped you!

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=18&pause=1000&color=FFD700&center=true&vCenter=true&width=400&lines=Happy+Coding!;Built+with+❤️+by+Mehtab" alt="Footer Typing SVG" />
</p>

</div>
