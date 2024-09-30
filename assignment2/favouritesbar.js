// add event listener:
window.addEventListener("load", createFavBar);

//create function
function createFavBar()
{
  //create container
  let favBar = document.getElementById("favbar");

  //Create parts of the favourites bar:
  let fbTitle = document.createElement("h2"); // need a title
  let fbCounter = document.createElement("div");// need a counter (max 5 images)
  let fbImages = document.createElement("div") // need a variable to contain the images

  // Next, need to append these new element nodes to the container + assign them unique id's 

  // TITLE
  favBar.appendChild(fbTitle);
  fbTitle.id = "fbTitle";
  //assign variable to hold the title text:
  let favBarTitle = "Favourites:"
  // need to add the text to the title element:
  fbTitle.textContent = favBarTitle;

  // COUNTER
  favBar.appendChild(fbCounter);
  fbCounter.id = "fbCounter"; 

  let fbCurrentImg = 0;
  fbCounter.textContent = fbCurrentImg + "/5";

  // variable for image counter
  let fbImgCount = 5;


  // IMAGES CONTAINER
  favBar.appendChild(fbImages);
  fbImages.id = "fbImages";
  

  // add image files to the favBar container 
  function addToFavBar(imageSrc) {
    //need to link the add to favourites button to each image 
    //need to import image on screen into the container 
      if (fbCurrentImg < 5) {
          let favImg = document.createElement("img");
          favImg.src = imageSrc;
          favImg.onclick = removeFav;
          fbImages.appendChild(favImg);
          fbCurrentImg++;
          fbCounter.textContent = fbCurrentImg + "/5";
      } else {
          alert("Up to 5 images can be added to favourites. Please remove an image to add more.");
      }
  }


// add function so that when you click on image it displays option to remove it:
// ** DOESN'T WORK PROPERLY - I tried MANY things to get the "x" button to populate with the proper fuctionality. Below is the only variation of my code that doesn't break the website. The best I could do is allow the user to remove an image from the fav bar by clicking on it. When I try to add a button like in the overlay, it causes my java script code to stop working on other parts of the page. I will try to troubleshoot in my own time to figure it out. 

// Create remove button
let removeButton = document.createElement("div");
removeButton.id = "removeButton";
removeButton.innerHTML = "&times;"; // HTML entity X symbol
  
//function to remove image from fav bar:
  function removeFav() {
    let favImg = this;
    fbImages.removeChild(favImg);
    fbCurrentImg--;
    fbCounter.textContent = fbCurrentImg + "/5";
}
// event handler so that image is removed onclick of the button:
removeButton.onclick = function () {
  removeFav(favImg);
};
// make this function accessible (is referenced in the lightbox.js file, where add to favourites button is created)
window.addToFavBar = addToFavBar;


/* this is the code in the profs example:
function addToFavorites(src) {
  if (favorites.length >= maxFavorites) {
    alert("You can only add up to " + maxFavorites + " favorites. Please remove a favorite before adding a new one.");
    return;
  }
  if (favorites.includes(src)) {
    alert("The image is already in your favorites");
    return;
  }
  favorites.push(src);
  updateFavorites();
}
function updateFavorites() {
  let favoritesDiv = document.getElementById("favorites");
  favoritesDiv.innerHTML = "";
  for (let i = 0; i < favorites.length; i++) {
    let img = document.createElement("img");
    img.src = favorites[i];
    favoritesDiv.appendChild(img);

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFavorites(i);
    favoritesDiv.appendChild(removeButton);
    }
  }  
  function removeFavorites(index) {
    favorites.splice(index, 1);
    updateFavorites();
}*/
}







  



