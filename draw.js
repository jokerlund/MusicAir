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
    after = {},
	lFade = new Date(),
    lBox = new Date(),
    lClear = new Date();


    //color = d3.scale.category20c();



ctx.lineWidth = 5;
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


var minSize = 0;
var maxSize = 10;
var id = 0;

start = function(context, anchor){

	var size = (1 - anchor.distance)*(this.maxSize - this.minSize) + this.minSize;
	
	context.beginPath();
	context.arc(anchor.x, anchor.y, size, 0, 2 * Math.PI, false);
	context.fill();
	
	return [anchor.x-size, anchor.x+size, anchor.y-size, anchor.y+size];
}

//drawNice = function(context, startAnchor, endAnchor){
drawNice = function(context, x1,y1, x2,y2, dis1, dir1, vel1, dis2, dir2, vel2){
	context.strokeStyle="#FF0000";
	console.log("DistanceBrush.draw");
	console.log(context);
	//console.log(startAnchor);
	//console.log(endAnchor);
	var startSize = (1 - dis1)*(maxSize - minSize) + minSize;
	var endSize = (1 - dis2)*(maxSize - minSize) + minSize;
	
	var startVector = new Leap.Vector([x1, y1, 0]);
	var endVector = new Leap.Vector([x2, y2, 0]);
	
	var line = endVector.minus(startVector);
	var ortho = new Leap.Vector([line.y, -line.x, 0]);
	ortho = ortho.normalized();
	var startOrtho = ortho.multiply(startSize);
	ortho = ortho.multiply(endSize);
	
	var start = endVector.plus(ortho);
	context.beginPath();
	
	var pos = start;
	context.moveTo(pos.x, pos.y);
	
	pos = endVector.minus(ortho);
	context.lineTo(pos.x, pos.y);
	
	pos = startVector.minus(startOrtho);
	context.lineTo(pos.x, pos.y);
	
	pos = startVector.plus(startOrtho);
	context.lineTo(pos.x, pos.y);
	
	pos = start;
	context.lineTo(pos.x, pos.y);
	
	context.fill();
	
	context.beginPath();
	context.arc(endVector.x, endVector.y, endSize, 0, 2 * Math.PI, false);
	context.fill();
	
	var boundary1 = [x1-startSize, x1+startSize, y1-startSize, y1+startSize];
	var boundary2 = [x2-endSize, x2+endSize, y2-endSize, y2+endSize];
	
	return [boundary1, boundary2];
	
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
	console.log("FRAME " + frame);
    for (var id in after) {

        b = before[id], //before and after are hashes of ids and frame pointables (?) only ever contains one pointable though
        a = after[id];
        if (!b) continue;
		currentX = a.tipPosition.x;
		currentY = a.tipPosition.y;
		
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
				
					drawLine(b.tipPosition.x, -b.tipPosition.y, currentX, -currentY);
					//drawNice(ctx, b.tipPosition.x, b.tipPosition.y, currentX, currentY, 1, gesture.direction, gesture.speed, 1, gesture.direction, gesture.speed);
					//start(ctx,
					//SwipeGesture sg = SwipeGesture(gesture);
					console.log("SPEED " + gesture.speed);
					console.log("DIR " + gesture.direction);
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
		console.log("pointables " + frame.pointables[i]);
    }
    draw(frame);
    done();
});
