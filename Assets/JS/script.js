var currentDayEl = $('#currentDay');
var pastTimeEl = $('.row time-block past');
var presentTimeEl = $('.row time-block present');
var futureTimeEl = $('.row time-block future');
var saveBtnEl = $('.saveBtn');

//In the function below, when the save button is clicked, the user input from the corresponding input field is retrieved,
// and the input is saved in local storage using the time block id as the key.
//$(function () { ... });: This is a shorthand for the $(document).ready() function, which ensures that the code inside the function is executed when the DOM is fully loaded.
$(function () {

  // saveBtnEl.on("click", function () { ... });: This attaches a click event listener to the saveBtnEl element.
  // When the button is clicked, the function inside the event listener will be executed.
  saveBtnEl.on("click", function () {

    // This line retrieves the value of the input field with the class "description" that is a sibling of the clicked button. 
    //The $(this) refers to the clicked button.
    var userInput = $(this).siblings(".description").val();
  
    //This line retrieves the id attribute of the closest ancestor element with the class "time-block". The $(this) refers to the clicked button.
    var timeBlockId = $(this).closest(".time-block").attr("id");

    //This line stores the user input in local storage using the setItem() method. The timeBlockId is used as the key, and the userInput is the value.
    localStorage.setItem(timeBlockId, userInput);
  });

  // funtion hourUpdate applies the past, present, or future class to each time block and updates the styling of each time block, based on the current hour of the day.
  function hourUpdate(){
    var currentHour = dayjs().hour();  //Uses the Day.js library to get the current hour of the day and assigns it to variable currentHour.
    $(".time-block").each(function () {  //selects all elements with the class time-block using the jQuery selector $(".time-block") and iterates over each of them using the .each() method.
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]); // This line extracts the hour value from the id attribute of each time block element.
                                                                      // The id attribute is expected to be in the format time-X, where X represents the hour. 
                                                                      //The hour value is then parsed as an integer and assigned to the timeBlockHour variable.
       console.log(timeBlockHour);
       console.log(currentHour);

  //It checks the relationship between timeBlockHour and currentHour using conditional statements.

      if (timeBlockHour < currentHour) {  //If timeBlockHour is less than currentHour, it adds the class past to the current time block element using the .addClass() method.
        $(this).addClass('past');

      } else if (timeBlockHour === currentHour) { //If timeBlockHour is equal to currentHour, it removes the class past from the current time block element using the .removeClass() method,
                                                 // and adds the class present using the .addClass() method.

        $(this).removeClass('past');
        $(this).addClass('present');

      } else {      //If none of the above conditions are met, it removes the classes past and present from the current time block element using the .removeClass() method,
                    // and adds the class future using the .addClass() method.
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      }
    });
  
  }
  hourUpdate();   //This is a function call to hourUpdate(). It is called initially to update the time blocks on the page.
  setInterval(hourUpdate,15000);  //This sets up a recurring interval using setInterval() function. It calls the hourUpdate() function 
                                  //every 15 seconds (15000 milliseconds) to update the time blocks on the page.

  // Get any user input saved in local storage and set the values of the textarea elements
//this code initializes the work day scheduler by updating the time blocks, retrieving any saved user inputs from local storage, 

  $(".time-block").each(function () { 
//$(".time-block"): This selects all elements with the class "time-block".
// .each(function () { ... }): This iterates over each selected element and executes the provided function for each iteration.

    var timeBlockId = $(this).attr("id"); 
    //This line retrieves the id attribute of the current time block element and assigns it to the timeBlockId variable. 
    //It uses $(this) to refer to the current element within the iteration.

    var savedUserInput = localStorage.getItem(timeBlockId); 
    // This line retrieves the value stored in the local storage using the timeBlockId as the key and assigns it to the savedUserInput variable.
    // It uses the getItem() method of the localStorage object to retrieve the value.

    if (savedUserInput) {                        //checks if there is a saved user input for the current time block.

      $(this).find(".description").val(savedUserInput);
      // If there is a saved user input (savedUserInput is not null or undefined),
      // this line sets the value of the textarea element with the class "description" inside the current time block to the savedUserInput.
      // It uses $(this) to refer to the current time block element and .find(".description") to select the textarea element within it,
      // and then .val(savedUserInput) to set its value.

    }
  });

  // and displaying the current date and time.
  var currentDate = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  //This line uses the Day.js library to get the current date and time in the specified format: "MMM DD, YYYY at hh:mm:ss a".

  currentDayEl.text(currentDate);

  //this line sets the text content of the currentDayEl element to the currentDate, which represents the current date and time.
});