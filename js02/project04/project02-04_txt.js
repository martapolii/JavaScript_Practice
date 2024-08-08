/*    JavaScript 7th Edition
      Chapter 2
      Project 02-04

      Application to calculate the cost of a restaurant order plus tax
      Author: Marta Polishchuk
      Date:   August 8, 2024

      Filename: project02-04.js
 */

      // Delaring constants with initial values
      CHICKEN_PRICE = 10.95;
      HALIBUT_PRICE = 13.95;
      BURGER_PRICE = 9.95;
      SALMON_PRICE = 18.95;
      SALAD_PRICE = 7.95;
      SALES_TAX = 0.07;

      //Create event handlers for the checkboxes
      document.getElementById("chicken").addEventListener("click", calcTotal); // when the checkbox is clicked, the calcTotal function is called
      document.getElementById("halibut").addEventListener("click", calcTotal);
      document.getElementById("burger").addEventListener("click", calcTotal);
      document.getElementById("salmon").addEventListener("click", calcTotal);
      document.getElementById("salad").addEventListener("click", calcTotal);


      // Function to calculate the cost of an order
      function calcTotal(){
      let cost = 0;
      let buyChicken = document.getElementById("chicken").checked; // returns true if the checkbox is checked, false if it is not
      let buyHalibut = document.getElementById("halibut").checked;
      let buyBurger = document.getElementById("burger").checked;
      let buySalmon = document.getElementById("salmon").checked;
      let buySalad = document.getElementById("salad").checked;

      // can use a conditonal operator to add the price of each item to the cost variable
      cost += buyChicken ? CHICKEN_PRICE : 0;
      cost += buyHalibut ? HALIBUT_PRICE : 0;
      cost += buyBurger ? BURGER_PRICE : 0;
      cost += buySalmon ? SALMON_PRICE : 0;
      cost += buySalad ? SALAD_PRICE : 0;

      document.getElementById("foodTotal").innerHTML = formatCurrency(cost); // display the total cost of the order
      let tax = cost * SALES_TAX; // calculating sales tax
      document.getElementById("foodTax").innerHTML = formatCurrency(tax); // display the sales tax
      let totalCost = cost + tax; // calculating the total cost of the order
document.getElementById("totalBill").innerHTML = formatCurrency(totalCost); // display the total cost of the order
      }




// Function to display a numeric value as a text string in the format $##.## 
 function formatCurrency(value) {
   return "$" + value.toFixed(2);
 }
