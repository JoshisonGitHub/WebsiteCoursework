const endpointRoot = "http://127.0.0.1:8090/";


// Get the form and file field
let form = document.querySelector('#game-submit');
let file = document.querySelector('#file');
let appnew = document.querySelector('#newoutput');


/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */
function logFile (event) {
  let str = event.target.result;
  let img = document.createElement('img');
  
  img.src = str;
  console.log(img.src);
  appnew.append(img);
  
}

/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit (event) {

  // Stop the form from reloading the page
  event.preventDefault();

  // If there's no file, do nothing
  if (!file.value.length) return;

  // Create a new FileReader() object
  let reader = new FileReader();

  // Setup the callback event to run when the file is read
  reader.onload = logFile;

  // Read the file
  reader.readAsDataURL(file.files[0]);

}

// Listen for submit events
form.addEventListener('submit', handleSubmit);


async function addgames() {
  const gameForm = document.getElementById('game-submit');
  console.log("it worked");
  gameForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      // eslint-disable-next-line no-undef
      const data = new FormData(gameForm);
  /* conversion from FormData to JSON at https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json */
      const dataJSON = JSON.stringify(Object.fromEntries(data));
      // eslint-disable-next-line no-unused-vars
      const response = await fetch(endpointRoot + 'game/new',
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: dataJSON
      });
      
      gameForm.reset();
  });
  }

document.addEventListener("DOMContentLoaded", addgames);




