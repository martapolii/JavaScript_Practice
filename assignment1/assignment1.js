//Need a function that will use the inputs to make a multiplication table with the inputted number of rows and columns, that is trigered by clicking on the 'Draw Table' button:

function drawTable(){
  //1. Need to retrieve input values and store them in variables:
let rows = parseInt(document.getElementById('rows').value);
let columns = parseInt(document.getElementById('columns').value);

  //2. Need variable for the table element, that will hold the html code to make the table:
  let table = "<table>";

  //3. Need to generate the table with a loop that will repeat the arithmetic for every section of the table :
for (let r = 1; r <= rows; r++){
  table += "<tr>"; 
  for (let c = 1; c <= columns; c++){
    //4. multiply counter #'s by each other to get the product of row number and column number
    table +="<td>" + (r*c) + "</td>";
  }
  table += "</tr>";
}
table += "</table>";

 //5Need to display the table:
document.getElementById('table').innerHTML = table;
};

//Finally, need an event listener that calls the above function when the button is clicked:
document.getElementById('click-here').addEventListener('click', drawTable);