(async () => {
  const dbs = await window.indexedDB.databases();
  const channels = new Map();

  for (const dbInfo of dbs) {
    if (!dbInfo.name) continue;

    const db = await new Promise(res => {
      const req = indexedDB.open(dbInfo.name);
      req.onsuccess = () => res(req.result);
      req.onerror = () => res(null);
    });

    if (!db) continue;

    for (const storeName of Array.from(db.objectStoreNames)) {
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
            const name = item.name || item.subject || item.title || (str.includes("PUT_YOUR_WHATSAPP_CHANNEL_NAME_HERE") ? "PUT_YOUR_WHATSAPP_CHANNEL_NAME_HERE" : "Unknown");
            if (!channels.has(jid) || channels.get(jid) === "Unknown") {
              channels.set(jid, name);
            }
          }
        });
      } catch(e) {}
    }
  }

  console.log("%c--- CHANNEL LIST ---", "color: #00e676; font-weight: bold; font-size: 14px;");
  channels.forEach((name, jid) => {
    if (name.toLowerCase().includes("mehtab") || name === "PUT_YOUR_WHATSAPP_CHANNEL_NAME_HERE") {
      console.log(`%c👉 ${name}: ${jid} (YOUR CHANNEL)`, "color: #00ff00; font-weight: bold; font-size: 15px;");
    } else {
      console.log(`${name}: ${jid}`);
    }
  });
})();
