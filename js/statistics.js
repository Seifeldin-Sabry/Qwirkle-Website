"use strict";

import {users} from "./db/users.js";

const formEl = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

const invalidCredentials = document.querySelector('#credentials');
const formText = document.querySelector('#form-text');
invalidCredentials.style.color = 'red';

const redirect = () => {
    location.replace('../statistics-logged.html');
}

const setLogin = (username) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", `${username}`);
}

const isLoggedIn = () => {
    return JSON.parse(localStorage.getItem("isLoggedIn"))
}

const validateLogin = (event) => {
    event.preventDefault();

    const filteredUsers = users.filter(obj => {
        return obj.username === usernameInput.value && obj.password === passwordInput.value;
    });
    console.log(filteredUsers)
    if (!filteredUsers.length) {
        invalidCredentials.classList.remove('hidden');
        formText.style.display = "none";
        return;
    }
    setLogin(usernameInput.value);
    redirect();
}

formEl.addEventListener('submit', validateLogin);

function redirectIfLoggedIn() {
    if (localStorage.getItem('isLoggedIn') != undefined) {
        redirect();
    }
}
window.onload = redirectIfLoggedIn;