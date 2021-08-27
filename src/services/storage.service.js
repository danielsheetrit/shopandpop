export const storageService = {
    loadFromStorage,
    saveToStorage,
    clearAllStorage
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function clearAllStorage(key) {
    localStorage.clear(key)
}