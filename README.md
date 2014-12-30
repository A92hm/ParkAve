#Park Ave Web application


##Usage
###Install
To use this script clone this repository on your remote server.
```bash
git clone https://github.com/parkave/parkave-webapp.git && cd parkave-webapp
npm install
bower install
```
###Execution
You need to have MongoDB running on your machine or change the mongo's URL to a remote machine.
To develop:
```bash
node server/app.js
```
To serve final product:
```bash
NODE_ENV='production' [optional port] [other environmental variables] node server/app.js
```

##Dependencies
* [MongoDB](http://www.mongodb.org/downloads)
* [node](http://nodejs.org)
* [npm](https://www.npmjs.com)
* [bower](https://github.com/bower/bower)


##Structure
	parkave-webapp
	.
	├── .gitignore
	├── package.json						- Used npm packages
	├── bower.json						- Used bower packages
	├── node_modules						- Contains bower modules
	├── README.md
	├── client							- Contains client files (mostly static)
	│	├── bower_components				  - Contains bower modules (created by running bower install)
	│	├── assets
	│	│	└── images
	│	├── css						  - Global css files
	│	├── index.html
	│	├── robots.txt					  - Instruction for crawlers [About](www.robotstxt.org/)
	│	├── components					  - Contains angular modules for different services
	│	└── app
	│		├── app.js					  - Angular application
	│		└── [views]					  - Different angular views
	└── server							- Contains the static files
		├── .jshintrc						- JSHint configuration
		├── app.js						- Node/Express application 
		├── views							- Server side view templates 
		├── config						- Contains confi files for express, sockets
		│	├── express.js
		│	├── local.env.samples.js		  - Contains environmental variables ONLY FOR DEVELOPMENT
		│	├── seed.js					  - Populated the database
		│	├── socketio.js
		│	└── environment				  - Contains environmental settings
		│		├── index.js
		│		├── development.js
		│		├── production.js
		│		└── test.js
		├── components					- Contains different components such as error handling
		├── auth						  	- Contains authentication methods
		│	├── index.js
		│	├── auth.services.js
		│	└── local						  - PassportJS methods
		│		├── index.js
		│		└── passport.js
		└── api							- Contains the objects and apis
			└── [name]
				├── index.js				- Defines the routes (urls) for this api
				├── [name].controller.js	- Contains the logic and methods
				├── [name].model.js		- Mongoose model for the api
				├── [name].socket.js		- Contains the logic for sockets
				└── [name].spec.js		- Test file definition


##Potential Bugs:
* Not known.


##To do
* 

##License
[MIT license](http://opensource.org/licenses/MIT)