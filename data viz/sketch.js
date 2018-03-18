var send = [];
var mapimg;
var clat = 40.411053;
var clon = -79.941564;
var openImageLink;
var openImage;
var myDiv0, myDiv1;
var ww = 1024;
var hh = 1000;
var l1, l2;
var zoom = 14.5;
var cx, cy;
var table;
var imgArr = [];
var httpsString = [];
var total = 2;
var jsonData = [];
var GlobalData = [];
var loadNumber = 0;
var tabble2;
var jsonData;
var breath = 0;
var logo, twitter;

function preload() {


}

function gotData(stuff, tabletop) {
  data = stuff;

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
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw', GotImage);

  Tabletop.init({
    key: '1lm1NtSv3NMnstnrst7WHbuRE-fSXPnDSDAMNKkp0pZM',
    callback: gotData,
    simpleSheet: true
  });




  for (var i = 0; i < httpsString.length; i++) {
    if (httpsString[i]) {


      var li = httpsString[i];
      var link = "https://api.rethumb.com/v1/exif/all/" + li;
      GlobalData[i] = loadJSON(link);
    }
  }

  
  
  logo = loadImage("logo.png");
  twitter = loadImage("twitter.png");

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  translate(width / 2, height / 2);
  imageMode(CENTER);

  cx = mercX(clon);
  cy = mercY(clat);


}


this.gotdata = function(data) {
  // print("jasonLoading");
  GlobalData[loadNumber] = data.GPS;
  print(GlobalData[loadNumber]);

}

this.toDecimal = function(number) {
  var n1 = split(number[0], '/')[0];
  var n2 = split(number[1], '/')[0];
  var m3 = split(number[2], '/');
  var n3 = m3[0] / m3[1];

  return (float(n1) + float(n2) / (60) + float(n3) / (3600));
};


function gotData(stuff, tabletop) {
  jsonData = stuff;

  for (var j = 0; j < jsonData.length; j++) {
    httpsString[j] = join(splitTokens(jsonData[j]["Web"], ' '), '');
    // print(httpsString[j]);
    imgArr[j] = createImg(httpsString[j]);
    imgArr[j].class('image');
    imgArr[j].hide();
    send[j] = false;
    // print("img is added");
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function GotImage(mapping) {
  mapping = mapping;

}

function draw() {

  breath += 0.02;

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
      fill(254, 197, 20, 50);
      // fill(255, 0, 100,50);
      stroke(254, 197, 20);
      // stroke(255,0,100);
      ellipse(x, y, 25 + 10 * sin(breath), 25 + 10 * sin(breath));
      // fill(255, 0, 100);
      fill(254, 197, 30);
      ellipse(x, y, 10, 10);

      var distance = dist(mouseX, mouseY, x + width / 2, y + height / 2);
      if (distance < 20) {
        stroke(255, 0, 100);
        fill(255, 0, 100, 50);
        ellipse(x, y, 25 + 10 * sin(breath), 25 + 10 * sin(breath));
        // fill(255, 0, 100);
        fill(255, 0, 100);
        ellipse(x, y, 10, 10);
        // var img1=createImg('http://ift.tt/2F4UNAx',40,40);

        var imgHeight = map(imgArr[j].height, 0, imgArr[j].height, 0, 120);
        var imgWidth = imgArr[0].width * imgHeight / imgArr[j].height;


        fill(254, 197, 30);
        textSize(12);
        textStyle(NORMAL);
        stroke(254, 197, 30);
        line(x, y + 80, x, 10 + y);
        noStroke();

        text(GlobalData[j].GPSDateStamp.replace(':', '.'), x, y + 100);

        openImageLink = httpsString[j].replace('download', '');
        image(imgArr[j], x, y - 80, imgWidth, imgHeight);
      } else {
        openImageLink = null;
      }
    }
  }

  fill(254, 197, 80);

  // fill(255,);
  noStroke();
  textFont('Avenir');
  textSize(25);
  textAlign(LEFT);
  textStyle(BOLD);
  var textX = -ww / 2 + 30;
  // textStyle("text-decoration","underline");
  text("Data Visualization of Illegal Dumping in Hazelwood", textX, -height / 2 + 53);
  textSize(12);
  rect(textX, -height / 2 + 68, 350, 4);

  fill(254, 197, 80, 190);
  textStyle(NORMAL);
  text("'Data Visualization of Illegal Dumping in Hazelwood' is a project made by students from Carnegie Mellon University. The project is aimed to address the illegal dumping problems in Hazelwood by encouraging residents to upload to our email address (cleanhazelwood@gmail.com), then utilize the data to visualize where do illegal dumping happen the most, and call people for action.",
    textX, -height / 2 + 83, 350, 300);

  textStyle(BOLD);
  textSize(20);
  fill(254, 197, 80);
  textAlign(CENTER);
  text("Images We Got", 410, -height / 2 + 148);
  textSize(100);
  text(httpsString.length, 400, -height / 2 + 113);
  // image(logo,-ww/2+160,hh/2-90,280,28);
  // image(twitter,-ww/2+340,hh/2-90,35,30);
}

function mousePressed() {
  window.open(openImageLink);
}

function unHighLighted() {
  this.style('background-color', 'yellow');
}

function highLighted() {
  this.style("background-color", "yellow")
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}