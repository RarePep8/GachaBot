
const sharp = require('sharp');


var fs = require('fs'),
    request = require('request');
var fetch = function(uri, filename, callback) {
	if (!fs.existsSync(filename)) {
		download(uri, filename, callback)
	} else {
		callback();
	}
}
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream('temp')).on('close', function(){
    	sharp('temp').resize(50,50).toFile(filename);
    	callback();
    });
  });
};

var link = 'https://fortnite-public-files.theapinetwork.com/pickaxe/ebd2802ccdb7b8851a0bff5ad53d0776.png';
var x = 0;
	y = 0;
	overlayList = [];
var createOverlayList = function(){
	fetch(link, './images/pickaxe.png', function(){
		overlayList.push({ input: './images/pickaxe.png', left: x, top: y})
		x+=50
		if (x >= 400) {
			x = 0;
			y += 50;
		}
		if (x < 400 && y < 200) {
			console.log('not last item');
			createOverlayList();
		} else {
			console.log(overlayList);
			console.log('last item');
			sharp('windows.jpg').composite(overlayList).toFile('output.webp', (err, info) => { return 0;});
		}
	});
}
// function createInventoryImage(){
// 	const sharp = require('sharp');
// 	var overlayList = [];
// 	for (let x = 0 ; x < 1000 ; x += 300) {
// 		for (let y = 0 ; y < 1000 ; y += 300) {
// 			//sharp('pickaxe.png').resize(100,100).toFile('pickaxe.png');
// 			fetch(link, 'pickaxe.png', ()=>overlayList.push({ input: 'pickaxe.png', left: x, top: y}));
			
// 		}
// 	}
// 	sharp('input.jpeg').composite(overlayList).toFile('output.webp', (err, info) => { return 0;});
// }

createOverlayList();