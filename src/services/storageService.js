export const storageService = {
    storeToSession,
    loadFromSession
}

function storeToSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromSession(key) {
    let data = sessionStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}