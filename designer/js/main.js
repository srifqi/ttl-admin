/**
Pendesain Pos Soal Team Tanpa Les Indonesia
Copyright (C) 2018 Pengelola Grup Team Tanpa Les Indonesia
Copyright (C) 2018 srifqi, Muhammad Rifqi Priyo Susanto
		<muhammadrifqipriyosusanto@gmail.com>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation; either version 2.1 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

var $ = (a) => document.getElementById(a);

const CW = 512;
const CH = 512;

const datamapel = [
	// nama,				font,  warna 1,      warna 2
	["Campuran",			64, "#000000", 1, "#000000", 1],
	["Bahasa Indonesia",	64, "#2196F3", 0, "#1976D2", 1],
	["Bahasa Inggris",		64, "#009688", 1, "#00796B", 1],
	["Matematika",			56, "#4CAF50", 0, "#388E3C", 1],
	["Fisika",				96, "#FFEB3B", 0, "#FBC02D", 0],
	["Kimia",				96, "#FF5722", 0, "#E64A19", 1],
	["Biologi",				84, "#607D8B", 1, "#455A64", 1],
	["SOSHUM Terpadu",		72, "#3F51B5", 1, "#303F9F", 1]
];

var rawimagename = [
	""
];

// inisialisasi
window.addEventListener("load", () => {
	for (let i = 0; i < datamapel.length; i ++) {
		let optionel = document.createElement("option");
		optionel.value = i;
		optionel.innerText = datamapel[i][0];
		$("mapel").appendChild(optionel);
	}
});

// mulai gambar
function render() {
	var mapel = $("mapel").value;
	$("cheader").style.background = datamapel[mapel][2];
	$("cheader").style.color = datamapel[mapel][3] === 1 ? "white" : "black";
	$("cname").innerText = datamapel[mapel][0];
	$("ctype").innerText = $("jenis1").checked === true ? "SOAL" : "PEMBAHASAN";
	$("cdate").innerText = $("tanggal").value.split("-").reverse().join("/");
	$("cid").innerText = $("judul").value;
	//$("ctext").innerText = $("naskah").value;
	Preview.Update();
}

/*window.addEventListener("keyup", function(ev) {
	console.log(ev.keyCode);
});*/

// ekspor gambar
var _exporting = 0;
function _export1() {
	_exporting = 1;
	$("editbar").style.display = "none";
	$("exporttext1").style.display = "";
	$("greenmarker").style.background = "#00ff00";
	if (pasteCatcher) pasteCatcher.style.display = "";
}
window.addEventListener("keyup", function(ev) {
	if (_exporting === 1) {
		if (ev.keyCode === 44) { // PrtSc
			_export2();
		}
	}
});

function _export2() {
	_exporting = 2;
	$("exporttext1").style.display = "none";
	$("exporttext2").style.display = "";
	$("editmode").style.display = "none";
	$("cutmode").style.display = "";
	$("greenmarker").style.background = "transparent";
	pasteCatcherFocus();
}

var _export4x, _export4y;
function _export3() {
	_exporting = 3;
	$("exporttext2").style.display = "none";
	$("exporttext3").style.display = "";
}
window.addEventListener("click", function(ev) {
	if (_exporting === 3) {
		var c = $("cuttingcanvas");
		var a = c.getContext("2d");
		_export4x = ev.pageX - c.offsetLeft;
		_export4y = ev.pageY - c.offsetTop;
		var color = a.getImageData(_export4x, _export4y, 1, 1);
		if (color.data[0] === 0 && color.data[1] === 255 &&
				color.data[2] === 0 && color.data[3] === 255) {
			_export4();
		} else {
			alert("Itu bukan kotak hijau yang dimaksud!");
		}
	}
});

function _export4() {
	_exporting = 4;
	// coba turun sampai pinggir bawah kotak hijau,
	// lalu geser ke kanan sampai pojok kanan bawah kotak hijau
	/* posisi akhir tanda
	 * +---+---+---+
	 * | H | H | A |
	 * +---+---+---+    H = hijau
	 * | H |<H>| A |    A = abu-abu
	 * +---+---+---+    P = putih (pos)
	 * | A | A | P |
	 * +---+---+---+
	 */
	var c = $("cuttingcanvas");
	var a = c.getContext("2d");
	var imgData = a.getImageData(0, 0, 512, 512);
	var colors = imgData.data;
	for (let i = 0; _export4y < 512; _export4y ++) {
		console.log("y");
		i = ((_export4y + 1) * 512 + _export4x) * 4;
		//console.log(colors[i], colors[i+1], colors[i+2], colors[i+3]);
		if (colors[i] === 0 && colors[i + 1] === 255 &&
				colors[i + 2] === 0 && colors[i + 3] === 255) {
			continue;
		} else {
			break;
		}
	}
	for (let i = 0; _export4x < 512; _export4x ++) {
		console.log("x");
		i = (_export4y * 512 + _export4x + 1) * 4;
		//console.log(colors[i], colors[i+1], colors[i+2], colors[i+3]);
		if (colors[i] === 0 && colors[i + 1] === 255 &&
				colors[i + 2] === 0 && colors[i + 3] === 255) {
			continue;
		} else {
			break;
		}
	}
	// geser sampai ke piksel pojok kiri atas pos
	_export4x ++; _export4y ++;

	// potong gambar
	a.drawImage(pastedImage, -_export4x, -_export4y);

	// selesai!
	$("exporttext3").style.display = "none";
	$("exporttext4").style.display = "";
}

function _export5() {
	_exporting = 5;
	$("exporttext4").style.display = "none";
	$("editbar").style.display = "";
	$("cutmode").style.display = "none";
	$("editmode").style.display = "";
}

// tanya letak kotak untuk memotong gambar
function askGreenBox() {
	var c = $("cuttingcanvas");
	var a = c.getContext("2d");
	a.drawImage(pastedImage, 0, 0);
	_export3();
}

// ------- ------- ------- //

// Kode bersumber dari MathJax.

var Preview;

function initMathJax() {

Preview = {
  delay: 1,          // delay after keystroke before updating
  preview: null,     // filled in by Init below
  buffer: null,      // filled in by Init below
  timeout: null,     // store setTimout id
  mjRunning: false,  // true when MathJax is processing
  mjPending: false,  // true when a typeset has been queued
  oldText: null,     // used to check if an update is needed
  //
  //  Get the preview and buffer DIV's
  //
  Init: function () {
    this.preview = $("ctext");
    this.buffer = $("ctextbuffer");
  },
  //
  //  Switch the buffer and preview, and display the right one.
  //  (We use visibility:hidden rather than display:none since
  //  the results of running MathJax are more accurate that way.)
  //
  SwapBuffers: function () {
    var buffer = this.preview, preview = this.buffer;
    this.buffer = buffer; this.preview = preview;
    buffer.style.visibility = "hidden"; buffer.style.position = "absolute";
    preview.style.position = ""; preview.style.visibility = "";
  },
  //
  //  This gets called when a key is pressed in the textarea.
  //  We check if there is already a pending update and clear it if so.
  //  Then set up an update to occur after a small delay (so if more keys
  //    are pressed, the update won't occur until after there has been 
  //    a pause in the typing).
  //  The callback function is set up below, after the Preview object is set up.
  //
  Update: function () {
    if (this.timeout) {clearTimeout(this.timeout)}
    this.timeout = setTimeout(this.callback,this.delay);
  },
  //
  //  Creates the preview and runs MathJax on it.
  //  If MathJax is already trying to render the code, return
  //  If the text hasn't changed, return
  //  Otherwise, indicate that MathJax is running, and start the
  //    typesetting.  After it is done, call PreviewDone.
  //  
  CreatePreview: function () {
    Preview.timeout = null;
    if (this.mjPending) return;
    var text = $("naskah").value;
    if (text === this.oldtext) return;
    if (this.mjRunning) {
      this.mjPending = true;
      MathJax.Hub.Queue(["CreatePreview",this]);
    } else {
      this.buffer.innerHTML = this.oldtext = text;
      this.mjRunning = true;
      MathJax.Hub.Queue(
	["Typeset",MathJax.Hub,this.buffer],
	["PreviewDone",this]
      );
    }
  },
  //
  //  Indicate that MathJax is no longer running,
  //  and swap the buffers to show the results.
  //
  PreviewDone: function () {
    this.mjRunning = this.mjPending = false;
    this.SwapBuffers();
  }
};
//
//  Cache a callback to the CreatePreview action
//
Preview.callback = MathJax.Callback(["CreatePreview",Preview]);
Preview.callback.autoReset = true;  // make sure it can run more than once

Preview.Init();

$("loadingmsg").style.display = "none";

}

// ------- ------- ------- //

// Kode bersumber dari blog:
// http://joelb.me/blog/2011/code-snippet-accessing-clipboard-images-with-javascript/

// We start by checking if the browser supports the 
// Clipboard object. If not, we need to create a 
// contenteditable element that catches all pasted data 
var pasteCatcher;
window.addEventListener("load", function() {
	if (!window.Clipboard) {
	   pasteCatcher = document.createElement("div");
		
	   // Firefox allows images to be pasted into contenteditable elements
	   pasteCatcher.setAttribute("contenteditable", "");
		
	   // We can hide the element and append it to the body,
	   pasteCatcher.style.cursor = "default";
	   pasteCatcher.style.opacity = 0;
	   document.body.appendChild(pasteCatcher);
	}
	// Add the paste event listener
	window.addEventListener("paste", pasteHandler);
});

// Refocus
function pasteCatcherFocus() {
	// ... as long as we make sure it is always in focus
   if (pasteCatcher) pasteCatcher.focus();
   //document.addEventListener("click", function() { pasteCatcher.focus(); });
}
 
/* Handle paste events */
function pasteHandler(e) {
   if (_exporting !== 2) return false;
   // We need to check if event.clipboardData is supported (Chrome)
   if (e.clipboardData) {
      // Get the items from the clipboard
      var items = e.clipboardData.items;
      if (items) {
         // Loop through all items, looking for any kind of image
         for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
               // We need to represent the image as a file,
               var blob = items[i].getAsFile();
               // and use a URL or webkitURL (whichever is available to the browser)
               // to create a temporary URL to the object
               var URLObj = window.URL || window.webkitURL;
               var source = URLObj.createObjectURL(blob);
                
               // The URL can then be used as the source of an image
               createImage(source);
            }
         }
      }
   // If we can't handle clipboard data directly (Firefox), 
   // we need to read what was pasted from the contenteditable element
   } else {
      // This is a cheap trick to make sure we read the data
      // AFTER it has been inserted.
      setTimeout(checkInput, 1);
   }
}
 
/* Parse the input in the paste catcher element */
function checkInput() {
   // Store the pasted content in a variable
   var child = pasteCatcher.childNodes[0];
 
   // Clear the inner html to make sure we're always
   // getting the latest inserted content
   pasteCatcher.innerHTML = "";
    
   if (child) {
      // If the user pastes an image, the src attribute
      // will represent the image as a base64 encoded string.
      if (child.tagName === "IMG") {
         createImage(child.src);
      }
   }
}
 
/* Creates a new image from a given source */
var pastedImage = new Image();
function createImage(source) {
   pastedImage = new Image();
   pastedImage.onload = function() {
      // You now have the image!
	  if (pasteCatcher) pasteCatcher.style.display = "none";
	  askGreenBox();
   }
   pastedImage.src = source;
}
