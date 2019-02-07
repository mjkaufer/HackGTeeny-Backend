axios.defaults.withCredentials = true

function addMeme(data, before) {

	//this code basically adds a bunch of elements to the webpage
	//data is the json, which should have fields url, caption, and score
	//before is a boolean representing whether to put the new memes at the front or bottom of stack

	var group = document.createElement('div');
	group.className += "group";

	var img = document.createElement('img');
	img.src = data.url;

	var caption = document.createElement('p');
	caption.textContent = data.caption;

	var score = document.createElement('p');
	score.textContent = data.score;

	var increaseScore = document.createElement('button');
	increaseScore.textContent = "+";

	increaseScore.onclick = function () {
		axios.get('/api/vote/' + data["_id"]);
		score.textContent = parseInt(score.textContent) + 1;
		increaseScore.disabled = true;
	};

	group.appendChild(img);
	group.appendChild(caption);
	group.appendChild(score);
	group.appendChild(increaseScore);

	if (before) {
		return parentDiv.insertBefore(group, parentDiv.childNodes[0])
	}

	parentDiv.appendChild(group);

}

document.getElementById('sub').onclick = function() {
	var json = {};

	//this grabs the data we're about to send and puts it in our json
	json["url"] = document.getElementById('url').value;
	json["caption"] = document.getElementById('caption').value;

	document.getElementById('url').value = "";
	document.getElementById('caption').value = "";

	//post request to our URL endpoint, sending our json
	//if the request works, we actually add the meme to our user's end
	axios.post('/api/add', json)
	.then(function (response) {
			addMeme(json, true);

		})
	.catch(function (error) {
			console.log(error);
		});
};


var parentDiv = document.getElementById('gifs');


//this is how we get all the memes
axios.get('/api/list/')
.then(function(response) {

	//this iterates through the memes we receive and adds them to the main page
	for (var i = 0; i < response.data.length; i++) {
		var el = response.data[i];

		addMeme(el);

	}
	console.log(response.data);
})	