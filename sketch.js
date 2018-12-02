var result, oldResult, currentResult;
var flag =true;
var y,x, r;
var newQuery;
var oldSpeechResult, newSpeechResult;
var a = "no";
var displayText;
var colorHex = "no color";
var myColor;
function setup() {
    colorMode(HSB, 255);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0,0);
    canvas.style('z-index',-1);
    y= 0;
    x= 0;
    oldResult = "hello";
    result = "no result";
    r =100;
    newQuery = false;
    oldSpeechResult = document.getElementById("note-textarea").value;
    newSpeechResult = oldSpeechResult;
    currentResult = "nothing for now";
    
    document.getElementById("note-textarea").style.display= "none";
    displayText = document.getElementById("display-text");
    myColor = color('#0f0');
}

function draw() {
    background(230);
    if(oldResult != result){
        flag = true;
        oldResult = result;
    }
    if(flag || newQuery){
        if(result == "Smaller"){
            r -= 20;
            flag = false;
        }
        if(result == "Bigger"){
            r += 20;
            flag = false;
        }
        if(result == "Lower"){
            y += 20;
        }
        if(result == "Higher"){
            y -= 20;
        }
        if(result == "Left"){
            x -= 20;
        }
        if(result == "Right"){
            x += 20;
        }
        if(result == "Color"){
            myColor = colorHex;
        }
        if(result == "Bright"){
            
            colorMode(HSB, 255);
            
            var newHue = hue(myColor) * 1;
            var newBrightness =  brightness(myColor) * 1.2;
            var newSaturation =  saturation(myColor) * 1;
            
            var newColor = color (newHue, newSaturation, newBrightness)
            myColor = newColor;
        }
        flag = false;
        newQuery = false;

    }
    fill(myColor);
    noStroke();
    ellipse(x + window.innerWidth/2,
            y + window.innerHeight/2, 
            r,r);
    
    newSpeechResult = document.getElementById("note-textarea").value;
    
    if(newSpeechResult != oldSpeechResult){
        
        
        var recognizedText= newSpeechResult.replace(oldSpeechResult,"");
        newQueryToDialogFlow(recognizedText);
        oldSpeechResult = newSpeechResult;
        document.getElementById("display-text").innerHTML= recognizedText;
        newQuery = true;
    }
  
}
var ChangeHSBColor = function(hueValue, sValue, bValue){
    colorMode(HSB, 255);
   
    var newHue = hue(myColor) * this.hueValue;
    var newBrightness =  brightness(myColor) * this.bVlue;
    var newSaturation =  saturation(myColor) * this.sValue;
    print(this.hueVaue);
    var newColor = color (newHue, newSaturation, newBrightness)
    myColor = color(this.hueValue, 255,255);
    fill(20,20,20);
    text("hue " + this.hue, 10,10);
};
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w,h);
  width = w;
  height = h;
  canvas.position(0,0);
  canvas.style('z-index',-1);

};



function newQueryToDialogFlow(myQuery){
    value = myQuery;
    a= "yes";
    sendText(value)
      .then(function(response) {
        
        try {
          result = response.result.metadata.intentName;
          colorHex = response.result.parameters.Color;
        } catch(error) {
          result = "";
        }
        
//        setResponseJSON(response);
//        setResponseOnNode(result, responseNode);
      })
      .catch(function(err) {
        setResponseJSON(err);
      });
}



(function() {
  "use strict";

  var ENTER_KEY_CODE = 13;
  var queryInput, resultDiv, accessTokenInput;

  window.onload = init;

  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
//    accessTokenInput = document.getElementById("access_token");
//    var setAccessTokenButton = document.getElementById("set_access_token");
    window.init("tokenplaceholder");
    queryInput.addEventListener("keydown", queryInputKeyDown);
    document.getElementById("main-wrapper").style.display = "block";
//    setAccessToken();
   // setAccessTokenButton.addEventListener("click", setAccessToken);
  }

 
  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }

    var value = queryInput.value;
    
    queryInput.value = "";
    
    createQueryNode(value);
    //var responseNode = createResponseNode();

    sendText(value)
      .then(function(response) {
        
        try {
          result = response.result.metadata.intentName;
          colorHex = response.result.parameters.Color;
          newQuery = true;
        } catch(error) {
          result = "";
        }
        setResponseJSON(response);
        
        //setResponseJSON(response);
        //setResponseOnNode(result, responseNode);
      })
      .catch(function(err) {
        setResponseJSON(err);
        //setResponseOnNode("Something goes wrong", responseNode);
      });
  }

  function createQueryNode(query) {
//    var node = document.createElement('div');
//    node.className = "clearfix left-align left card-panel green accent-1";
//    node.innerHTML = query;
//    resultDiv.appendChild(node);
//       newQuery = true;
  }

  function createResponseNode() {
//    var node = document.createElement('div');
//    node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
//    node.innerHTML = "";
//    resultDiv.appendChild(node);
//    return node;
     
  }

  function setResponseOnNode(response, node) {
    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);
  }

  function setResponseJSON(response) {
//    var node = document.getElementById("jsonResponse");
//    node.innerHTML = JSON.stringify(response, null, 2);
  }

  function sendRequest() {

  }

})();
