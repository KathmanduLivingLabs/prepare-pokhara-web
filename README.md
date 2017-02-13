# Prepare Pokhara - Web Application Code Base
This repository contains all the front-end development code for the [Prepare Pokhara](http://preparepokhara.herokuapp.com) project.

Once you have cloned the repo, please use the following commands from the root directory of the repo to host a local version of the app in your computer (please note that you need to have nodejs pre-installed for these commands to work.) 

`npm install`
`npm run start`

## Currently under development
The following is a checklist of the things that are done, and the activities that are pending. This list will be updated on amn ongoing basis:

- [X] Components and styling
	- [X] Navigation Bar
	- [ ] Resusable Components
		- [X] Reusable checkbox group (`/components/Checkbox.js`)
		- [X] Reusable slider component (`/components/Slider.js`)
		- [X] Reusable toggle component (`/components/Toggle.js`)
		- [X] Reusable insights components (`/components/Insight.js`)
		- [X] Reusable map component (`/components/Maps.js`)
		- [ ] Reusable C3 based vertical chart component
		- [X] Reusable dropdown component (`/components/Dropdown.js`) 
- [ ] Application routing (/config/routes.js)
	- `Home.js` is the parent container, and routing for the following components has been achieved:
		- [X] Hospitals Component (`/components/Hospitals.js`)
		- [X] Banks Component (`/components/Banks.js`)
		- [X] Schools Component (`/components/Schools.js`)
- [X] The following helpers and utils are currently in the pipeline:
	- [X] API data fetching handlers (`/utils/FetchData.js`)
	- [X] Popup text helpers (`/utils/Popup.js`)
	- [X] Loading View Component (`/utils/Checkbox.js`)
	- [X] Transparent updating data view component (`/utils/Updating.js`) 


Cheers.

