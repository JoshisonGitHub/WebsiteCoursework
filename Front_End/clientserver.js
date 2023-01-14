const endpointRoot = "http://127.0.0.1:8090/";


// Get the form and file field
let form = document.querySelector('#game-submit');
let file = document.querySelector('#file');
let appnew = document.querySelector('#newoutput');
let img = document.createElement('div');
let textvar = "";
/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */

function logFile (event) {
  let str = event.target.result;
  
  
  img.src = str;
  //console.log(img.src);
  appnew.append(img);
  //addgames();
  //console.log(appnew);
  
}

/**
 * Handle submit events
 * @param  {Event} event The event object
 */

function handleSubmit (event) {

  // Stop the form from reloading the page
  event.preventDefault();

  // If there's no file, do nothing
  if (!file.value.length){
    return;
  } 

  // Create a new FileReader() object
  //let reader = new FileReader();

  // Setup the callback event to run when the file is read
  //reader.onload = logFile;
  const imgnew = readFile(file.files[0]);
 
 
  imgnew.then((val) => img.append(val));
  //console.log(img);
  //appnew.append(img);
  
  // Read the file
  //reader.readAsDataURL(file.files[0]);
  

}





// Listen for submit events
form.addEventListener('submit', handleSubmit);

function readFile(file){
  return new Promise((resolve, reject) => {
    var fr = new FileReader();  
    fr.onload = () => {
      resolve(fr.result )
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

async function addgames() {
  
    

  

  const gameForm = document.getElementById('game-submit');
  //console.log("it worked");
  gameForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    
    // eslint-disable-next-line no-undef
    const data = new FormData(gameForm);
    
    
    
    //data.picture = base64 pic

    /* conversion from FormData to JSON at https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json */
    const dataJSON = JSON.stringify(Object.fromEntries(data));

    //console.log(dataJSON);
    
    console.log(dataJSON);
    
    

  
    /*
    // Create a new FileReader object
    const reader = new FileReader();

    // Add an event listener for when the file is fully loaded
    reader.addEventListener('load', () => { 
      // The result of the file reader is a data URL
      // which can be used to create an image
      const base64Image = reader.result;
 
      list.picture = base64Image;
    });
    
    // Read the file as a data URL
    // this breaks it
    reader.readAsDataURL(list.picture);
    */
    
    

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




