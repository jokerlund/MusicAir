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





function draw(frame) {
    var a, b;
	
	interval = 50; //number of pixels each note interval is

    for (var id in after) {
        b = before[id],
        a = after[id];
        if (!b) continue;
		
		var grad= ctx.createLinearGradient(0, -500, 0, 0);
		grad.addColorStop(0, 'red');
    	grad.addColorStop(1/6, 'orange');
    	grad.addColorStop(2/6, 'yellow');
    	grad.addColorStop(3/6, 'green')
    	grad.addColorStop(4/6, 'aqua');
    	grad.addColorStop(5/6, 'blue');
    	grad.addColorStop(1, 'purple');
		
        ctx.strokeStyle = grad;	
		
        //ctx.strokeStyle = color(id);
        ctx.beginPath();
        ctx.moveTo(b.tipPosition.x, -b.tipPosition.y);
        ctx.lineTo(a.tipPosition.x, -a.tipPosition.y);
        
        console.log(-b.tipPosition.y);
        console.log(-a.tipPosition.y);
		position = a.tipPosition.y
        //console.log("Y " + position);
		//console.log("Frame # " + frame.id%100.0);
		if (frame.id%1.0 == 0) {
			if (position >= 0 && position < interval) {
				noteD.play();
				console.log("Playing Note D");
			}
			if (position >= interval && position < 2 *interval) {
				noteE.play();
				console.log("Playing Note E");
			}
			if (position >= 2*interval && position < 3*interval) {
				noteF.play();
				console.log("Playing Note F#");
			}
			if (position >= 3*interval && position < 4*interval) {
				noteA.play();
				console.log("Playing Note A");
			}
			if (position >= 4*interval && position < 5*interval) {
				noteB.play();
				console.log("Playing Note B");
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
        	             
        ctx.stroke();
        
    }

    before = after;
}


Leap.loop(controllerOptions, function(frame, done) {
    after = {};
    for (var i = 0; i < frame.pointables.length; i++) {
        after[frame.pointables[i].id] = frame.pointables[i];
    }
    draw(frame);
    done();
});
