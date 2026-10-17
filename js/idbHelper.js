window.idbHelper = {
    // ذخیره آرایه بایتی در IndexedDB
    saveDbBytes: function (dbName, bytes) {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open("CabEstimateDB", 1);
            req.onupgradeneeded = e => {
                if (!e.target.result.objectStoreNames.contains("files")) {
                    e.target.result.createObjectStore("files");
                }
            };
            req.onsuccess = e => {
                const db = e.target.result;
                const tx = db.transaction("files", "readwrite");
                // C# به صورت خودکار byte[] را به Uint8Array تبدیل می‌کند
                tx.objectStore("files").put(bytes, dbName);
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);
            };
            req.onerror = () => reject(req.error);
        });
    },

    // بازیابی آرایه بایتی از IndexedDB
    loadDbBytes: function (dbName) {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open("CabEstimateDB", 1);
            req.onupgradeneeded = e => {
                if (!e.target.result.objectStoreNames.contains("files")) {
                    e.target.result.createObjectStore("files");
                }
            };
            req.onsuccess = e => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains("files")) {
                    resolve(null);
                    return;
                }
                const tx = db.transaction("files", "readonly");
                const getReq = tx.objectStore("files").get(dbName);
                getReq.onsuccess = () => {
                    if (getReq.result) {
                        // تبدیل Uint8Array به آرایه‌ی معمولی تا C# بتواند آن را به byte[] تبدیل کند
                        resolve(Array.from(getReq.result));
                    } else {
                        resolve(null);
                    }
                };
                getReq.onerror = () => reject(getReq.error);
            };
            req.onerror = () => reject(req.error);
        });
    }
};