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
/*
function logFile (event) {
  let str = event.target.result;
  
  
  img.src = str;
  //console.log(img.src);
  appnew.append(img);
  //addgames();
  //console.log(appnew);
  
}
*/
/**
 * Handle submit events
 * @param  {Event} event The event object
 */
/*
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
*/



/*
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
*/
async function addgames() {

  const gameForm = document.getElementById('game-submit');
  //console.log("it worked");
  gameForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    
    // eslint-disable-next-line no-undef
    const data = new FormData(gameForm);
    
    canstring = false;
    try {
      const dataJSON = JSON.stringify(Object.fromEntries(data));
      console.log("worked");
      canstring = true;
    } catch (e) {
      console.log("didn't work");
      alert("Game name or image can not be read, please try a different name / image")
    }

    if(canstring){
      const dataJSON = JSON.stringify(Object.fromEntries(data));
      const response = await fetch(endpointRoot + 'game/new',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataJSON
    });
      
    gameForm.reset();
    listgames();
    listgamedata();
    }
    /* conversion from FormData to JSON at https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json */
    //const dataJSON = JSON.stringify(Object.fromEntries(data));

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
    
  });
  
}

document.addEventListener("DOMContentLoaded", addgames);




//-----------------------------------------------------------
const gameListElt = document.getElementById('newoutput');
async function listgames () {
  const gameResponse = await fetch(endpointRoot + 'games');
  const gameKeysText = await gameResponse.text();
  const gameKeys = JSON.parse(gameKeysText);

  const l2 = document.getElementById("givenames");
  
  let list = '';
  let list2 = '';
  for (const gameKey of gameKeys) {
      //console.log(gameKey);
      list += `<h2 class='game_list_item' id = "${gameKey}">${gameKey}</h2>`;
      list2 += `<option value="${gameKey}"></option>`
  }
  gameListElt.innerHTML = list;
  l2.innerHTML = list2;
  //const listItems = document.querySelectorAll('.game_list_item');
  
}




async function listgamedata () {
  const gamedataResponse = await fetch(endpointRoot + 'game/:gamedata');
  const gamedataKeysText = await gamedataResponse.text();

  //console.log(gamedataKeysText);
  const gamedataKeys = JSON.parse(gamedataKeysText);
  
  //let newlist = '';
  for (const gamedataKey of gamedataKeys) {
      //console.log(gamedataKey);
      for(const newgamedata of gamedataKey){
        //console.log(newgamedata);
        const name = newgamedata.gamename;
        const date = newgamedata.date;
        const pic = newgamedata.picture;
        //console.log(date);
        let imgTag = '<img class = "img-fluid adjust-line-height" width="700" src="' + pic + ` "alt="Image of Game ${name}">`;
        let dateTag = '<p class = "p-smalltext adjust-line-height">' + date + '</p>'
        //console.log(pic);
     
        for(child of gameListElt.children){
          //console.log(child);
          if(child.id == name){
            //console.log(child.innerHTML);
            child.innerHTML += dateTag
            child.innerHTML += imgTag
          }
        }
      
      }
      
  }
 
}

document.addEventListener('DOMContentLoaded', listgames);
document.addEventListener('DOMContentLoaded', listgamedata);



//------------------------errors------------------------
/*
try {
  fetch('/basepage.html')
  .then(response => {
    if (!response.ok) {
      console.log("it did something")
      throw Error(response.statusText);
    }
    return response.text();
  })
  .then(data => {
    console.log(data);
    // Use the data here
  })
  /*
  .catch(error => {
    console.error(error);
    let err = document.getElementById("error-message")
    err.innerHTML = "Sorry, the server is disconnected. Please try again later.";
  })*/;
  /*
} catch (error) {
  console.log("fucked")
  let err = document.getElementById("error-message")
    err.innerHTML = "Sorry, the server is disconnected. Please try again later.";
}
*/



