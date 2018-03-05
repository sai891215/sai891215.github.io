// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc
var send = [];
var mapimg;
var img;
var clat = 40.411153;
var clon = -79.944564;

var myDiv0, myDiv1;
var ww = 1024;
var hh = 1024;
var l1, l2;
var zoom = 12.6;
var earthquakes;
var cx, cy;
var input;
var data;
var table;
var imgArr = [];
var httpsString = [];
var img1;
var myLon = [];
var total = 2;
var myLa = [];
var jsonData = [];
var GlobalData = [];
var number = 0;
var loadNumber = 0;
var tabble2;
var jsonData;

function preload() {
  // img = loadImage("img1.jpeg");
  table = loadTable('https://docs.google.com/spreadsheets/d/1lm1NtSv3NMnstnrst7WHbuRE-fSXPnDSDAMNKkp0pZM/edit?usp=sharing', 'csv', 'header');

  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
  // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('restaurants.csv');

  // Tabletop.init({
  //   key: '1lm1NtSv3NMnstnrst7WHbuRE-fSXPnDSDAMNKkp0pZM',
  //   callback: gotData,
  //   simpleSheet: true

  // });
  Tabletop.init({
    key: '1lm1NtSv3NMnstnrst7WHbuRE-fSXPnDSDAMNKkp0pZM',
    callback: gotData,
    simpleSheet: true
  });


  for (var i = 0; i < httpsString.length; i++) {
    if (httpsString[i]) {

      print("loading");
      var li = httpsString[i];
      // var img3= createImage("image.jpeg");  
      var link = "https://api.rethumb.com/v1/exif/all/" + li;
      print(link);
      GlobalData[i] = loadJSON(link);
    }
  }
  // var tt= createImg('drive.google.com/uc?id=1-wUu599XyMtKsGqT2PxLTIODGRVD86Uv&export=download');
  // tt.id("yes");

  // print(l1);
}

function gotData(stuff, tabletop) {
  data = stuff;
  print("got data");
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {

  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);

  // var ii = 1;
  // while (table.getString(ii, 0).length > 50) {
  //   // print(table.getString(ii, 0));
  //   // var newHttps = join(splitTokens(trim(table.getString(ii, 0)), ' '), '');
  //   httpsString[ii - 1] = newHttps;
  //   URL = "https://api.rethumb.com/v1/exif/all/http://" + newHttps;

  //   // print(newHttps);
  //   ii++;
  // }

  // if (jsonData) {
  //   for (var j = 0; j < 3; j++) {

  //     img[j] = createImg(jsonData[j]["Web"]);
  //     send[j] = false;
  //     print("img is added");
  //   }
  // }




  cx = mercX(clon);
  cy = mercY(clat);

  // for (var i = 0; i < httpsString.length; i++) {


  //     print("loading");
  //     var li = jsonData[i]["Web"];;
  //     // print(li);
  //     // var img3= createImage("image.jpeg");  
  //     var link = "https://api.rethumb.com/v1/exif/all/" + li;


  //     loadJSON(link, gotdata);

  // }


  // if (httpsString[number] && number < httpsString.length) {
  //   var li = httpsString[number];
  //   print("loading");
  //   // var img3= createImage("image.jpeg");  
  //   var link = "https://api.rethumb.com/v1/exif/all/" + li;
  //   print(link);
  //   loadJSON(link, gotdata);
  // }
}


this.gotdata = function(data) {
  print("jasonLoading");
  GlobalData[loadNumber] = data.GPS;
  print(GlobalData[loadNumber]);

}

this.toDecimal = function(number) {
  var n1 = split(number[0], '/')[0];
  var n2 = split(number[1], '/')[0];
  var n3 = split(number[2], '/')[0] / 100;

  return (float(n1) + float(n2) / (60) + float(n3) / (3600));
};




function gotData(stuff, tabletop) {
  jsonData = stuff;

  for (var j = 0; j < jsonData.length; j++) {
    httpsString[j] = join(splitTokens(jsonData[j]["Web"], ' '), '');
    print(httpsString[j]);
    imgArr[j] = createImg(httpsString[j]);
    imgArr[j].hide();
    send[j] = false;
    print("img is added");
  }

}

function draw() {

  // print(table);

  if (jsonData != null) {
    if (GlobalData[loadNumber] && loadNumber < httpsString.length) {
      loadNumber++;
      print("yes+1" + loadNumber);
    }
    if (!GlobalData[loadNumber] && send[loadNumber] == false) {


      var link = "https://api.rethumb.com/v1/exif/all/" + httpsString[loadNumber];

      print(link);
      loadJSON(link, gotdata);

      send[loadNumber] = true;
    }
  }
  //    
  //  
  // for (var i = 0; i < httpsString.length; i++) {

  //   if (!GlobalData[i]) {
  //     // Wait until the earthquake data has loaded before drawing.
  //     return;
  //   }
  // }



  //   if (httpsString[loadNumber]) {
  //     if (send[loadNumber] == false) {
  //       var li = httpsString[loadNumber];
  //       var link = "https://api.rethumb.com/v1/exif/all/" + li;
  //       print(link);
  //       send[loadNumber] = true;
  //       print("loading" + loadNumber);
  //       loadJSON(link, gotdata);




  //     });
  //   print("yes");
  // } else {
  //   if (GlobalData[loadNumber] != null && loadNumber < httpsString.length) {
  //     print("continue")
  //     loadNumber++;


  //   }
  // }
  // }



  translate(width / 2, height / 2);
  image(mapimg, 0, 0);
  imageMode(CENTER);
  //
  for (var j = 0; j < GlobalData.length; j++) {
    if (GlobalData[j]) {

      var lo = toDecimal(GlobalData[j].GPSLongitude);
      var la = toDecimal(GlobalData[j].GPSLatitude);

      lon = -lo;
      lat = la;
      var x = mercX(lon) - cx;
      var y = mercY(lat) - cy;

      fill(255, 0, 100);
      noStroke();
      // print(x);

      ellipse(x, y, 10, 10);
      var distance = dist(mouseX, mouseY, x + width / 2, y + height / 2);
      if (distance < 10) {
        
        strokeWeight(2);
        stroke(255);
        //       var img1=createImg('http://ift.tt/2F4UNAx',40,40);
        //       img1.position(x,y-40);
        var imgHeight = map(imgArr[j].height, 0, imgArr[j].height, 0, 60);
        var imgWidth = imgArr[0].width * imgHeight / imgArr[j].height;

        image(imgArr[j], x, y - 40, imgWidth, imgHeight);
      
      } 
    }
  }




}