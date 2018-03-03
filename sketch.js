       var imgWidth=img.width*imgHeight/img.height;
// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc

var mapimg;
var img;
var clat = 40.4144781;
var clon = -79.9783304;
var myDiv0, myDiv1;
var ww = 1024;
var hh = 1024;
var l1, l2;
var zoom = 10.9;
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


function preload() {
  img = loadImage("img1.jpeg");
  table = loadTable('https://docs.google.com/spreadsheets/d/1lm1NtSv3NMnstnrst7WHbuRE-fSXPnDSDAMNKkp0pZM/edit?usp=sharing', 'csv', 'header');

  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
  // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('restaurants.csv');

  Tabletop.init({
    key: '1lm1NtSv3NMnstnrst7WHbuRE-fSXPnDSDAMNKkp0pZM',
    callback: gotData,
    simpleSheet: true
  });

  // var tt= createImg('drive.google.com/uc?id=1-wUu599XyMtKsGqT2PxLTIODGRVD86Uv&export=download');
  // tt.id("yes");

  // print(l1);
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

  var ii = 1;
  while (table.getString(ii, 0).length > 50) {

    var newHttps = join(splitTokens(trim(table.getString(ii, 0)), ' '), '');

    httpsString[ii - 1] = newHttps;
    print(newHttps);
    ii++;
  }


  for (var j = 0; j < total; j++) {
    // print(httpsString[j]);
    var t="img" + j+".jpeg";
    img[j] = createImg(t);
    // // img[1].id("yes");
    var id="img" + j;
    img[j].id(id);


  }
  
  // var img3= createImage("image.jpeg");  






  cx = mercX(clon);
  cy = mercY(clat);



  for (var k = 0; k < total; k++) {
    var tt="img"+k;
    print(tt);
    
    
    var img2 = document.getElementById(tt);
    
    EXIF.getData( img2, function() {
      var make = EXIF.getTag(this, "GPSLongitude"),
        model = EXIF.getTag(this, "GPSLatitude");
      var l1 = toDecimal(make);
      var l2 = toDecimal(model);
      myLon[k] = createDiv(l1);
      myLa[k] = createDiv(l2);
      myLon[k].id('lo');
      myLa[k].id('la');
      print(tt);
    });
   
    
    
  }
  
    var toDecimal = function(number) {
      return number[0].numerator + number[1].numerator /
        (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    };

  // print(data);

  //   while (table.getString(ii, 0).length > 50) {
  //     var newHttps = join(splitTokens(trim(table.getString(ii, 0)), ' '), '');
  //     httpsString[ii - 1] = newHttps;
  //     ii++;
  // //    break;
  //   }

  // for (var j = 0; j < httpsString.length; j++) {
  //   // print(httpsString[j]);
  //   imgArr[j] = createImg(httpsString[j]);
  // }


  // EXIF.getData(document.getElementById("img1"), function() {
  //   var make = EXIF.getTag(this, "GPSLongitude"),
  //     model = EXIF.getTag(this, "GPSLatitude");
  //   var l1 = toDecimal(make);
  //   var l2 = toDecimal(model);
  //   myDiv[k] = createDiv(l1);
  //   myDiv[k].id("longtitude");
  //   myDiv[k] = createDiv(l2);
  //   myDiv[k].id("latitude");
  // });
}






function gotData(stuff, tabletop) {
  data = stuff;
}

function draw() {
  translate(width / 2, height / 2);
  image(mapimg, 0, 0);
  imageMode(CENTER);

 var la = document.getElementById('la').innerHTML;
 var lo = document.getElementById('lo').innerHTML;
 print(la);
  for (var i = 0; i < total; i++) {
    var yy="la" + i;
    
    // 
   
    //    text(la+" "+lo,0,0);
    lon = -lo;
    lat = la;
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    fill(255, 0, 100);
    // print(x);
    ellipse(x, y, 10, 10);
  }
  
  
  

  var distance = dist(mouseX, mouseY, x + width / 2, y + height / 2);
  if (distance < 50) {
    //       var img1=createImg('http://ift.tt/2F4UNAx',40,40);
    //       img1.position(x,y-40);
    var imgHeight = map(img.height, 0, img.height, 0, 60);
    var imgWidth = img.width * imgHeight / img.height;
    image(img, x, y - 40, imgWidth, imgHeight);
    strokeWeight(2);
    stroke(255);
    noStroke();
  }



// for (var j = 0; j < img.length; j++) {
//   // print(httpsString[j]);

//   if (img[j] != null) {
//     img[j].hide;
//     image(img[j], 100 * j, 0, 100, 100);
//   }
// }

}