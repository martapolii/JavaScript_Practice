// ----Image Slideshow-----

// Loading the image list using AJAX
  // instantiate the XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  //define a request to the server
  xhr.open("get", "imageList.json", true); //asynchronous request
  //send the request
  xhr.send(null);

// Creating a function which which checks the request state and status, then reacts accordingly.
  // if successful, displays images from the JSON file, if not displays an error message:
  xhr.onreadystatechange = function() {

    //check if the request is complete and successful
    if (xhr.readyState == 4  && (xhr.status >= 200 && xhr.status < 300)) {

      //parse the JSON response
      var imageList = JSON.parse(xhr.responseText);

      //display the first image in the json file
      var currentImg = 0;
      displayImages(imageList, currentImg);

      var resetTimer; //need to reset image duration when next/previous buttons are clicked, or else the images change rapidly, so making a variable to store the timer that I can clear it

      //need to add even listeners for next and previous buttons
        // next button:
        document.querySelector(".arrow_next").addEventListener("click", function() {
          clearTimeout(resetTimer);
          currentImg = (currentImg + 1) % imageList.length; //increment the current image index and % by the length of the image list to loop back to the beginning
          displayImages(imageList, currentImg);
        });

        // previous button:
        document.querySelector(".arrow_previous").addEventListener("click", function() {;
          clearTimeout(resetTimer);
          currentImg = (currentImg - 1 + imageList.length) % imageList.length;
          displayImages(imageList, currentImg);
        });

        // function to display the images
        function displayImages(imageList, index) {
          var imageContainer = document.getElementById("image_container");
          imageContainer.innerHTML = ""; // clear the image container

          for (var i = 0; i<5; i++) {
          var imgIndex = (index + i) % imageList.length;
          var image = document.createElement("img");
          image.src = "images/" + imageList[imgIndex].src; // append the file path for the images
        
          console.log("Should be displaying image #", imageList[imgIndex].src); //debugging

          imageContainer.appendChild(image);
          }

        // move onto the next image after the amount of time specified in the JSON file
        resetTimer = setTimeout(function() {
          document.querySelector(".arrow_next").click();
          }, imageList[index].duration); //duration is in milliseconds

          // an Update button so the user can update the picture list from the file and show the first picture in the list
          document.getElementById("update_button1").addEventListener("click", function() {
            xhr.open("get", "imageList.json", true);
            xhr.send(null);
          });
        }

      }
      else if (xhr.readyState == 4) {
        alert("Request was unsuccessful: " + xhr.status);
      }
    };


// ------- API 1: Cat Facts API -------
/* I tried many different cat fact APIs and they all work at first and then stop updating after a while. I am not sure if its my code or the API itself. I also tried: https://cat-fact.herokuapp.com, had the same issue where it worked at first and then stopped*/
var xhr2 = new XMLHttpRequest();
xhr2.open("get", "https://catfact.ninja/facts?limit=1", true);
xhr2.send(null);
xhr2.onload = function() {
  if (xhr2.readyState === 4) {
    if (xhr2.status >= 200 && xhr2.status < 300) {
      var data = JSON.parse(xhr2.responseText).data; 
      var catFacts = document.getElementById("cat_facts");
      catFacts.innerHTML = '';

      data.forEach(function(facts) {
        if (facts.fact.toLowerCase().includes("cat")) { //lots of random submissions that aren't cat facts, so filtering for the word cat
          var fact = document.createElement("p");
          fact.textContent = facts.fact; 
          catFacts.appendChild(fact);
        }
      });

      if (catFacts.innerHTML === "") {
        catFacts.innerHTML = "<p>No relevant cat facts found. Please try again.</p>";
      }

      document.getElementById("update_button2").addEventListener("click", function() {
        xhr2.open("get", "https://catfact.ninja/facts?limit=1", true);
        xhr2.send(null);
      });
    } else {
      console.log("Request was unsuccessful: " + xhr2.statusText);
    }
  }
};

// ------- API 2: 3 Random Jokes API -------
function fetchJokes() { 
  var xhr3 = new XMLHttpRequest();
  xhr3.open("get", "https://official-joke-api.appspot.com/jokes/random/3", true); // get 3 random jokes
  xhr3.setRequestHeader("Accept", "application/json");
  xhr3.send(null);

  xhr3.onload = function() {
    if (xhr3.readyState === 4) {
      if (xhr3.status >= 200 && xhr3.status < 300) {
        var jokesData = JSON.parse(xhr3.responseText); 
        var jokesContainer = document.getElementById("jokes");
        jokesContainer.innerHTML = ''; 

        jokesData.forEach(function(joke) {
          var jokeElement = document.createElement("div");
          jokeElement.classList.add("joke");

          var setup = document.createElement("p");
          setup.textContent = joke.setup;
          setup.classList.add("joke_setup"); // class for styling

          var punchline = document.createElement("p");
          punchline.textContent = joke.punchline;
          punchline.classList.add("joke_punchline"); //class for styling

          jokeElement.appendChild(setup);
          jokeElement.appendChild(punchline);

          jokesContainer.appendChild(jokeElement);
        });

        if (jokesContainer.innerHTML === "") {
          jokesContainer.innerHTML = "<p>No jokes found. Please try again.</p>";
        }
        //update button
        document.getElementById("update_button3").addEventListener("click", function() {
          xhr3.open("get", "https://official-joke-api.appspot.com/jokes/random/3", true);
          xhr3.send(null);
          });
      
      } else {
        console.log("Request was unsuccessful: " + xhr3.statusText);
      }
    }
  };
}

fetchJokes(); //run the function when the page loads
  

// -------- API 3: Weather API --------
function getWeather() {

  document.getElementById("update_button4").addEventListener("click", function() {
    let location = document.getElementById("search_box").value; // get the inputted location, store it in a variable to pass to the API in the request

    var xhr4 = new XMLHttpRequest();
    xhr4.open("get", "https://api.weatherstack.com/current?access_key=5e4718874451e5579b12b449287831c1&query=" + location, true);
    xhr4.send(null);

    xhr4.onload = function() {
      if (xhr4.readyState === 4) {
        if (xhr4.status >= 200 && xhr4.status < 300) {
          var weatherData = JSON.parse(xhr4.responseText); 
          var weatherContainer = document.getElementById("weather");
          weatherContainer.innerHTML = '';

          //location
          var city = document.createElement("p");
          city.textContent = "City:   " + weatherData.location.name;
          city.classList.add("weather_city"); // class for css
          //temperature
          var temperature = document.createElement("p");
          temperature.textContent = "Temperature:  " + weatherData.current.temperature + "°C";
          temperature.classList.add("weather_temperature"); 
          //condition
          var condition = document.createElement("p");
          condition.textContent = "Condition:   " + weatherData.current.weather_descriptions[0];
          condition.classList.add("weather_condition"); 
          // append all the new wlwments to the weather container
          weatherContainer.appendChild(city);
          weatherContainer.appendChild(temperature);
          weatherContainer.appendChild(condition);
        }
        else{
          console.error("Request unsuccessful: " + xhr4.statusText);
        }
      }
    }
  })
};

getWeather(); //run the function when the page loads
