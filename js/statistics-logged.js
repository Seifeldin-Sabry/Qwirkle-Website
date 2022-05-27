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
const logoutEl = document.querySelector('#h2-logout')

const namesListEl = document.querySelector('#name-list .checkbox-list');
const difficultyListEl = document.querySelector('#difficulty .checkbox-list')
const gameOutcomeListEl = document.querySelector('#game-outcome .checkbox-list')
const scoreInputEl = document.querySelector('#score')
const dateBeforeInputEl = document.querySelector('#dateBefore')
const dateAfterInputEl = document.querySelector('#dateAfter')
const avgTimeInputEl = document.querySelector('#avgTime')

const namesCheckboxList = [...namesListEl.children].map(li => [...li.children].find(el => el === document.createElement('input')))
const difficultyCheckboxList = [...difficultyListEl.children].map(li => [...li.children].find(el => el === document.createElement('input')))
const gameOutcomeCheckboxList = [...gameOutcomeListEl.children].map(li => [...li.children].find(el => el === document.createElement('input')))

//if all unchecked we search for all elements
const isAllUnchecked = (checkList) => {
    return checkList.every(inputEl => !inputEl.checked)
}



const redirectToLogin = (event) => {
    console.log('redirect')
    location.replace('../statistics.html');
}


logoutEl.addEventListener('click', redirectToLogin)


const getAllCheckedValues = (list) => {
    return list.filter(inputEl => inputEl.checked)
}


const queryData = (event) => {
    let filteredData = [...data]
    if (!isAllUnchecked(namesCheckboxList)){
        const checkedNames = getAllCheckedValues(namesCheckboxList)
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

    if (!isNaN(scoreInputEl.value)){
        filteredData = filteredData.filter(obj => obj.player_score === scoreInputEl.value)
    }
    /*const dates = data.map(obj => obj.date_played).map(date => {
    const [year,month,day] = date.split('-')
    //-1 because date implementation is trash and it counts from 0
    return new Date(year,month-1,day);
})*/

    if (dateBeforeInputEl.value){
        filteredData = filteredData.filter(obj => {
            const [year,month,day] = obj.date_played.split('-')
            let date = new Date(year,month-1,day)
            return dateBeforeInputEl.value >= date;
        })
    }

    if (dateAfterInputEl.value){
        filteredData = filteredData.filter(obj => {
            const [year,month,day] = obj.date_played.split('-')
            let date = new Date(year,month-1,day)
            return dateBeforeInputEl.value <= date;
        })
    }

    if (!isNaN(avgTimeInputEl.value)){

    }

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

// form.addEventListener('submit',)

