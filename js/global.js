"use strict";

const h2logoutEl = document.querySelector('#h2-logout');
const logoutEl = document.querySelector('#logout');
const isLoggedIn = () => {
    return JSON.parse(localStorage.getItem("isLoggedIn"))
}
logoutEl.addEventListener('click', logout);

function logout() {
    h2logoutEl.classList.add('hidden');
    localStorage.clear();
}
function showLogout() {
    if (localStorage.getItem('isLoggedIn') != undefined) {
        h2logoutEl.classList.remove('hidden');
    }
}
window.onload = showLogout;

