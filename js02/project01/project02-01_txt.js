/*    JavaScript 7th Edition
      Chapter 2
      Project 02-01

      Celsius <-> Farenheit Coverter
      Author: Marta Polishchuk
      Date:   June 14, 2024

      Filename: project02-01.js
*/

// #3 create a function:
function FarenheitToCelcius(degree)
{     // using operators to calculate the value for a variable
      degree = (degree - 32)/1.8
      //returning the value of this variable as the output of this function (can then use this variable's value elsewhere)
      return degree;
}

// #4
function CelciusToFarenheit (degree)
{
      degree = (degree * 1.8) + 32
      return degree;
}


