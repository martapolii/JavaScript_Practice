/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: Marta Polishchuk
     Date:   Aug 25, 2024

     Filename: js03.js
 */

// Days of the week array
    // weekDays = name of the array
    // comma sepearted strings = values
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// adding a function that runs when the web page is loaded:
window.addEventListener("load", addWeekDays);

// function to add the days of the week to the calendar
function addWeekDays() {
    let i = 0; // counter variable

    // store the collwction og all the th elements 
    let headingCells = document.getElementsByTagName("th");

    // write each of the seven days of the week into the table heading cells
    while (i <7){
        headingCells[i].innerHTML = weekDays[i];
    // increase the counter by 1
    i++;
    };
};

// function to add the game data to the table 
window.addEventListener("load", showGames);

function showGames() {
for (let i = 0; i < gameDates.length; i++) {
    let gameInfo = ""; // variable to store the game information
    // switch statement to chose between 4 diff opening tags based on win/lose/suspended/postponed
    switch (gameResults[i]) {
        case "W":
            gameInfo += "<p class='win'>";
            break;
        case "L":
            gameInfo += "<p class='lose'>";
            break;
        case "S":
            gameInfo += "<p class='suspended'>";
            break;
        case "P":
            gameInfo += "<p class='postponed'>";
            break;
    }

    //open paragraph
    gameInfo += "<p>";

    // statement to write home/away information
    if (gameLocations[i] === "h") {
        gameInfo += "vs. ";
    } else if (gameLocations[i] === "a") {
        gameInfo += "@ ";
    }

    //include opponent 
    gameInfo += gameOpponents[i] + "<br>";
    //include result and score
    gameInfo += gameResults[i] + ": (" + runsScored[i] + " - " + runsAllowed[i] + ")";

    // add conditions for games that were suspended, shortened, or extrainning
    if (gameInnings[i] < 5 ) {
        gameInfo += " [" + gameInnings[i]+"]***"; //suspended
    } else if (gameInnings[i] < 9 ) {
        gameInfo += " [" + gameInnings[i]+"]*"; //shortened
    } else if (gameInnings[i] > 9) {
        gameInfo += " [" + gameInnings[i] + "]"; //extra-inning
    } // do nothing for games with 9 innings

    //close paragraph
    gameInfo += "</p>";

    //write the info into a table cell
    let tableCell = document.getElementById(gameDates[i]);
    tableCell.insertAdjacentHTML("beforeEnd", gameInfo); // data inserted directly before each table cell's closing tag
    }
};

// 