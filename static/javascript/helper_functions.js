// >>> START convertToDateString ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * The function converts a date string into the right formate for the calender.
 * For example "15. Jun 2022" to "2022-06-15"
 * @param {string} dateString "15. Jun 2022"
 * @returns {string} formate "YYYY-mm-dd" for example "2022-06-15"
 */
export function convertToDateString(dateString) {
  let formattedDate = dateString.slice(8, 12) + "-";
  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthWord = dateString.slice(4, 7);
  let monthNum = monthArray.findIndex((element) => element == monthWord);
  monthNum = monthNum + 1;
  if (String(monthNum).length == 1) {
    monthNum = "0" + monthNum;
  }
  formattedDate += monthNum + "-";
  formattedDate += dateString.slice(0, 2);
  return formattedDate;
}

// >>> START setDateIdOnTable ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Set the date id for the week on every single day in the HTML.
 * @param {string} className name of the week class which is given in HTML
 */
export function setDateIdOnTable(className) {
  let weekClass = document.getElementsByClassName(className);
  for (let i = 0; i < weekClass.length; i++) {
    let dateOriginal = weekClass[i].innerHTML;
    let dateFormatted = convertToDateString(dateOriginal);
    weekClass[i].setAttribute("id", dateFormatted);
  }
}

// >>> START getWeeksDailyAvailableTable ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Get the available tables of each day from the week which has been passed as parameter.
 * @param {string} className class name of the week
 * @returns {array} each week is its own array, e.g. ['2022-06-15', '0', '4', '4', '1', '7', '2']
 * but all weeks are combined in one array.
 */
export function getWeeksDailyAvailableTable(className) {
  let weekClass = document.getElementsByClassName(className);
  let weekArray = [];
  for (let i = 0; i < weekClass.length; i++) {
    let dateOriginal = weekClass[i].innerHTML;
    let dayArray = [convertToDateString(dateOriginal)];
    let childrenOfTheWeek = weekClass[i].parentElement.children;
    for (let i = 2; i < childrenOfTheWeek.length; i++) {
      dayArray.push(childrenOfTheWeek[i].innerHTML);
    }
    weekArray.push(dayArray);
  }
  return weekArray;
}

// >>> START setFormRightTimeSlot ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Set's the time slot in the form according to the date and available tables,
 * if there are no tables available than there is no time slot open.
 * @param {string} oldBookingDateLocal is the global variable (oldBookingDate) which holds the before booking date
 * @param {string} bookingDate in the format "YYYY-mm-dd" e.g. '2022-06-16'
 * @param {array} availableTablesData is the array containing the data from Django
 */
export function setFormRightTimeSlot(
  oldBookingDateLocal,
  bookingDate,
  availableTablesData
) {
  let oldWeekNum = 0;
  // finds the week before it is changed
  for (let oldWeek = 0; oldWeek <= 7; oldWeek++) {
    for (
      let oldDay = 0;
      oldDay < availableTablesData[oldWeek].length;
      oldDay++
    ) {
      if (availableTablesData[oldWeek][oldDay][0] == oldBookingDateLocal) {
        oldWeekNum = oldWeek;
      }
    }
  }
  for (let week = 0; week <= 7; week++) {
    for (let day = 0; day < availableTablesData[week].length; day++) {
      if (availableTablesData[week][day][0] == bookingDate) {
        let bookingDateField = document.getElementById("bookingDate");
        bookingDateField.setAttribute(
          "value",
          availableTablesData[week][day][0]
        );
        // get the time slot element
        let timeSlotOption = document.getElementById("bookingTime");
        // remove all children if it has any
        while (timeSlotOption.hasChildNodes()) {
          timeSlotOption.removeChild(timeSlotOption.firstChild);
        }
        // array containing the possible values for the option list which will be send with the form
        let timeSlotValue = [
          "time_slot_12",
          "time_slot_14",
          "time_slot_16",
          "time_slot_18",
          "time_slot_20",
          "time_slot_22",
        ];
        // array containing the description for the options in the browser
        let timeSlotDisplay = [
          "12:00-14:00",
          "14:00-16:00",
          "16:00-18:00",
          "18:00-20:00",
          "20:00-22:00",
          "22:00-24:00",
        ];
        // empty select field which can not be selected and has no value, is needed to clear previous selection
        let option = document.createElement("option");
        option.setAttribute("selected", "");
        option.setAttribute("disabled", "");
        option.setAttribute("value", "");
        timeSlotOption.appendChild(option);
        // write the new options according to the 'availableTablesData' array
        for (
          let table = 1;
          table < availableTablesData[week][day].length;
          table++
        ) {
          let option = document.createElement("option");
          if (availableTablesData[week][day][table] == "0") {
            option.setAttribute("class", "bg-secondary bg-opacity-25");
            option.setAttribute(
              "title",
              "Sorry, there are no tables available at this time."
            );
            option.setAttribute("disabled", "");
          }
          option.setAttribute("value", timeSlotValue[table - 1]);
          option.textContent = timeSlotDisplay[table - 1];
          timeSlotOption.appendChild(option);
        }
        // change the displayed week table and adjust the buttons
        if (oldWeekNum != week) {
          // disable table from old week
          document
            .getElementById("table_week_" + String(oldWeekNum))
            .classList.toggle("hide-table");
          // enable new week table
          document
            .getElementById("table_week_" + String(week))
            .classList.toggle("hide-table");
          // toggle the 'previous-week-button' if it was before on week 0 of it is now in week 7
          if (oldWeekNum == 0 || week == 0) {
            document
              .getElementById("previous-week-button")
              .classList.toggle("disabled");
          }
          // toggle the 'next-week-button' if it was before on week 7 of it is now in week 0
          if (oldWeekNum == 7 || week == 7) {
            document
              .getElementById("next-week-button")
              .classList.toggle("disabled");
          }
        }
      }
    }
  }
  // old booking date (global) needs to be updated with new booking date for next time
  return bookingDate;
}

// >>> START setFormRightMaxMinTable ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sets the maximum value for the tables which can be booked in the booking form.
 * @param {string} bookingDate the date which was chosen for the booking, must be "YYYY-mm-dd"
 * @param {num} timeSlot must be a number between 1-6 (1 = 12:00-14:00, ... )
 * @param {array} availableTablesData is the array created from the date send by Django
 */
export function setFormRightMaxMinTable(
  bookingDate,
  timeSlot,
  availableTablesData
) {
  let bookingTable = document.getElementById("bookingTable");
  while (bookingTable.hasChildNodes()) {
    bookingTable.removeChild(bookingTable.firstChild);
  }
  // empty select field which can not be selected and has no value, is needed to clear previous selection
  let option = document.createElement("option");
  // option.setAttribute("selected", "");
  option.setAttribute("disabled", "");
  option.setAttribute("value", "");
  bookingTable.appendChild(option);
  for (let week = 0; week <= 7; week++) {
    for (let day = 0; day < availableTablesData[week].length; day++) {
      if (availableTablesData[week][day][0] == bookingDate) {
        let availableTable = availableTablesData[week][day][timeSlot];
        if (availableTable == "0") {
          let option = document.createElement("option");
          option.setAttribute("class", "bg-secondary bg-opacity-25");
          option.setAttribute("value", "");
          option.setAttribute(
            "title",
            "Sorry, there are no tables available at this time."
          );
          // bookingTable.setAttribute("disabled", "");
          bookingTable.appendChild(option);
        } else {
          for (let table = 1; table <= availableTable; table++) {
            let option = document.createElement("option");
            option.setAttribute("value", table);
            option.textContent = table;
            bookingTable.appendChild(option);
          }
        }
      }
    }
  }
}

// >>> START previousWeekButton /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. Allows the previous Week Button to move the week backward, if it is not the first week already.
 * 2. Recreates the date picker so its new value is displayed.
 * 3. Reattaches the eventlistener to the date picker.
 * 4. Uses the 'setFormRightTimeSlot' function to update the time slot list.
 * @param {*} oldBookingDateLocal needs the old booking date so it knows if the week button needs to be toggled
 * @param {*} availableTablesData is an array which contains the data of the available tables and weekdays dates
 * @param {*} firstDayNotPassedCalender first day of this week which has not passed / today
 * @param {*} lastDayNotPassedCalender last day of the week 7 weeks from this week
 * @param {*} formDateInput is the function which is added to the date picker event listener
 * @returns the old booking date which needs to be saved to the global oldBookingDate variable
 */
export function previousWeekButton(
  oldBookingDateLocal,
  availableTablesData,
  firstDayNotPassedCalender,
  lastDayNotPassedCalender,
  formDateInput
) {
  let inputDateField = document.getElementById("bookingDate");
  let bookingDate = inputDateField.value;
  let previousWeekNum = 0;

  //   // find the week based on the date input field value
  for (let week = 0; week <= 7; week++) {
    for (let day = 0; day < availableTablesData[week].length; day++) {
      if (availableTablesData[week][day][0] == bookingDate) {
        if (week > 0) {
          previousWeekNum = week - 1;
        }
      }
    }
  }

  // update the booking date with the first day of the previous week or the same week if there is none
  bookingDate = availableTablesData[previousWeekNum][0][0];

  // remove the date picker from the input field
  inputDateField.remove();
  // recreate the date picker for the input field, otherwise its displayed value will not match its actual value
  let newInput = document.createElement("input");
  newInput.setAttribute("required", "");
  newInput.setAttribute("type", "date");
  newInput.setAttribute("id", "bookingDate");
  newInput.setAttribute("name", "new_booking_date");
  newInput.setAttribute("min", firstDayNotPassedCalender);
  newInput.setAttribute("max", lastDayNotPassedCalender);
  newInput.setAttribute("value", bookingDate);
  newInput.setAttribute("class", "form-select");
  newInput.setAttribute("aria-label", "pick a date for your booking");
  // add the element after the element with the id "findDatePicker"
  document
    .getElementById("findDatePicker")
    .insertAdjacentElement("afterbegin", newInput);

  // add the event listener again to the new date pick element
  document
    .getElementById("bookingDate")
    .addEventListener("input", formDateInput);

  return setFormRightTimeSlot(
    oldBookingDateLocal,
    bookingDate,
    availableTablesData
  );
}

// >>> START nextWeekButton /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. Allows the next Week Button to move the week ahead, if it is not the last week already.
 * 2. Recreates the date picker so its new value is displayed.
 * 3. Reattaches the eventlistener to the date picker.
 * 4. Uses the 'setFormRightTimeSlot' function to update the time slot list.
 * @param {*} oldBookingDateLocal needs the old booking date so it knows if the week button needs to be toggled
 * @param {*} availableTablesData is an array which contains the data of the available tables and weekdays dates
 * @param {*} firstDayNotPassedCalender first day of this week which has not passed / today
 * @param {*} lastDayNotPassedCalender last day of the week 7 weeks from this week
 * @param {*} formDateInput is the function which is added to the date picker event listener
 * @returns the old booking date which needs to be saved to the global oldBookingDate variable
 */
export function nextWeekButton(
  oldBookingDateLocal,
  availableTablesData,
  firstDayNotPassedCalender,
  lastDayNotPassedCalender,
  formDateInput
) {
  let inputDateField = document.getElementById("bookingDate");
  let bookingDate = inputDateField.value;
  let nextWeekNum = 7;

  //   // find the week based on the date input field value
  for (let week = 0; week <= 7; week++) {
    for (let day = 0; day < availableTablesData[week].length; day++) {
      if (availableTablesData[week][day][0] == bookingDate) {
        if (week < 7) {
          nextWeekNum = week + 1;
        }
      }
    }
  }

  // update the booking date with the first day of the previous week or the same week if there is none
  bookingDate = availableTablesData[nextWeekNum][0][0];

  // remove the date picker from the input field
  inputDateField.remove();
  // recreate the date picker for the input field, otherwise its displayed value will not match its actual value
  let newInput = document.createElement("input");
  newInput.setAttribute("required", "");
  newInput.setAttribute("type", "date");
  newInput.setAttribute("id", "bookingDate");
  newInput.setAttribute("name", "new_booking_date");
  newInput.setAttribute("min", firstDayNotPassedCalender);
  newInput.setAttribute("max", lastDayNotPassedCalender);
  newInput.setAttribute("value", bookingDate);
  newInput.setAttribute("class", "form-select");
  newInput.setAttribute("aria-label", "pick a date for your booking");
  // add the element after the element with the id "findDatePicker"
  document
    .getElementById("findDatePicker")
    .insertAdjacentElement("afterbegin", newInput);

  // add the event listener again to the new date pick element
  document
    .getElementById("bookingDate")
    .addEventListener("input", formDateInput);

  return setFormRightTimeSlot(
    oldBookingDateLocal,
    bookingDate,
    availableTablesData
  );
}

// >>> START modalBootstrapId ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Adds a unique id to the modal buttons and modals itself for canceling  and amending reservations.
 * Bootstrap needs them to identify button to modal
 */
export function modalBootstrapId() {
  let cancelButton = document.getElementsByClassName(
    "js-ca-btn-add-data-bs-target"
  );
  let cancelModal = document.getElementsByClassName("js-ca-add-data-bs-target");
  let cancelTitle = document.getElementsByClassName(
    "js-ca-ti-add-data-bs-target"
  );
  let amendButton = document.getElementsByClassName(
    "js-am-btn-add-data-bs-target"
  );
  let amendModal = document.getElementsByClassName("js-am-add-data-bs-target");
  let amendTitle = document.getElementsByClassName(
    "js-am-ti-add-data-bs-target"
  );
  // loop through the total number of 'cancelButton' classes to add attributes,
  // number for amend should be the same
  for (let i = 0; i < cancelButton.length; i++) {
    cancelButton[i].setAttribute("data-bs-target", "#cancelModal_" + i);
    cancelModal[i].setAttribute("id", "cancelModal_" + i);
    cancelModal[i].setAttribute("aria-labelledby", "cancelModalLabel_" + i);
    cancelTitle[i].setAttribute("id", "cancelModalLabel_" + i);
    amendButton[i].setAttribute("data-bs-target", "#amendModal_" + i);
    amendModal[i].setAttribute("id", "amendModal_" + i);
    amendModal[i].setAttribute("aria-labelledby", "amendModalLabel_" + i);
    amendTitle[i].setAttribute("id", "amendModalLabel_" + i);
  }
}
