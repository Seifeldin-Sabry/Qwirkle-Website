"use strict";

const h2logoutEl = document.querySelector('#h2-logout');
const logoutEl = document.querySelector('#logout');

const isLoggedIn = () => {
    return JSON.parse(localStorage.getItem("isLoggedIn"))
}

function logout() {
    h2logoutEl.classList.add('hidden');
    localStorage.clear();
    if (window.location.pathname === '/statistics-logged.html'){
        location.replace('../statistics.html')
    }
    else location.reload();
}

function showLogout() {
    if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
        h2logoutEl.classList.remove('hidden');
    }
}
logoutEl.addEventListener('click', logout);
window.onload = showLogout;

