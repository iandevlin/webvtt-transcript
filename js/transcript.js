/**
* webvttTranscript
*
* @author Ian Devlin <ian@iandevlin.com>
* http://twitter.com/iandevlin
* https://github.com/iandevlin/webvtt-transcript
*
* Version tag: v0.1.0
*/

var webvttTranscript = function(file, element) {

	// Loads the WebVTT file, parses it, builds the HTML and outputs it to the HTML element passed in
	var load = function(file, element) {
		var reqTrans = new XMLHttpRequest();
		reqTrans.open('GET', file);
		reqTrans.onreadystatechange = function() {
			if (reqTrans.readyState == 4 && (reqTrans.status == 200 || reqTrans.status == 0)) {
				var pattern = /^([0-9]+)$/;
				var patternTimecode = /^([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)$/;
				
				var content = reqTrans.responseText;
				var lines = content.split(/\r?\n/);
				var transcript = '';
				for (i = 0; i < lines.length; i++) {
					if (identifier = pattern.exec(lines[i])) {
						i++;
						var timecode = patternTimecode.exec(lines[i]);
						if (timecode && i < lines.length) {
							i++;
							var text = lines[i];
							i++;
							while (lines[i] != '' && i < lines.length) {
								text = text + '\n' + lines[i];
								i++;
							}
							var transText = '';
							var voices = getVoices(text);
							if (voices.length > 0) {
								for (var j = 0; j < voices.length; j++) {
									transText += voices[j].voice + ': ' + removeHTML(voices[j].text) + '<br />';
								}
							}
							else transText = removeHTML(text) + '<br />';
							transcript += transText;
						}
					}
				}
				element.innerHTML = transcript;
			}
		};
		reqTrans.send(null);
	}

	// Parses 'voices' in the text which are marked by <v>
	function getVoices(speech) {
		var voices = new Array();
		var pos = speech.indexOf('<v');
		while (pos != -1) {
			endVoice = speech.indexOf('>');
			var voice = speech.substring(pos + 2, endVoice).trim();
			var endSpeech = speech.indexOf('</v>');
			var text = speech.substring(endVoice + 1, endSpeech);
			voices.push({
				'voice': voice,
				'text': text
			});
			speech = speech.substring(endSpeech + 4);
			pos = speech.indexOf('<v');
		}
		return voices;
	}

	// Removes any HTML that might be embedded in the text
	function removeHTML(text) {
		var div = document.createElement('div');
		div.innerHTML = text;
		return div.textContent || div.innerText || '';
	}
	
	// Load the contents of 'file' into 'element'
	load(file, element);
}
