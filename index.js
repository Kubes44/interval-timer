const displayWork = document.getElementById("workCount")
const displayRest = document.getElementById("restCount")
const workCont = document.getElementById("workCountCont")
const restCont = document.getElementById("restCountCont")
const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")
const updateBtn = document.getElementById("update")
const form = document.getElementById("form")
const inputWork = form.elements["workTimeInput"]
const inputRest = form.elements["restTimeInput"]
const warning = document.getElementById("warning")

startBtn.addEventListener("click", startTimer)
stopBtn.addEventListener("click", stopTimer)
resetBtn.addEventListener("click", resetTimer)
form.addEventListener("submit", updateDuration)

let workCount = inputWork.value
let restCount = inputRest.value

let working = true
let stopTime = true
displayWork.innerHTML = workCount
displayRest.innerHTML = restCount
let intervalId
const warningText = "Warning - Input time values greater than zero and less than 1000"

function updateDuration(event){
    event.preventDefault()
    if (inputWork.value < 1 || 
                inputWork.value > 999 ||
                inputRest.value < 0 ||
                inputRest.value > 999) {
        startBtn.style.display = "none"
        stopBtn.style.display = "none"
        resetBtn.style.display = "none"
        warning.style.display = "block"
    } else if (inputWork.value > 0 && inputRest.value >= 0){
        workCount = inputWork.value
        restCount = inputRest.value
        displayWork.innerHTML = workCount
        displayRest.innerHTML = restCount
        resetTimer
        startBtn.style.display = "block"
        stopBtn.style.display = "block"
        resetBtn.style.display = "block"
        warning.style.display = "none"
    }
    warning.innerHTML=warningText
    if (inputRest.value == 0){
        displayRest.innerHTML = "WORK"}
}

function startTimer() {
    if(working) {workCont.classList.add("counting")}
    updateBtn.disabled = true
    inputWork.disabled = true
    inputRest.disabled = true
    if (stopTime === true) {
        stopTime = false
        intervalId = setInterval(initiateTimer, 1000)
        form.style.background="#e9ecef"
        inputWork.style.background="#adb5bd"
        inputRest.style.background="#adb5bd"
        updateBtn.style.background="#adb5bd"
    }
}

function stopTimer() {
    updateBtn.disabled = false
    inputWork.disabled = false
    inputRest.disabled = false
    form.style.background="white"
    inputWork.style.background="#4d908e"
    inputRest.style.background="#4d908e"
    updateBtn.style.background="#4d908e"
    if (stopTime === false) {
        stopTime = true
        clearInterval(intervalId)
    } 
}

function resetTimer() {
    displayWork.innerHTML = inputWork.value
    displayRest.innerHTML = inputRest.value
    if(stopTime) {
        working = true
    }
    if (inputRest.value == 0){
        displayRest.innerHTML = "WORK"}
        
    workCont.classList.remove("counting")   
    restCont.classList.remove("counting")
}

function initiateTimer(){
    if (workCount === 0){
        working = false
        workCount = inputWork.value
        displayWork.innerHTML = workCount
    }
    
    if (inputRest.value == 0){
        working = true
    }
    
    if (restCount === 0){
        working = true
        restCount = inputRest.value
        displayRest.innerHTML = restCount
    }

  if(working){
        workCount --
        displayWork.innerHTML = workCount
        workCont.classList.add("counting")
        restCont.classList.remove("counting")
    } else if (!working) {
        restCount --
        displayRest.innerHTML = restCount
        workCont.classList.remove("counting")
        restCont.classList.add("counting")
    } 
    if (working && workCount < 6 && workCount > 0) {
            displayWork.animate([
                {fontSize:'7rem',
                 transform:'translateY(-1rem)'}
            ], {
                duration: 500
            })
        }
}



