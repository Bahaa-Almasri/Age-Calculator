//preloader
var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
})

// Calculate Age
function calculateAge() {
    // Get the day, month, and year values from input fields
    var day = parseInt(document.getElementById('day').value);
    var month = parseInt(document.getElementById('month').value);
    var year = parseInt(document.getElementById('year').value);

    // Get the current date
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    var currentDay = currentDate.getDate();

    // Validate if any of the date fields are empty
    if (!day || !month || !year) {
        document.getElementById("result").innerText = "Please enter a value for all date fields.";
        return;
    }

    // Validate the input values
    if (!isValidDate(day, month, year)) {
        document.getElementById("result").innerText = "Invalid date. Please enter a valid date.";
        return;
    }

    // Check if the entered date is in the future
    if (currentYear < year || (currentYear === year && currentMonth < month) || (currentYear === year && currentMonth === month && currentDay < day)) {
        document.getElementById("result").innerText = "Invalid date. Please enter a date before the current date.";
        return;
    }

    // Calculate the age in years, months, and days
    var years = currentYear - year;
    var months = currentMonth - month;
    var days = currentDay - day;

    // Adjust the age if the current month and day are before the birth date
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        years--;
        if (currentMonth < month || (currentMonth === month && currentDay < day)) {
            months += 12;
            // Adjust the months and days if the birth date is later in the month
            var maxDaysPreviousMonth = getDaysInMonth(month - 1, year);
            days = maxDaysPreviousMonth - day + currentDay;
            months--;
            if (days > maxDaysPreviousMonth) {
                months++;
                days = days - maxDaysPreviousMonth;
            }
        }
    }

    // Adjust the age if the current month and day are after the birth date
    if (currentMonth > month && currentDay < day) {
        years--;
        months += 12;

        // Calculate the days remaining in the previous month
        var maxDaysPreviousMonth = getDaysInMonth(month - 1, year);
        var daysRemaining = maxDaysPreviousMonth - day + currentDay;

        if (daysRemaining >= currentDay) {
            months--;
            days = daysRemaining;
            if (days > maxDaysPreviousMonth) {
                months++;
                days = days - maxDaysPreviousMonth;
            }
        } else {
            days = currentDay - daysRemaining;
        }
    }

    // Adjust the age if the birth date falls on the current day
    if (isBirthdateToday(currentDay, currentMonth, currentYear, day, month, year)) {
        document.getElementById("result").innerText = "Happy birthday! You were born today!";
        return;
    }

    // Adjust the age if months exceed 12
    if (months >= 12) {
        years++;
        months = months % 12;
    }

    // Construct the age string to display
    var ageString = "The user is ";
    if (years > 0) {
        ageString += years + (years === 1 ? " year" : " years");
    }
    if (months > 0) {
        ageString += (years > 0 ? ", " : "") + months + (months === 1 ? " month" : " months");
    }
    if (days > 0) {
        ageString += (years > 0 || months > 0 ? ", and " : "") + days + (days === 1 ? " day" : " days");
    }

    // Display the calculated age
    document.getElementById("result").innerText = ageString + " old.";
}

// Check if the provided date is valid
// Create the function we have used before
function isValidDate(day, month, year) {
    var isValid = true;

    // Check if the day is valid for the given month and year
    // To get the number of max days per month
    var maxDays = getDaysInMonth(month - 1, year);
    if (day < 1 || day > maxDays) {
        isValid = false;
    }

    // Check if the month is valid
    if (month < 1 || month > 12) {
        isValid = false;
    }

    // Check if the year is within the valid range
    if (year < 1900 || year > 2023) {
        isValid = false;
    }

    return isValid;
}

// Get the number of days in a given month and year
function getDaysInMonth(month, year) {
    // Month is zero-based, so we add 1 to the month to get the correct month
    // We pass 0 as the day to get the last day of the previous month
    // The .getDate() method is a built-in JavaScript method that can be called on a Date object. It returns the day of the month as
    // a number, ranging from 1 to 31.
    // By passing 0 as the day, we effectively get the last day of the previous month. For example, if month is 2 (representing March)
    // and year is 2023, new Date(2023, 3, 0) will create a Date object representing the last day of February 2023.
    return new Date(year, month + 1, 0).getDate()
    // In JavaScript, the Date class is a built-in class that represents dates and times. It provides a wide range of methods and properties
    // to work with dates, perform date calculations, and format dates.
}

// Check if the user's birth date is the current date
function isBirthdateToday(currentDay, currentMonth, currentYear, day, month, year) {
    return currentDay === day && currentMonth === month && currentYear === year;
    // returns true or false
}