const endpointRoot = "http://127.0.0.1:8090/";

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


