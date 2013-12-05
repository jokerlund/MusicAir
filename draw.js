// Setup Leap loop with frame callback function
var controllerOptions = { enableGestures: true },
    width = 1000,
    height = 1000,
    canvas = d3.select('div#container')
        .append('canvas')
        .attr('width', width)
        .attr('height', height).node(),
    ctx = canvas.getContext('2d'),
    before = {},
    after = {};


    //color = d3.scale.category20c();



//ctx.lineWidth = 5;
ctx.translate(width/2, height/2);


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

function playNote(position){
	if (position >= 0 && position < interval) {
				noteD.play();
				//console.log("Playing Note D");
			}
			if (position >= interval && position < 2 *interval) {
				noteE.play();
				//console.log("Playing Note E");
			}
			if (position >= 2*interval && position < 3*interval) {
				noteF.play();
				//console.log("Playing Note F#");
			}
			if (position >= 3*interval && position < 4*interval) {
				noteA.play();
				//console.log("Playing Note A");
			}
			if (position >= 4*interval && position < 5*interval) {
				noteB.play();
				//console.log("Playing Note B");
			}
			if (position >= 5*interval && position < 6*interval) noteD2.play();
			if (position >= 6*interval && position < 7*interval) noteE2.play();
			if (position >= 7*interval && position < 8*interval) noteF2.play();
			if (position >= 8*interval && position < 9*interval) noteA2.play();
			if (position >= 9*interval && position <= 10*interval) noteB2.play();
			
			if (position >= 11*interval && position < 12*interval) noteD3.play();
			if (position >= 12*interval && position < 13*interval) noteE3.play();
			if (position >= 13*interval && position < 14*interval) noteF3.play();
			if (position >= 14*interval && position < 15*interval) noteA3.play();
			if (position >= 15*interval && position <= 16*interval) noteB3.play();
		
	
}

bminSize = 0;
bmaxSize = 15;

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
	
	var boundary = [x-endSize, x+endSize, y-endSize, y+endSize];
	
	return [boundary];
};

function draw(frame) {
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
		//var star = new Image();
		//star.src = "orange.gif";
		
		if (gestures.length > 0) {
			for (var i = 0; i < gestures.length; i++) {
            	var gesture = gestures[i];
				console.log("TYPE: " + gesture.type);
				if (gesture.type == "screenTap"){
					console.log("SCREEN TAP: " + currentY);
					ctx.beginPath();
					//ctx.arc(currentX,-currentY,8,0,2*Math.PI);
					var star = new Image();
					if (currentY >= 0 && currentY <100) star.src = "purple.gif";
					if (currentY >= 100 && currentY <200) star.src = "aqua.gif";
					if (currentY >= 200 && currentY <300) star.src = "green.gif";
					if (currentY >= 300 && currentY <400) star.src = "yellow.gif";
					if (currentY >= 400 && currentY <500) star.src = "orange.gif";
					if (currentY >= 500 && currentY <600) star.src = "pink.gif";
					ctx.drawImage(star, currentX, -currentY);
					
					ctx.stroke();
					playNote(currentY);
					
					//redrawing a black image on top of the stars
					//but for some reason this does not cover all the stars :(
					setTimeout(function(){
					ctx.beginPath();
					star.src = "black.gif";
					ctx.drawImage(star,currentX,-currentY);
					console.log("clear image");
					ctx.stroke();
					}, 2000);
										
					//setTimeout(function(){clearImg(ctx, currentX,currentY)}, 1000);
				}
				else if (gesture.type == "swipe"){ //swipe gesture 
					//drawLine(b.tipPosition.x, -b.tipPosition.y, currentX, -currentY);
	
					//console.log(1/currentZ);
					bubbledraw(ctx, currentZ, currentX, -currentY);
					
					position = currentY;
					playNote(position);				 
				}
			}
			console.log(gesture);
    	}
	}
    before = after;
}


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




Leap.loop(controllerOptions, function(frame, done) {
    after = {};
	
    for (var i = 0; i < frame.pointables.length; i++) {	
        after[frame.pointables[i].id] = frame.pointables[i];
    }
    draw(frame);
    done();
});
