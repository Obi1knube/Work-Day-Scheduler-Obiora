var currentDayEl = $('#currentDay');
var pastTimeEl = $('.row time-block past');
var presentTimeEl = $('.row time-block present');
var futureTimeEl = $('.row time-block future');
var saveBtnEl = $('.saveBtn');

$(function () {
  // Save the user input in local storage using the id as the key
  saveBtnEl.on("click", function () {
    var userInput = $(this).siblings(".description").val();
    var timeBlockId = $(this).closest(".time-block").attr("id"); // Get the id of the parent time-block element
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  function hourUpdate(){
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
       console.log(timeBlockHour);
       console.log(currentHour);
  
      if (timeBlockHour < currentHour) {
      
        $(this).addClass('past');
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass('past');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      }
    });
  

  }
  hourUpdate();
  setInterval(hourUpdate,15000);
  // Get any user input saved in local storage and set the values of the textarea elements
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedUserInput = localStorage.getItem(timeBlockId);
    if (savedUserInput) {
      $(this).find(".description").val(savedUserInput);
    }
  });


//equivalent iteration in javaScript

//To achieve the same functionality in pure JavaScript, you can use the document.querySelectorAll() method to select elements with the class "time-block" and then loop through them. Here's the JavaScript code that replicates the provided jQuery code:

// document.querySelectorAll(".time-block").forEach(function (element) {
//     var timeBlockId = element.getAttribute("id");
//     var savedUserInput = localStorage.getItem(timeBlockId);
//     if (savedUserInput) {
//         var descriptionElement = element.querySelector(".description");
//         if (descriptionElement) {
//             descriptionElement.value = savedUserInput;
//         }
//     }
// });

  var currentDate = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  currentDayEl.text(currentDate);
});