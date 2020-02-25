// load the elements of the page
var elements = document.getElementsByTagName('*');

// load words into arrays
var allText =[];
var allTextLines = [];
var line = [];
var keys = [];
var trans = [];

/* this is actually nodejs, not js
const fs = require('fs') 
fs.readFile('complete_wordbook.csv', 'utf-8', (err, data) => { 
    if (err) throw err; 
  
    allText = data;
	allTextLines = allText.split(/\n/);
});
for (const l of allTextLines)
{
	line = l.split(/,/);
	keys.push(line[0]);
	trans.push(line[2]);
};
*/

// iterate through the elements of the page
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) { //text node
            var text = node.nodeValue;
			var replacedText = text.replace(keys[0],trans[0]);
			
			// replace using regex
			for (var w = 1; w < keys.length; w++) {
				replacedText = text.replace(keys[w],trans[w]);
			};

			// FINAL CHECK, only replace if different
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}