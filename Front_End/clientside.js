var x = document.getElementById("l1content");
function change(){
    //code sourced from https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


function l1() {
  x = document.getElementById("l1content");
  change();
}

function l2(){
    x = document.getElementById("l2content");
    change();
}

function l3(){
    x = document.getElementById("l3content");
    change();
}

function l4(){
    x = document.getElementById("l4content");
    change();
}

function l5(){
    x = document.getElementById("l5content");
    change();
}

function l6(){
    x = document.getElementById("l6content");
    change();
}

function l7(){
    x = document.getElementById("l7content");
    change();
}

function l8(){
    x = document.getElementById("l8content");
    change();
}

function l9(){
    x = document.getElementById("l9content");
    change();
}

function l10(){
    x = document.getElementById("l10content");
    change();
}

function l11(){
    x = document.getElementById("l11content");
    change();
}

function l12(){
    x = document.getElementById("l12content");
    change();
}

function l13(){
    x = document.getElementById("l13content");
    change();
}

function l14(){
    x = document.getElementById("l14content");
    change();
}

function l15(){
    x = document.getElementById("l15content");
    change();
}

function l16(){
    x = document.getElementById("l16content");
    change();
}

function l17(){
    x = document.getElementById("l17content");
    change();
}

function l18(){
    x = document.getElementById("l18content");
    change();
}

function b1(){
    x = document.getElementById("b1content");
    change();
}

function b2(){
    x = document.getElementById("b2content");
    change();
}

function b3(){
    x = document.getElementById("b3content");
    change();
}

function b4(){
    x = document.getElementById("b4content");
    change();
}

function b5(){
    x = document.getElementById("b5content");
    change();
}













var curactive = 1;
var y = document.getElementById("basepage")
const pages = ["basepage", "gamearchive", "levels", "bosses", "showcase"]

function disable_rest(cur){
    
    for (i = 0; i < pages.length; i++) {
        if(pages[i] != cur){
            y = document.getElementById(pages[i])
            y.style.display = "none";
        }
    }
    
}

function base_page(){

    //how to change background image sourced from https://stackoverflow.com/questions/21496905/how-to-change-the-background-image-of-div-using-javascript
    document.body.style.backgroundImage = "none"
    document.body.style.backgroundColor= "rgb(79, 6, 79)"
    
    y = document.getElementById("basepage");
    y.style.display = "block";
    cur = "basepage"
    disable_rest(cur);
}

function game_archive(){

    document.body.style.backgroundImage = "url(images/hollow_knight_background.jpg)"

    y = document.getElementById("gamearchive");
    y.style.display = "block";
    cur = "gamearchive"
    disable_rest(cur);
}


function levels(){

    document.body.style.backgroundImage = "url(images/smb_gif.gif)"

    y = document.getElementById("levels");
    y.style.display = "block";
    cur = "levels"
    disable_rest(cur);
}

function bosses(){

    document.body.style.backgroundImage = "url(images/smb_gif.gif)"

    y = document.getElementById("bosses");
    y.style.display = "block";
    cur = "bosses"
    disable_rest(cur);
}

function showcase(){

    document.body.style.backgroundImage = "url(images/smb_background_2.jpg)"

    y = document.getElementById("showcase");
    y.style.display = "block";
    cur = "showcase"
    disable_rest(cur);
}


var input = document.getElementById("file");
  input.addEventListener("blur", function(){
    //code from Chat gpt
    if(!this.value.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]+\.(jpg|png|gif))$/)){
      alert("Not a valid URL. Please enter a valid URL of type .jpg/.png/.gif");
    }
  });


