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
    location.reload();
}
function showLogout() {
    if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
        h2logoutEl.classList.remove('hidden');
    }
}

window.onload = showLogout;

