const PAGEWIDTH = 400;
const PAGEHEIGHT = 200;
const ITEMWIDTH = 50;
const ITEMHEIGHT = 50;
const PAGESIZE = Math.floor(PAGEWIDTH/ITEMWIDTH)*Math.floor(PAGEHEIGHT/ITEMHEIGHT);
const invBg = '11.jpg';
const sharp = require('sharp');
sharp.cache(false);

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
    	sharp('temp').resize(ITEMWIDTH,ITEMHEIGHT).toFile(filename);
    	callback();
    });
  });
};



var drawInventoryPage = function(){
	var links = [{"id":"1","name": "yeet", "url":'https://fortnite-public-files.theapinetwork.com/pickaxe/ebd2802ccdb7b8851a0bff5ad53d0776.png'},
			{"id":"2","name" : "hay", "url":'https://fortnite-public-files.theapinetwork.com/featured/2fad344-834e456-dcf643d-91f9712.png'},
			{"id":"3","name" : "hehe", "url":'https://fortnite-public-files.theapinetwork.com/featured/2fad344-834e456-dcf643d-91f9712.png'}];
	createOverlayList(links,1, function(overlayList){
		sharp(invBg).composite(overlayList).toFile('output.webp', (err, info) => { return 0;});
	});
}

var createOverlayList = function(inv, page, cb){
	createOverlayListHelper(0, 0, inv, [], 0, cb);
}

var createOverlayListHelper = function(x, y, inv, overlayList, index, cb){
	fetch(inv[index].url, `./images/${inv[index].id}.png`, function(){
		overlayList.push({ input: `./images/${inv[index].id}.png`, left: x, top: y})
		x+=ITEMWIDTH
		if (x >= PAGEWIDTH) {
			x = 0;
			y += ITEMHEIGHT;
		}
		console.log(overlayList);
		if (index+1 < inv.length && overlayList.length < PAGESIZE) {
			createOverlayListHelper(x, y, inv, overlayList, index+1, cb);
		} else {
			if(cb){
				cb(overlayList);
			}
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
drawInventoryPage();