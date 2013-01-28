WebVTT Transcript
=================

- Author: Ian Devlin [iandevlin.com](http://iandevlin.com)
- Twitter: [@iandevlin](http://twitter.com/iandevlin)

Purpose
=======

WebVTT Transcript will parse a WebVTT file allowing for its contents to be displayed on screen.

Acknowledgement
================

Most of the WebVTT file parsing code has been taken from [Playr](http://www.delphiki.com/html5/playr/) by [delphiki](https://github.com/delphiki).

Usage
=====

To load a WebVTT file, all you need to do is call `webvttTranscript(file, displayElement);` where `file` is the path to the WebVTT file and `displayElement` is where the transcript contents are to be displayed.
This is typically attached to a click event handler, for example, given the HTML:
```html
<a id="en" href="#">English</a>
<div id="transcript"></div>
```
The following JavaScript might be used:
```javascript
var display = document.getElementById('transcript');
document.getElementById("en").addEventListener("click", function(e) {
    e.stopPropagation();
    webvttTranscript('subtitles-en.vtt', display);
}, false);
```

Example
=======

You can view an online example at [WebVTT Transcript Example](http://iandevlin.com/webvtt-transcript/)
