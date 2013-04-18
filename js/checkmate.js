// checkmate

var popcorn;
var textCues;
var video_url = "http://www.youtube.com/watch?v=xUY2_w89_4k"; // checkmate video on youtube
var startOffset = 15.6;

$(document).ready(function() {
	$.getJSON('data/textCues.json', function(data) {
		textCues = data.textCues;
		initPopcorn();
	});
});

var initPopcorn = function() {

	popcorn = Popcorn.youtube('#video', video_url );

	// updates the timestamp with video location
	popcorn.on("timeupdate", function() {
		$('#currentTime').val( this.currentTime() );
	});

	// create cues from textcues generated from PopcornMaker
	for ( var i = 0; i < textCues.length; i++) {

		// assign custom cue function per text element
		var cueFunction = (function(key) {
			return function () {
				$('#temp').text( textCues[key].text );
			 };
		})(i);

		// offset start of cues
		popcorn.cue( eval(textCues[i].start + startOffset), cueFunction);
	}

	// start playing at 16 seconds in
	popcorn.cue( 0.0, function() {
		this.play( startOffset );
	});

	popcorn.play();
};


// var CHECKMATE = {



// };
