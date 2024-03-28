function weekdays() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  weekday[7] = "Sunday";
  weekday[8] = "Monday";
  weekday[9] = "Tuesday";
  weekday[10] = "Wednesday";
  weekday[11] = "Thursday";
  weekday[12] = "Friday";
  weekday[13] = "Saturday";

  var today = document.querySelector(".today");
  var tomorrow = document.querySelector(".tomorrow");
  var thirdDay = document.querySelector(".third-day");
  var fourthDay = document.querySelector(".fourth-day");
  var fifthDay = document.querySelector(".fifth-day");
  var sixthDay = document.querySelector(".sixth-day");
  var seventhDay = document.querySelector(".seventh-day");

  today.textContent = "Today";

  tomorrow.textContent = "Tomorrow";
  thirdDay.textContent = weekday[d.getDay() + 2];
  fourthDay.textContent = weekday[d.getDay() + 3];
  fifthDay.textContent = weekday[d.getDay() + 4];
  sixthDay.textContent = weekday[d.getDay() + 5];
  seventhDay.textContent = weekday[d.getDay() + 6];
}
