"use strict";

import {databaseData} from "./db/json.js";

const data = JSON.parse(databaseData)
let queriedData;

//extracting names for checkboxes
let uniqueNames = data.map(obj => obj.player_name)
uniqueNames = new Set(uniqueNames);

const averageTimeFilter = document.querySelector('#avg-criteria')
const scoreFilter = document.querySelector('#score-criteria')
const checkListEl = document.querySelector('#name-list');
const gameOutcomeEl = document.querySelector('#game-outcome')
const difficultyEl = document.querySelector('#difficulty')
const form = document.querySelector('#query')
const tableEl = document.querySelector('#search-result')
const firstRow = document.createElement('tr')
const arrHeaders = Object.keys(data[0])
for (const arrHeadersKey of arrHeaders) {
    let header = arrHeadersKey.replace(/_/g, ' ');
    header = header.charAt(0).toUpperCase() + header.slice(1);
    firstRow.append(createElement(header, true))
}
tableEl.prepend(firstRow)

const tableContainer = document.querySelector('#search-result-container')
const overlay = document.querySelector('#overlay')

const namesListEl = document.querySelector('#name-list .checkbox-list');
const difficultyListEl = document.querySelector('#difficulty .checkbox-list')
const gameOutcomeListEl = document.querySelector('#game-outcome .checkbox-list')
const scoreInputEl = document.querySelector('#score')
const dateBeforeInputEl = document.querySelector('#dateBefore')
const dateAfterInputEl = document.querySelector('#dateAfter')
const avgTimeInputEl = document.querySelector('#avgTime')
const shiftBool = (toShift) => {
    return !toShift;
}

let isAscendingGameOutcome = true;
let isAscendingAvgTime= true;
let isAscendingDifficulty = true;
let isAscendingNames = true;
let isAscendingDate = true;
let isAscendingPlayerScore = true;
let isAscendingComputerScore = true;
let isAscendingGameId = true;
let isAscendingGameDuration = true;

let isEventListenerAdded = false;

const namesCheckboxList = () => {
    return [...namesListEl.children].map(li => [...li.children][0])
}

const sortBy = (column) => {
    let toFilterOn;
    switch (column){
        case "Player name":
            isAscendingNames = shiftBool(isAscendingNames);
            toFilterOn = isAscendingNames;
            break;
        case "Game id":
            isAscendingGameId = shiftBool(isAscendingGameId);
            toFilterOn = isAscendingGameId;
            break;
        case "Game outcome":
            isAscendingGameOutcome = shiftBool(isAscendingGameOutcome);
            toFilterOn = isAscendingGameOutcome
            break;
        case "Computer score":
            isAscendingComputerScore = shiftBool(isAscendingComputerScore);
            toFilterOn = isAscendingComputerScore
            break;
        case "Player score":
            isAscendingPlayerScore = shiftBool(isAscendingPlayerScore);
            toFilterOn = isAscendingPlayerScore
            break;
        case "Avg time per turn":
            isAscendingAvgTime = shiftBool(isAscendingAvgTime);
            toFilterOn = isAscendingAvgTime
            break;
        case "Date played":
            isAscendingDate = shiftBool(isAscendingDate);
            toFilterOn = isAscendingDate
            break;
        case "Difficulty chosen":
            isAscendingDifficulty = shiftBool(isAscendingDifficulty);
            toFilterOn = isAscendingDifficulty
            break;
        case "Game duration":
            isAscendingGameDuration = shiftBool(isAscendingGameDuration)
            toFilterOn = isAscendingGameDuration;
            break;
    }
    const columnName = column.toLowerCase().replaceAll(' ','_');
    queriedData = queriedData.sort((objA,objB) => {
        //if Ascending
        if (toFilterOn) {
            if (objA[columnName] > objB[columnName]) return -1
            if (objA[columnName] < objB[columnName]) return 1
        }else {
            if (objA[columnName] < objB[columnName]) return -1
            if (objA[columnName] > objB[columnName]) return 1
        }
        return 0;
    })
}

const addTableHeadersEventHandlers = () => {
    const tableHeaders = [...[...tableEl.children][0].children]
    tableHeaders.forEach(header => {
        header.addEventListener('click',function (e){
            e.stopPropagation();
            sortBy(e.target.innerText)
            drawTable();
        })
    })
}

const difficultyCheckboxList = [...difficultyListEl.children].map(li => [...li.children][0])
const gameOutcomeCheckboxList = [...gameOutcomeListEl.children].map(li => [...li.children][0])

//if all unchecked we search for all elements
const isAllUnchecked = (checkList) => {
    return checkList.every(inputEl => !inputEl.checked)
}

function createElement(text, header) {
    const toReturn = document.createElement(header ? 'th' : 'td')
    toReturn.textContent = text
    if (Number.parseFloat(text)) toReturn.style.textAlign = 'right'
    return toReturn
}

function redirectToLogin() {
    location.replace('../statistics.html');
}

const getAllCheckedValues = (list) => {
    return list.filter(inputEl => inputEl.checked)
}

const clearTable = () => {
    const tableRows = [...tableEl.children]
    tableRows.shift();
    tableRows.forEach(element => {
        element.remove()
    });
}


const queryData = () => {
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
    if (parseFloat(scoreInputEl.value) >= 1){
        switch (scoreFilter.value){
            case "Above":
                filteredData = filteredData.filter(obj => obj.player_score > parseFloat(scoreInputEl.value));
                break;
            case "Equal":
                filteredData = filteredData.filter(obj => obj.player_score == scoreInputEl.value);
                break;
            case "Below":
                filteredData = filteredData.filter(obj => obj.player_score < parseFloat(scoreInputEl.value));
                break;
            default:
                break;
        }
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
    if (parseFloat(avgTimeInputEl.value) >= 1){
        switch (averageTimeFilter.value){
            case "Above":
                filteredData = filteredData.filter(obj => obj.avg_time_per_turn > parseFloat(avgTimeInputEl.value));
                break;
            case "Equal":
                filteredData = filteredData.filter(obj => obj.avg_time_per_turn == avgTimeInputEl.value);
                break;
            case "Below":
                filteredData = filteredData.filter(obj => obj.avg_time_per_turn < parseFloat(avgTimeInputEl.value));
                break;
            default:
                break;
        }
    }
    queriedData = [...filteredData];
    return queriedData;
}


const drawTable = (event) => {
    if (event) event.preventDefault();
    clearTable();
    tableContainer.classList.remove('hidden');
    overlay.classList.remove('hidden');
    queriedData.forEach(object => {
        const row = document.createElement('tr')
        Object.values(object).forEach(prop => {
            row.append(createElement(prop, false))
        })
        tableEl.append(row)
    })
    if(!isEventListenerAdded){
        addTableHeadersEventHandlers();
        isEventListenerAdded = true;
    }
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
    if (JSON.parse(localStorage.getItem('isLoggedIn')) === null || JSON.parse(localStorage.getItem('isLoggedIn')) === undefined) {
        redirectToLogin();
    }
}
overlay.addEventListener('click', closePopup);
form.addEventListener('submit',(ev) => {
    queryData();
    drawTable(ev)
});
window.addEventListener('load',redirectNotLoggedIn);


