/*    JavaScript 7th Edition
      Chapter 3
      Project 03-01

      Application to calculate total order cost
      Author: Marta Polishchuk 
      Date:   Aug 31, 2024 

      Filename: project03-01.js
*/

// create a variable that contains an HTML collection of menuItem class elements 
let menuItems = document.getElementsByClassName("menuItem");

// create a for loop that loops through the menuItems collection
for (i = 0; i < menuItems.length; i++){
      menuItems[i].addEventListener("click", calcTotal); // no need for parentheses after the function name here 
}

// create a function that calculates the total order 
function calcTotal() {
      let orderTotal = 0;
      for (i = 0; i < menuItems.length; i++){
            if (menuItems[i].checked === true){ // if a menu item is checked, add its price to the total 
                  orderTotal += Number(menuItems[i].value) 
            }
      }
      document.getElementById("billTotal").innerHTML = formatCurrency(orderTotal) 
      // change the order total by editing the innerHTML of the element with the bill total ID 
}


 // Function to display a numeric value as a text string in the format $##.## 
function formatCurrency(value) {
      return "$" + value.toFixed(2);
}