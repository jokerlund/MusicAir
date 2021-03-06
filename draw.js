/* MusicAir
Irene Kwok, Charlene Lee, Johanna Okerlund, Yuki Zhu
CS320 Tangible User Interfaces fall 2013
Wellesley College

Must have working leap motion controller connected to computer
to run this application

this class controls the sounds and displays 
based on data from each frame from the leap motion controller */

// auto full screen video
// play tutorial at beginning
var elem = document.getElementById("introvideo");
elem.play();
/* do this if you just want the video to disappear instead of fadeout
*/
elem.addEventListener('ended', function() {
   $("#introvideo").fadeOut();
}, false);


// Setup Leap loop with frame callback function
var controllerOptions = { enableGestures: true },
    //width = 1000,
    //height = 1000,
	width = window.innerWidth,
	height = window.innerHeight,
    canvas = d3.select('div#container')
        .append('canvas')
        .attr('width', width)
        .attr('height', height).node(),
    ctx = canvas.getContext('2d'),
    before = {},
    after = {};

	//this randomly assigns a color to each line (in milestone 1)
    //color = d3.scale.category20c(); 

ctx.translate(width/2, .75*height);


//variables corresponding to different notes
var noteD = new Audio("dlong.mp3");
var noteE = new Audio("elong.mp3");
var noteF = new Audio("fsharplong.mp3");
var noteA = new Audio("along.mp3");
var noteB = new Audio("blong.mp3");
var noteD2 = new Audio("d2long.mp3");
var noteE2 = new Audio("e2long.mp3");
var noteF2 = new Audio("fsharp2long.mp3");
var noteA2 = new Audio("a2long.mp3");
var noteB2 = new Audio("b2long.mp3");
var noteD3 = new Audio("d3long.mp3");
var noteE3 = new Audio("e3long.mp3");
var noteF3 = new Audio("fsharp3long.mp3");
var noteA3 = new Audio("a3long.mp3");
var noteB3 = new Audio("b3long.mp3");



var interval = 50; //number of pixels each note interval is

// set volume of note to be played based on gesture's depth into the 
// leap motion field of view
function setVolume(note, distance){
	if (distance >= .5){
		note.volume = 1;
	} else if (distance < .5 && distance > -.5){
		note.volume = .5;
	} else if (distance <= -.5){
		note.volume = .1;
	}
}

// play note corresponding to given height of gesture
function playNote(position, distance){
	if (position >= 0 && position < interval) {
				setVolume(noteD, distance);
				noteD.play();
				//console.log("Playing Note D");
			}
			else if (position >= interval && position < 2 *interval) {
				setVolume(noteE, distance);
				noteE.play();
				//console.log("Playing Note E");
			}
			else if (position >= 2*interval && position < 3*interval) {
				setVolume(noteF, distance);
				noteF.play();
				//console.log("Playing Note F#");
			}
			else if (position >= 3*interval && position < 4*interval) {
				setVolume(noteA, distance);
				noteA.play();
				//console.log("Playing Note A");
			}
			else if (position >= 4*interval && position < 5*interval) {
				setVolume(noteB, distance);
				noteB.play();
				//console.log("Playing Note B");
			}
			else if (position >= 5*interval && position < 6*interval) {
				setVolume(noteD2, distance);
				noteD2.play();
			}
			else if (position >= 6*interval && position < 7*interval) {
				setVolume(noteE2, distance);
				noteE2.play();
			}
			else if (position >= 7*interval && position < 8*interval) {
				setVolume(noteF2, distance);
				noteF2.play();
			}
			else if (position >= 8*interval && position < 9*interval){
				setVolume(noteA2, distance);
				noteA2.play();
			}
			else if (position >= 9*interval && position <= 10*interval){
				setVolume(noteB2, distance);
				noteB2.play();
			}
			
			else if (position >= 11*interval && position < 12*interval){
				setVolume(noteD3, distance);
				noteD3.play();
			}
			else if (position >= 12*interval && position < 13*interval){
				setVolume(noteE3, distance);
				noteE3.play();
			}
			else if (position >= 13*interval && position < 14*interval){
				setVolume(noteF3, distance);
				noteF3.play();
			}
			else if (position >= 14*interval && position < 15*interval){
				setVolume(noteA3, distance);
				noteA3.play();
			}
			else if (position >= 15*interval && position <= 16*interval){
				setVolume(noteB3, distance);
				noteB3.play();
			}
	}


// size of min and max bubbles
bminSize = 0;
bmaxSize = 15;

// Each line is drawn of multiple circles. 
// Each circle calls a series of delayed functions that make it fade
bubbledraw = function(context, distance, x, y){
	var grad= ctx.createLinearGradient(0, -500, 0, 0);
		grad.addColorStop(0, 'red');
    	grad.addColorStop(1/6, 'orange');
    	grad.addColorStop(2/6, 'yellow');
    	grad.addColorStop(3/6, 'green');
    	grad.addColorStop(4/6, 'aqua');
    	grad.addColorStop(5/6, 'blue');
    	grad.addColorStop(1, 'purple');
	
	context.fillStyle=grad;
	var endSize = (1 - distance)*(bmaxSize - bminSize) + bminSize;

	context.beginPath();
	context.arc(x, y, endSize, 0, 2 * Math.PI, false);
	context.fill();
	
	setTimeout(function(){bubbleFade(context, distance, x, y)}, 1000); 
};


// different fade functions draw bubbles of increasing transparency
// to create the effect of gradual fading
// fade function 1 
bubbleFade = function(context, distance, x, y){
	
	context.fillStyle="rgba(0,0,0,0.1)";
	var endSize = (1 - distance)*(bmaxSize - bminSize) + bminSize;

	context.beginPath();
	context.arc(x, y, endSize, 0, 2 * Math.PI, false);
	context.fill();
	setTimeout(function(){bubbleFade2(context, distance, x, y)}, 70);
};

// fade function 2
bubbleFade2 = function(context, distance, x, y){
	
	context.fillStyle="rgba(0,0,0,.5)";
	var endSize = (1 - distance)*(bmaxSize - bminSize) + bminSize;

	context.beginPath();
	context.arc(x, y, endSize, 0, 2 * Math.PI, false);
	context.fill();
	setTimeout(function(){bubbleFade3(context, distance, x, y)}, 70);
};

// fade function 3
bubbleFade3 = function(context, distance, x, y){
	
	context.fillStyle="rgba(0,0,0,.8)";
	var endSize = (1 - distance)*(bmaxSize - bminSize) + bminSize;

	context.beginPath();
	context.arc(x, y, endSize, 0, 2 * Math.PI, false);
	context.fill();
	setTimeout(function(){bubbleFade4(context, distance, x, y)}, 70);
};

// fade function 4
bubbleFade4 = function(context, distance, x, y){
	
	context.fillStyle="rgba(0,0,0,1)";
	var endSize = (1 - distance)*(bmaxSize - bminSize) + bminSize;

	context.beginPath();
	context.arc(x, y, endSize, 0, 2 * Math.PI, false);
	context.fill();
	
};

// This is called for every new frame of data recieved from Leap motion
function draw(frame) {
	
	//gradient colors that corresponds to height
	var grad= ctx.createLinearGradient(0, -500, 0, 0);
		grad.addColorStop(0, 'red');
    	grad.addColorStop(1/6, 'orange');
    	grad.addColorStop(2/6, 'yellow');
    	grad.addColorStop(3/6, 'green');
    	grad.addColorStop(4/6, 'aqua');
    	grad.addColorStop(5/6, 'blue');
    	grad.addColorStop(1, 'purple');
	
    var a, b;
    for (var id in after) {

        b = before[id], //before and after are hashes of ids and frame pointables (?) only ever contains one pointable though
        a = after[id];
        if (!b) continue;
		currentX = a.tipPosition.x;
		currentY = a.tipPosition.y;
		currentZ = a.touchDistance; 
		
		var gestures = frame.gestures;
		
		//process an array of gestures received from Leap Motion
		if (gestures.length > 0) {
			for (var i = 0; i < gestures.length; i++) {
            	var gesture = gestures[i];
				console.log("TYPE: " + gesture.type);
				// behavior for screen tap or key tap - play one note; display picture
				if (gesture.type == "screenTap"||gesture.type == "keyTap"){
					console.log("TAP: " + currentY);
					ctx.beginPath();
					var star = new Image();
					if (currentY >= 0 && currentY <100) star.src = "purple.gif";
					if (currentY >= 100 && currentY <200) star.src = "aqua.gif";
					if (currentY >= 200 && currentY <300) star.src = "green.gif";
					if (currentY >= 300 && currentY <400) star.src = "yellow.gif";
					if (currentY >= 400 && currentY <500) star.src = "orange.gif";
					if (currentY >= 500 && currentY <600) star.src = "pink.gif";
					
					//attempt at rotating - abandoned this approach
					//because we have to rotate canvas - messes up coordinates	
									
					//var degree = Math.floor(Math.random()*180);
					//ctx.rotate(degree*Math.PI/180);
					
					star.onload = function() {
					    ctx.drawImage(star, currentX, -currentY);
					}
					ctx.stroke();
					playNote(currentY);
					
					//have to make local copies of currentX,Y because these variables are defined outside the for loop
					var localCurX = currentX;
					var localCurY = currentY;
					//console.log("run!");
					
					//fading function - draws a black image on top of every star
					setTimeout(function(){
						var black = new Image();
						ctx.beginPath();
						
						black.src = "black-1.gif";
						black.onload = function() {
							ctx.drawImage(black, localCurX, -localCurY);
						}
						//console.log("clear image");
						ctx.stroke();
					}, 1000);
					
					}
				// behavior for swipe- draw circle, play note(s), fade out. 
				else if (gesture.type == "swipe" || gesture.type =="circle"){ //swipe gesture 
					//drawLine(b.tipPosition.x, -b.tipPosition.y, currentX, -currentY);
	
					//console.log(1/currentZ);
					bubbledraw(ctx, currentZ, currentX*2, -currentY*2);
					
					position = currentY;
					playNote(position, currentZ);				 
				}
			}
			console.log(gesture);
    	}
	}
    before = after;
}

// not using this- was using to draw boxy line rather than dynamic circles. 
function drawLine(x1,y1,x2,y2){ //old, old, new, new
   console.log("DRAW LINE *****");
   var grad= ctx.createLinearGradient(0, -500, 0, 0);
		grad.addColorStop(0, 'red');
    	grad.addColorStop(1/6, 'orange');
    	grad.addColorStop(2/6, 'yellow');
    	grad.addColorStop(3/6, 'green');
    	grad.addColorStop(4/6, 'aqua');
    	grad.addColorStop(5/6, 'blue');
    	grad.addColorStop(1, 'purple');

	ctx.strokeStyle = grad;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineWidth = 5;
	ctx.stroke();

	setTimeout(function(){blackLine(x1,y1,x2,y2)}, 2000);
}

//fading lines - not using this
function blackLine(x1,y1,x2,y2){
	var grad= ctx.createLinearGradient(0, -500, 0, 0);
	grad.addColorStop(0, 'black');
	ctx.strokeStyle = grad;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineWidth = 7;
	ctx.stroke();
}


// loop function- gets frame data from leap motion. 
Leap.loop(controllerOptions, function(frame, done) {
    after = {};
	
    for (var i = 0; i < frame.pointables.length; i++) {	
        after[frame.pointables[i].id] = frame.pointables[i];
    }
    draw(frame);
    done();
});
