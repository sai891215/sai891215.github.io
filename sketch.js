    ellipse(x,y,10,10);
    image(img,width/2,height/2);
    var distance = dist(mouseX, mouseY,x+width / 2, y+height / 2); 
    if(distance < 50)
    {  
//       var img1=createImg('http://ift.tt/2F4UNAx',40,40);
//       img1.position(x,y-40);
       var imgHeight=map(img.height,0,img.height,0,60);
       var imgWidth=img.width*imgHeight/img.height;
       image(img,x,y-40,imgWidth,imgHeight);
        strokeWeight(2);
        stroke(255);
    } else{
         noStroke();
    }
    
}


