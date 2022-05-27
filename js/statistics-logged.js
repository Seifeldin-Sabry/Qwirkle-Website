"use strict";

import {databaseData} from "./db/json.js";

const data = JSON.parse(databaseData)


//extracting names for checkboxes
let uniqueNames = data.map(obj => obj.player_name)
uniqueNames = new Set(uniqueNames);

const checkListEl = document.querySelector('#name-list');
const gameOutcomeEl = document.querySelector('#game-outcome')
const difficultyEl = document.querySelector('#difficulty')
const form = document.querySelector('#query')
const tableEl = document.querySelector('#search-result')
const tableContainer = document.querySelector('#search-result-container')
const overlay = document.querySelector('#overlay')

const namesListEl = document.querySelector('#name-list .checkbox-list');
const difficultyListEl = document.querySelector('#difficulty .checkbox-list')
const gameOutcomeListEl = document.querySelector('#game-outcome .checkbox-list')
const scoreInputEl = document.querySelector('#score')
const dateBeforeInputEl = document.querySelector('#dateBefore')
const dateAfterInputEl = document.querySelector('#dateAfter')
const avgTimeInputEl = document.querySelector('#avgTime')

const namesCheckboxList = () => {
    return [...namesListEl.children].map(li => [...li.children][0])
}
const difficultyCheckboxList = [...difficultyListEl.children].map(li => [...li.children][0])
const gameOutcomeCheckboxList = [...gameOutcomeListEl.children].map(li => [...li.children][0])

//if all unchecked we search for all elements
const isAllUnchecked = (checkList) => {
    return checkList.every(inputEl => !inputEl.checked)
}

function createElement(text, header, id) {
    const toReturn = document.createElement(header ? 'th' : 'td')
    toReturn.textContent = text
    if (Number.parseFloat(text)) toReturn.style.textAlign = 'right'
    if (id) toReturn.setAttribute('id',id);
    return toReturn
}

function redirectToLogin() {
    location.replace('../statistics.html');
}

const getAllCheckedValues = (list) => {
    return list.filter(inputEl => inputEl.checked)
}

const clearTable = () => {
    [...tableEl.children].forEach(element => element.remove());
}

const clearRows = () => {
    [...tableEl.children].shift().forEach(element => element.remove());
}

// const sort = (event) => {
//     const headerToSort = event.t
// }

const drawTable = (clear) => {
    if(clear) clearTable();
    else clearRows();
    tableContainer.classList.remove('hidden')
    overlay.classList.remove('hidden')

    const firstRow = document.createElement('tr')
    const arrHeaders = Object.keys(data[0])
    for (const arrHeadersKey of arrHeaders) {
        let header = arrHeadersKey.replace(/_/g, ' ');
        header = header.charAt(0).toUpperCase() + header.slice(1);
        firstRow.append(createElement(header, true, id))
    }
    tableEl.prepend(firstRow)

    const arrayObj = queryData();
    arrayObj.forEach(object => {
        const row = document.createElement('tr')
        Object.values(object).forEach(prop => {
            row.append(createElement(prop, false))
        })
        tableEl.append(row)
    })
}

document.querySelector('th').addEventListener('click',function(event) {
    console.log(event.target)
    console.log(event)
})

const queryData = (event) => {
    event.preventDefault();
    if (checkListEl.classList.contains('visible')) {
        checkListEl.classList.toggle('visible')
    }
    if (gameOutcomeEl.classList.contains('visible')){
        gameOutcomeEl.classList.toggle('visible')
    }
    if (difficultyEl.classList.contains('visible')) {
        difficultyEl.classList.toggle('visible')
    }
    let filteredData = [...data]
    const namesListInputs = namesCheckboxList();

    if (!isAllUnchecked(namesListInputs)){
        const checkedNames = getAllCheckedValues(namesListInputs)
        filteredData = filteredData.filter(obj => {
            return checkedNames.map(el => el.value).includes(obj.player_name);
        })
    }

    if(!isAllUnchecked(difficultyCheckboxList)){
        const checkedDifficulty = getAllCheckedValues(difficultyCheckboxList)
        filteredData = filteredData.filter(obj => {
            return checkedDifficulty.map(el => el.value).includes(obj.difficulty_chosen);
        })
    }

    if (!isAllUnchecked(gameOutcomeCheckboxList)){
        const checkedGameOutcome = getAllCheckedValues(gameOutcomeCheckboxList)
        filteredData = filteredData.filter(obj => {
            return checkedGameOutcome.map(el => el.value).includes(obj.game_outcome);
        })
    }
    if (scoreInputEl.value >= 1){
        filteredData = filteredData.filter(obj => obj.player_score == scoreInputEl.value)
    }

    if (dateBeforeInputEl.value){
        const [year, month, day] = dateBeforeInputEl.value.split('-');
        const dateBefore = new Date(year,month-1,day);
        filteredData = filteredData.filter(obj => {
            const [year,month,day] = obj.date_played.split('-')
            let date = new Date(year,month-1,day)
            return dateBefore.getTime() > date.getTime();
        })
    }
    if (dateAfterInputEl.value){
        const [year, month, day] = dateAfterInputEl.value.split('-');
        const dateAfter = new Date(year,month-1,day);
        filteredData = filteredData.filter(obj => {
            const [year,month,day] = obj.date_played.split('-')
            let date = new Date(year,month-1,day)
            return dateAfter.getTime() <= date.getTime();
        })
    }
    if (avgTimeInputEl.value >= 1){
        filteredData = filteredData.filter(obj => obj.avg_time_per_turn == avgTimeInputEl.value)
    }
    // drawTable(filteredData);
    // overlay.classList.remove('hidden')
    return filteredData
}

const createCheckBoxElement = (name) => {
    const li = document.createElement('li')
    const html = `<input type="checkbox" value="${name}"/>${name}`
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
function closePopup(){
    overlay.classList.add('hidden');
}
function redirectNotLoggedIn(){
    console.log('outside if statment')
    if (JSON.parse(localStorage.getItem('isLoggedIn')) === null || JSON.parse(localStorage.getItem('isLoggedIn')) === undefined) {
        console.log('inside if statment')
        redirectToLogin();
    }
}
overlay.addEventListener('click', closePopup);
form.addEventListener('submit',drawTable(false));
window.addEventListener('load',redirectNotLoggedIn);

