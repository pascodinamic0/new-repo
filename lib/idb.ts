const DB = "mtusda-bible"
const STORE = "chapters"

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function cacheChapter(key: string, value: unknown) {
  const db = await open()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite")
    tx.objectStore(STORE).put(value, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export async function readChapter<T>(key: string): Promise<T | null> {
  const db = await open()
  const value = await new Promise<T | null>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly")
    const req = tx.objectStore(STORE).get(key)
    req.onsuccess = () => resolve((req.result as T) || null)
    req.onerror = () => reject(req.error)
  })
  db.close()
  return value
}
