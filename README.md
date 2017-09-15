# Baby Got Backend

Backend development talk for HackGTeeny

![Backend development amirite](https://media.giphy.com/media/eLJbTsEaMgASs/giphy.gif)

## Getting Set Up

* Install [Node.JS](https://nodejs.org/en/download/) on your computer
	* If you already have it, make sure your version's up to date
* Get a dope text editor
	* Try Sublime Text or Atom or literally anything
* Run `npm install` to install all of the prerequisite packages for this project.
* To get the project itself running, enter `node index.js` into your terminal
* Visit `http://127.0.0.1:3000` to see your app in action!
* Congrats, that's it!

## What Files Do I Have?

* This folder has a finished copy of the backend code we'll be building. If something doesn't work in your code, try to reference that code. We'll hopefully be live-coding though, so just follow around and you should be fine.
* After the frontend workshop, you should be experts already. The folder for the frontend is located in `public` and will contain an example app that interfaces with our backend.
	* The UI looks like garbage on purpose; it's a backend course, after all

## What Are We Building?

* We're gonna build a garbage social media platform, where you'll be able to share & 'caption' gifs. 

## Improvements You Can Try and Make
* Add a voting system
* Add a user system
* Integrate the voting and user system so people can only vote once
	* Track peoples' favorite gifs
* Update gifs in real time on the home page
	* Look into WebSockets to help with this
		* Or maybe even a frontend framework!
    * Or just make a lot of AJAX requests
