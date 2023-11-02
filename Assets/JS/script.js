var currentDayEl = $('#currentDay');
var pastTimeEl =$('.row time-block past');
var presentTimeEl = $('.row time-block present');
varFutureTimeEl = $('.row time-block future ');
var saveBtnEl =$('.saveBtn');



$(function () {

    // Save the user input in local storage using the id as the key
    saveBtnEl.on("click", function () {
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
    });
      
        // Apply the past, present, or future class to each time block
         var currentHour = dayjs().hour();
        $(".time-block").each(function () {
            var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

            if (timeBlockHour < currentHour) {
            $(this).addClass(pastTimeEl);
            } else if (timeBlockHour === currentHour) {
            $(this).addClass(presentTimeEl);
            } else {
            $(this).addClass(futureTimeEl);
            }
        });

        // Get any user input saved in local storage and set the values of the textarea elements
       $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedUserInput = localStorage.getItem(timeBlockId);
    
        if (savedUserInput) {
          $(this).find(".description").val(savedUserInput);
        }
      });
    
      var currentDate = dayjs().format("dddd, MMMM D");
      currentDayEl.text(currentDate);
    });
  
