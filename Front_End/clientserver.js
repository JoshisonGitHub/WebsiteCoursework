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
      //console.log("worked");
      canstring = true;
    } catch (e) {
      console.log("didn't work");
      alert("Game name or image can not be read, please try a different name / image")
    }
    try {
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
      listgamedata();
      listpostdata();
      
      }
    } catch (error) {
      errormessageon();
      console.log("no server");
    }
    

    
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




async function listpostdata () {
  const postdataResponse = await fetch(endpointRoot + 'postdata');
  const postdataKeysText = await postdataResponse.text();

  console.log(postdataKeysText);
  const postdataKeys = JSON.parse(postdataKeysText);
  
  //let newlist = '';
  for (const postdataKey of postdataKeys) {
      //console.log(postdataKey);
      for(const newpostdata of postdataKey){
        //console.log(newgamedata);
        const name = newpostdata.key;
        const date = newpostdata.date;
        const pic = newpostdata.picture;
        //console.log(name);
        
        let imgTag = ' <img class = "img-fluid adjust-line-height" width="700" src="' + pic + ` "alt="Image of Game ${name}">`;
        let dateTag = ' <p class = "p-smalltext adjust-line-height">' + date + '</p>'
        //console.log(pic);
        //console.log(imgTag);
        console.log(gameListElt);
        console.log(gameListElt.children);

        //var matches = [];
        var searchEles = document.getElementById("newoutput").children;
        console.log(searchEles);
        console.log(searchEles.length);
        for(var i = 0; i < searchEles.length; i++) {
          console.log(searchEles[i].id);
          if(searchEles[i].id == name) {
            console.log("test success");
            searchEles[i].innerHTML += dateTag
            searchEles[i].innerHTML += imgTag
          }
        }
        /*
        for(child of gameListElt.children){
          //console.log(child);
          console.log(child.id);
          if(child.id == name){
            console.log("is the same");
            //child.innerHTML += "this is a test";
            child.append(dateTag);
            child.append(imgTag);
            //child.innerHTML += dateTag
            //child.innerHTML += imgTag
            console.log(child);
          }
        }
        */
      
      }
      
  }
 console.log(gameListElt);
}

async function listgamedata(){
  const platformResponse = await fetch(endpointRoot + 'game/:gamedata');
  const platformKeysText = await platformResponse.text();
  


  const platformKeys = JSON.parse(platformKeysText);
  //console.log("PlatformKeys");
  //console.log(platformKeys);


  const l2 = document.getElementById("givenames");
  const l3 = document.getElementById("givenplatforms");

  let list = '';
  let list2 = '';
  let list3 = '';
  
  for(const platformKey of platformKeys){
    let temp = '';
    for(const newplatformdata of platformKey){
      //console.log(newplatformdata)
      //console.log(newplatformdata.gamename);

      const name = newplatformdata.gamename;
      const platforms = newplatformdata.platform_played_on;

      list += `<h2 class='game_list_item' id = "${name}">${name}</h2>`;
      list2 += `<option value="${name}"></option>`
      
      for (platform of platforms){
        temp += platform + ', ';
        
        list3 += `<option value="${platform}"></option>`
      }
    }
    list += '<h5 class = "adjust-line-height">' +'Platforms Played On: ' + temp + '</h5>'
    
  }
  
  gameListElt.innerHTML = list;
  l2.innerHTML = list2;
  l3.innerHTML = list3;
  //console.log("gameListElt");
  //console.log(gameListElt);
}

//document.addEventListener('DOMContentLoaded', listgames);

document.addEventListener('DOMContentLoaded', listgamedata);
document.addEventListener('DOMContentLoaded', listpostdata);
