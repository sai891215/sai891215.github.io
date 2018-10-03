var x,y, x1,y1,x2,y2,x3,y3,x4,y4,TargetX,TargetY,a,b;
var song;
var sun=[];




// function preload() {
//   song = loadSound('opening scene.mp3');
// }
function setup() {
  
  
 
  
  x=0;
  y=0;
  a=0;
  b=1;
  createCanvas(500,500);
  // background(0);
  for(var i=0;i<6;i++){
    sun[i]=createImg("images/suns/sun.png")
  }
  // song.loop();
}

function draw() {
  // song.play();
  // createCanvas(windowWidth, windowHeight);
  // background(0);
  
  TargetX= map(mouseX,0,width,10,0);
  TargetY= map(mouseY,0,height,10,0);
  
  x=x+(TargetX-x)*0.05;
  y+=(TargetY-y)*0.05;
 
  
  randomSeed(9);
  for(var i=0;i<6;i++){
    
    var size=random(150,300);
    nx=(noise(i+a)-.5)*260;
    ny=(noise(i+b)-.5)*260;
   
    sun[i].size(size,size);
    sun[i].position(random(100,windowWidth-100)+x+nx,random(50,windowHeight/2)+y+ny);
    sun[i].style('z-index', 0)
  }
  
  // var start=window.document.getElementById("start");
  // start.style('z-index', -1)
  // print(start);
  // image(x1,y1);
  // fill(255,0,29);
  // rect(100+x1,150+y1,400,400);
  // fill(200,80,127);
  // rect(150+x2,150+y2,300,300);
  // fill(20,180,127);
  // rect(300+x3,200+y3,200,200);
  // fill(20,280,17);
  // rect(150+x2,150+y2,300,300);
  // fill(20,180,127);
  // rect(300+x3,200+y3,200,200);
  // fill(20,280,17);
  // rect(400+x4,300+y4,100,100);
  // image(img1, 200+x4,300+y4);
  // rect(200+x4,300+y4,100,100);
  a+=0.002;
  b+=0.002;
  
  
  
 
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// function mousePressed() {
//   if ( song.isPlaying() ) { // .isPlaying() returns a boolean
//     song.stop();
//     background(255,0,0);
//   } else {
//     song.play();
//     background(0,255,0);
//   }
// }