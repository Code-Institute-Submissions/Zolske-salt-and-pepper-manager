/// >>> START import functions from helper_functions.js /////////////////////////////////////////////////////////////////////////////////////////////
import {
  convertToDateString,
  setDateIdOnTable,
  getWeeksDailyAvailableTable,
  setFormRightTimeSlot,
  setFormRightMaxMinTable,
  nextWeekButton,
  previousWeekButton,
  modalBootstrapId,
} from "./helper_functions.js";
/// <<< END import functions from helper_functions.js ///////////////////////////////////////////////////////////////////////////////////////////////

/// >>> START set variables /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// create from all weeks one array with there date and available tables
let availableTablesData = [];
for (let i = 0; i <= 7; i++) {
  let week = "week_" + i;
  availableTablesData.push(getWeeksDailyAvailableTable(week));
}

// get the first day of the week which has not passed = today, and convert to YYYY-mm-dd
let firstDayNotPassedCalender = convertToDateString(
  document.getElementsByClassName("week_0").item(0).innerHTML
);

// get the last day of the last week (week 7 after the current week), and convert to YYYY-mm-dd
let lastDayNotPassedCalender = convertToDateString(
  document.getElementsByClassName("week_7").item(6).innerHTML
);

// get from the form element the input for the date picker
let bookingDate = document.getElementById("bookingDate");

// is the temporary booking date  which will be updated after the function "setFormRightTimeSlot" is called
let oldBookingDate = bookingDate;

// activate bootstrap tooltips
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
/// <<< END set variables ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// >>> START calling functions /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// set the default date pick day to today
bookingDate.setAttribute("value", firstDayNotPassedCalender);
// set the first possible day to pick to today
bookingDate.setAttribute("min", firstDayNotPassedCalender);
// set the last possible day to pick to the last day of the 7th week after the current week
bookingDate.setAttribute("max", lastDayNotPassedCalender);
// set the initial values for the time slot select list when side is loaded
oldBookingDate = setFormRightTimeSlot(
  oldBookingDate,
  firstDayNotPassedCalender,
  availableTablesData
);
// set the initial values for the available table select list
formTableInput();
// sets a unique id for Bootstrap button to Modal
modalBootstrapId();
/// <<< END calling functions ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// >>> START add event listener ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add an event listener to the "form input date field"
document.getElementById("bookingDate").addEventListener("input", formDateInput);
function formDateInput() {
  let bookingDate = document.getElementById("bookingDate").value;
  oldBookingDate = setFormRightTimeSlot(
    oldBookingDate,
    bookingDate,
    availableTablesData
  );
}

// add event listener to the "booking time slot select field"
document
  .getElementById("bookingTime")
  .addEventListener("change", formTableInput);
function formTableInput() {
  let bookingDate = document.getElementById("bookingDate").value;
  let bookingTable = document.getElementById("bookingTime").value;
  let timeSlotPosition = [
    "date, expected match",
    "time_slot_12",
    "time_slot_14",
    "time_slot_16",
    "time_slot_18",
    "time_slot_20",
    "time_slot_22",
  ];
  for (let position = 0; position <= 7; position++) {
    if (bookingTable == timeSlotPosition[position]) {
      timeSlotPosition = position;
    }
  }
  setFormRightMaxMinTable(bookingDate, timeSlotPosition, availableTablesData);
}

// add event listener to next-week-button
document.getElementById("next-week-button").addEventListener(
  "click",
  () => {
    oldBookingDate = nextWeekButton(
      oldBookingDate,
      availableTablesData,
      firstDayNotPassedCalender,
      lastDayNotPassedCalender,
      formDateInput
    );
  },
  false
);

// add event listener to previous-week-button
document.getElementById("previous-week-button").addEventListener(
  "click",
  () => {
    oldBookingDate = previousWeekButton(
      oldBookingDate,
      availableTablesData,
      firstDayNotPassedCalender,
      lastDayNotPassedCalender,
      formDateInput
    );
  },
  false
);
// add eventlistener to amend reservation time "focus"
let amendTimeJsFocus = document.getElementsByClassName("amendTimeJs");
for (let i = 0; i < amendTimeJsFocus.length; i++) {
  amendTimeJsFocus[i].onfocus = function () {
    amendTime(this);
  };
}
// add eventlistener to amend reservation time "click"
let amendTimeJsClick = document.getElementsByClassName("amendTimeJs");
for (let i = 0; i < amendTimeJsClick.length; i++) {
  amendTimeJsClick[i].onclick = function () {
    amendTable(this);
  };
}
/// <<< END add event listener //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function amendTime(booking) {
  // remove all children
  while (booking.hasChildNodes()) {
    booking.removeChild(booking.firstChild);
  }
  let bookingDate = booking.getAttribute("data-booking-date");
  let timeValueArray = ["date, don't use", "12", "14", "16", "18", "20", "22"];
  let timeTextArray = [
    "date, don't use",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ];
  for (let week = 0; week < availableTablesData.length; week++) {
    for (let day = 0; day < availableTablesData[week].length; day++) {
      if (bookingDate == availableTablesData[week][day][0]) {
        for (
          let time = 1;
          time < availableTablesData[week][day].length;
          time++
        ) {
          if (0 < parseInt(availableTablesData[week][day][time])) {
            let option = document.createElement("option");
            option.setAttribute(
              "value",
              timeValueArray[time] +
                parseInt(availableTablesData[week][day][time])
            );

            option.innerText = timeTextArray[time];
            booking.insertAdjacentElement("beforeend", option);
          } else {
            let option = document.createElement("option");
            option.setAttribute("value", timeValueArray[time]);
            option.innerText = timeTextArray[time];
            option.setAttribute("class", "bg-secondary bg-opacity-25");
            option.setAttribute("value", "");
            option.setAttribute("disabled", "");
            option.setAttribute(
              "title",
              "Sorry, there are no tables available at this time."
            );
            booking.insertAdjacentElement("beforeend", option);
          }
        }
      }
    }
  }
}

function amendTable(timeSlot) {
  let tableElement = timeSlot.parentNode.nextElementSibling.firstElementChild;
  while (tableElement.hasChildNodes()) {
    tableElement.removeChild(tableElement.firstChild);
  }
  let selectedTimeSlot = timeSlot.value;
  let tableNumber = selectedTimeSlot.slice(2);
  tableNumber = parseInt(tableNumber);
  let postTimeSlot = selectedTimeSlot.slice(0, 2);

  timeSlot.removeAttribute("value");
  timeSlot.setAttribute("value", postTimeSlot);
  selectedTimeSlot = timeSlot.value;

  for (let table = 1; table <= tableNumber; table++) {
    let tableOption = document.createElement("option");
    tableOption.setAttribute("value", table);
    tableOption.innerText = table;
    tableElement.insertAdjacentElement("beforeend", tableOption);
  }
}
