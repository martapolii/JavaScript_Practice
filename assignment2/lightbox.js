//** README: The js and css code for the lightbox specificaly was created by following along chapter 5 of the textbook and creating all the functions for functionality of the lightbox; I left my notes in to show understanding of the material (not just copy + paste)

/* code for favourites button at end of createOverlay() function **/


// CREATING NODES
//adding another event listener:
window.addEventListener("load", createLightbox);
window.addEventListener("load", setupGallery);


//THE MAIN FUNCTION:
function createLightbox()
{
   //Lightbox conatiner
  let lightBox = document.getElementById("lightbox");
   //Parts of the lightbox
   let lbTitle = document.createElement("h1"); // created an h1 element node
   let lbCounter = document.createElement ("div"); // created div element nodes
  let lbPrev = document.createElement("div");
  let lbNext = document.createElement("div");
  let lbPlay = document.createElement("div");
  let lbImages = document.createElement ("div");




   //next, need to APPEND THE ELEMENT NODES to the lightbox container using the appendChild() method. need to give each element a unique id to identify it for the styles defiend in the stylesheet
   // *appendChild() method automatically inserts the node at the end of the parent node's children


   //design the lightbox TITLE
   lightBox.appendChild(lbTitle); //append to lightbox container
   lbTitle.id = "lbTitle"; //assign a unique id
  /* Add LIGHTBOX TITLE text to page
  - use textContent property
  - inserts title of the slideshow and the slide counter text (i.e. 3/12)
   */
   lbTitle.textContent = lightboxTitle; // adds title to lightbox

  
   //design the lightbox slide COUNTER
  lightBox.appendChild(lbCounter);
  lbCounter.id = "lbCounter";


   //add COUNTER text to page
   let currentImg = 1; //sets intial value of counter to 1
   lbCounter.textContent = currentImg + " / " + imgCount; // displays : current image #/total number of images 

  
   //design lightbox PREVIOUS slide button
   lightBox.appendChild(lbPrev); //append
  lbPrev.id = "lbPrev";
   // add SYMBOL
   //    - symbols added with HTML entity references 
   //    - added using innerHTML property bc they are HTML code 
  lbPrev.innerHTML = "&#9664;";
  lbPrev.onclick = showPrev; //add event handler so when user clicks previous arrow button, images will scroll backwards. and image counter will adjust accordingly



   //design NEXT slide button
  lightBox.appendChild(lbNext);
  lbNext.id = "lbNext";
   // add symbol
  lbNext.innerHTML ="&#9654;";
  lbNext.onclick = showNext; // add event handler to the next button to trigger showNext function (see below) - so when it is clicked the function will be invoked (next image will be shown, and counter will be updated to reflect index value of the image in the array)



   //design PLAY-PAUSE button
  lightBox.appendChild(lbPlay);
  lbPlay.id = "lbPlay";
   // add symbol
  lbPlay.innerHTML ="&#9199;";
   let timeID; // declare a variable to store ID for times command - this is for the automatic slideshow functionality. (needed to distinguish timed commands from eachother when there is more than one)
   lbPlay.onclick = function () // TIMED COMMAND - add an anonymous function that runs when you press the play button - it runs the showNext function every 1.5 seconds (defined in milliseconds in the code) 
  {
      /*
      showNext();
      timeID = window.setInterval (showNext, 1500);  
      (^these two lines of code start the slideshow, but do not stop it. need a loop that lets you stop the slideshow)
      */
      if (timeID) 
        {
            // stop slideshow:
            window.clearInterval (timeID);
            timeID = undefined; // sets to undefined if timeID has a truthy (defined) value 
        } else 
        {
            //start slideshow:
            showNext(); //if slideshow not running, run this function
            timeID = window.setInterval (showNext, 2000);    //then store ID of the timed command 
        }
  }


   //design IMAGES CONTAINER
  lightbox.appendChild(lbImages);
  lbImages.id = "lbImages";


  /*Next, need to ADD IMAGES to the lightbox.
  - need to make a for loop to iterate through the imgFiles array
      - create an img element node for each item in the array, append it as a child of the lbImages element node 
      - use the imgCount variable 
   */

      //for loop that populates the lbImages element node with inline images:
      // (adds images from the imgFiles array to the container)

  for (let i = 0; i < imgCount; i++)//looping through imgFiles array
      {
         let image = document.createElement("img"); //creates a node for img element
         image.src = imgFiles[i]; //grab images from array
          image.alt = imgCaptions[i];// grab captions from array
         image.onclick = createOverlay; //overlay function invoked by on click event (click on image to activate the overlay)
         lbImages.appendChild(image); //appends images to images container
      }






      // add SCROLLING FUNCTIONALITY 
      //   - create a function that will run when the next button is clicked 
      //   - use appendChild() method to move the images to the end of the list 
      //   - the image counter will change becuase of a loop that itrerates through the index's of the image array and resets to one when you get through all the images 

      function showNext()
      {
         lbImages.appendChild(lbImages.firstElementChild); //append image node for the first image to the end of the list 
         (currentImg < imgCount) ? currentImg++ : currentImg = 1; // set a loop for the counter. increase by one until the end of the list, then reset to 1
         lbCounter.textContent = currentImg + " / " + imgCount; // print the updated counter text onto the image counter 
      }

      function showPrev()
      {
         lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild); //moves last image to the start
         (currentImg >1) ? currentImg-- : currentImg = imgCount; // loop to descrease counter by 1 until first image, then reset to total number of images 
         lbCounter.textContent = currentImg + " / " + imgCount; // prints index # of current image in array to the counter
      }





      // creating an OVERLAY FUNCTION, so you can click on an image and a full-screen overlay appears (translucent so you can still see the page)

      function createOverlay()
      {
      //creating the overlay:
         let overlay = document.createElement("div"); // creating a node for the overlay
         overlay.id = "lbOverlay"; // assigning a unique id 

      // adding the figure box to the overlay:
         let figureBox = document.createElement("figure"); //creating a node for the figure box
         overlay.appendChild(figureBox); //appending the figurebox to the overlay
      // adding images to the overlay
         let overlayImage = this.cloneNode ("true"); // use ".this" to specify which image called the function
         figureBox.appendChild(overlayImage); // append a copy of the image node to the figure box in the overlay 
      //adding captions
         let overlayCaption = document.createElement("figcaption"); // creating a node for figure captions
         overlayCaption.textContent = this.alt; //specifying which caption (alt text) should be displayed with ".this"
         figureBox.appendChild(overlayCaption); //appending the caption to the overlay's figurebox

      //adding a CLOSE BUTTON to the overlay:
         let closeBox = document.createElement("div"); //create element for button
         closeBox.id = "lbOverlayClose"; // add unique id
         closeBox.innerHTML = "&times;"; // add HTML for button symbol (an x)
         // adding an event handler that invokes an anonymous function which closes the overlay when you click the button:
        closeBox.onclick = function() {
            document.body.removeChild(overlay);
        };
         // now need to append the button to the overlay, or it won't show:
        overlay.appendChild(closeBox);

        document.body.appendChild(overlay); //appending the overlay to the html body 


        /* ---------------------------------------------------------------------------
                                    'ADD TO FAVOURITES' HYPERLINK/BUTTON
        -------------------------------------------------------------------------------
        */
        let favBarButton = document.createElement("div"); // create button element
        favBarButton.id = "favBarButton";
        favBarButton.innerHTML = "&#10084;"; //HTML entity that represents a Heavy Black Heart
        //need to add function that adds images to fav bar in response to on lick event on heart symbol
        favBarButton.onclick = function() {
          window.addToFavBar(overlayImage.src); //function for adding image to fave bar, defined in favouritesbar.js file 
          this.classList.add('scale-up'); //CSS class so theres an effect when you click the button
          // button would stay big so have to remove the class after animation is completed:
          setTimeout(() => {
            this.classList.remove('scale-up');
        }, 400)
        };
        // append button to overlay and html body:
        overlay.appendChild(favBarButton);
        document.body.appendChild(overlay);

        // Debugging: Check if the heart button is working:
      console.log("heart button is working");

      // ^ this function is initialized in the for loop that adds images to the container, and invoked by an onlick event 
    }
  }



function setupGallery() {
    let imageCount = imgFiles.length;
    let galleryBox = document.getElementById("gallery");
    let currentSlide = 1;
    let runShow = true;
    let showRunning;
    
    let galleryTitle = document.createElement("h1");
    galleryTitle.id = "galleryTitle";
    //galleryTitle.textContent = slidesTitle;
    galleryBox.appendChild(galleryTitle);
    
    let slideCounter = document.createElement("div");
    slideCounter.id = "slideCounter";
    slideCounter.textContent = currentSlide + "/" + imageCount;
    galleryBox.appendChild(slideCounter);
    
    let leftBox = document.createElement("div");
    leftBox.id = "leftBox";
    leftBox.innerHTML = "&#9664;";
    leftBox.onclick = moveToLeft;   
    galleryBox.appendChild(leftBox);
    
    let rightBox = document.createElement("div");
    rightBox.id = "rightBox";
    rightBox.innerHTML = "&#9654;";  
    rightBox.onclick = moveToRight;   
    galleryBox.appendChild(rightBox);
    
    let playPause = document.createElement("div");
    playPause.id = "playPause";
    playPause.innerHTML = "&#9199;";
    playPause.onclick = startStopShow;
    galleryBox.appendChild(playPause);
    
    let slideBox = document.createElement("div");
    slideBox.id = "slideBox";
    galleryBox.appendChild(slideBox);
    
    
    for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
      }

    function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
          currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
      }
  
    function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
          currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
      }  
  
    function startStopShow() {
      if (runShow) {
        showRunning = window.setInterval(moveToRight, 2000);
        runShow = false;
      } else {
        window.clearInterval(showRunning);
        runShow = true;
      }
    }
  
    function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "activeModal";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "modalClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
        document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
    }
  }
