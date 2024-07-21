/*    JavaScript 7th Edition
      Chapter 2
      Project 02-03

      Application to return the shape of a clicked object
      Author: Marta Polishchuk
      Date:   June 21, 2024  

      Filename: project02-03.js
 */

      // added on mouseover event handler to element with id "square"
      document.getElementById("square").addEventListener("mouseover", function() {document.getElementById("feedback").innerHTML = "You're hovering over the square."} ); //using an anonymous function to display the proper feedback message

      //^ this makes a message pop-up that says "you are hovering over the square", but the message doesn't go away
      // need to add a mouseout event handler that displays nothing (an empty text string) when mouse is no longer hovering over the object 
      document.getElementById("square").addEventListener("mouseout", function() {document.getElementById("feedback").innerHTML = " "} );

      // repeat above for the triangle
      document.getElementById("triangle").addEventListener("mouseover", function() {document.getElementById("feedback").innerHTML = "You're hovering over the triangle."});

      document.getElementById("triangle").addEventListener("mouseout", function () {document.getElementById("feedback").innerHTML =" "});

      //repeat above for the circle
      document.getElementById("circle").addEventListener("mouseover", function() {document.getElementById("feedback").innerHTML = "You're hovering over the circle."});

      document.getElementById("circle").addEventListener("mouseout", function() {document.getElementById("feedback").innerHTML = " "});

