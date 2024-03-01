//Initial Reference
let timeRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarm = document.querySelector(".activeAlarm");
const setAlarm = document.getElementById("set");
let alarmArray = [];
let alarmSound = new Audio("./alarm.audio.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append zeros for single digits
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  //Display time
  timeRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  //Alarm
  alarmArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (
        `${alarm.alarmHour}:${alarm.alarmMinutes}` === `${hours}:${minutes}`
      ) {
        alarmSound.play();
        // alarmSound.loop = true;
      }
    }
  });
}

const inputCheck = (inputvalue) => {
  inputvalue = parseInt(inputvalue);
  if (inputvalue < 10) {
    inputvalue = appendZero(inputvalue);
  }
  return inputvalue;
};
hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});
minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Alarm div creation

const createAlarm = (alarmObj) => {
  //Keys for object
  const { id, alarmHour, alarmMinutes } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("date-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinutes}</span>`;

  //checkbox
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkBox");
  checkBox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkBox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarm.appendChild(alarmDiv);
};

//Set alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObjrct
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinutes = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});

//Set Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("date-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmArray[index].isActive = true;
  }
};

//stop alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("date-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmArray[index].isActive = false;
    alarmSound.pause();
  }
};

//Delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("date-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmArray.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};
