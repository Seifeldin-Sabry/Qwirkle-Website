"use strict";

import {databaseData} from "./db/json.js";

const data = JSON.parse(databaseData)


//extracting names for checkboxes
let uniqueNames = data.map(obj => obj.player_name)
uniqueNames = new Set(uniqueNames);

/*const dates = data.map(obj => obj.date_played).map(date => {
    const [year,month,day] = date.split('-')
    //-1 because date implementation is trash and it counts from 0
    return new Date(year,month-1,day);
})*/



const checkListEl = document.querySelector('#name-list');
const namesListEl = document.querySelector('#name-list .checkbox-list');
const gameOutcomeEl = document.querySelector('#game-outcome')
const difficultyEl = document.querySelector('#difficulty')
const form = document.querySelector('#query')
const logoutEl = document.querySelector('#h2-logout')


const redirectToLogin = (event) => {
    location.replace('../statistics.html');
    console.log('redirect')
}


logoutEl.addEventListener('click', redirectToLogin)

const insertData = (event) => {

}

const createCheckBoxElement = (name) => {
    const li = document.createElement('li')
    const html = `<input type="checkbox"/>${name}`
    li.innerHTML = html
    return li;
}
uniqueNames.forEach((el) => namesListEl.appendChild(createCheckBoxElement(el)))


checkListEl.getElementsByClassName('anchor')[0].onclick = function() {
    checkListEl.classList.toggle('visible')
}

gameOutcomeEl.getElementsByClassName('anchor')[0].onclick = function() {
    gameOutcomeEl.classList.toggle('visible')
}

difficultyEl.getElementsByClassName('anchor')[0].onclick = function() {
    difficultyEl.classList.toggle('visible')
}

// form.addEventListener('submit',)

