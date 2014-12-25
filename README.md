#Park Ave Web application
This the web application for Park Ave. Users are able to list their private parking on this website and the users of iOS application can reserve and pay for parking spot using their iPhone.

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
	│	├── images
	│	├── css								  - Global css files
	│	├── index.html
	│	├── fonts
	│	├── styles							  - Contains css for different pages/views
	│	│	└── [page-name]
	│	└── js								  - Contains javascript for different pages/views
	│		└── [page-name]			  - Different angular views
	└── server							- Contains the server side scripts
		├── app.js						- Node/Express application 
		├── routes.js						- API routes
		├── model							- Object Models
		│	└── [name]
		└── controller					- Controllers and logic
			└── [name]


##Potential Bugs:
* Not known (bugs do exits)


##To do
* 

##License
[MIT license](http://opensource.org/licenses/MIT)