
const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}
const getLocalStorage = (key) => {
    return localStorage.getItem(key);
}
const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
}

//llamar config.headers y poner bearer token
export { setLocalStorage, getLocalStorage, deleteLocalStorage };