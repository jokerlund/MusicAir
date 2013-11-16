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


var dshort = new Audio("dshort.mp3");

var noteA = new Audio("along.mp3");
var noteB = new Audio("blong.mp3");
var noteF = new Audio("fsharplong.mp3");
var noteD = new Audio("dlong.mp3");
var noteE = new Audio("elong.mp3");
var noteA2 = new Audio("a2.mp3");
var noteB2 = new Audio("b2.mp3");
var noteF2 = new Audio("fsharp2.mp3");
var noteD2 = new Audio("d2.mp3");
var noteE2 = new Audio("e2.mp3");




function draw(frame) {
    var a, b;

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
			if (position >= 0 && position < 100) {
				noteD.play();
				console.log("Playing Note D");
			}
			if (position >= 100 && position < 200) {
				noteE.play();
				console.log("Playing Note E");
			}
			if (position >= 200 && position < 300) {
				noteF.play();
				console.log("Playing Note F#");
			}
			if (position >= 300 && position < 400) {
				noteA.play();
				console.log("Playing Note A");
			}
			if (position >= 400 && position < 500) {
				noteB.play();
				console.log("Playing Note B");
			}
			if (position >= 500 && position < 600) noteD2.play();
			if (position >= 600 && position < 700) noteE2.play();
			if (position >= 700 && position < 800) noteF2.play();
			if (position >= 800 && position < 900) noteA2.play();
			if (position >= 900 && position <= 1000) noteB2.play();
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
