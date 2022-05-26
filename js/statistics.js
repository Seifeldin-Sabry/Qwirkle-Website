"use strict";

import {users} from "./db/users.js";

const formEl = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

const invalidCredentials = document.querySelector('#credentials')
invalidCredentials.style.color = 'red';



const validateLogin = (event) => {
    event.preventDefault();

    const filteredUsers = users.filter(obj => {
        obj.password = passwordInput.value;
        obj.username = usernameInput.value;
        return obj;
    });

    if (!filteredUsers.length) {
        invalidCredentials.classList.remove('hidden');
        return;
    }
    localStorage.setItem("isLoggedIn","true");
    formEl.submit();
}

formEl.addEventListener('submit', validateLogin)
