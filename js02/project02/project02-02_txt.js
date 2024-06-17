/*    JavaScript 7th Edition
      Chapter 2
      Project 02-02

      Application to test for completed form
      Author: Marta Polishchuk
      Date:   June 17, 2024 

      Filename: project02-02.js
 */

function verifyForm()
{
let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
let phone = document.getElementById('phone').value;

//conditional ooperator: condition? trueValue: false Value;
name && email && phone != "" ? window.alert("Thank you!"): window.alert("Please fill in all fields");
}   // if all 3 variables are not equal to an empty string, then trur (form is filled out), if any of them are an empty string then condition is not fulfilled, = false and form is not filed out fully

//document.getElementById('submit').onclick = verifyForm;
document.getElementById('submit').addEventListener('click', verifyForm);