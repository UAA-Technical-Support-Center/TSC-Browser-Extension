console.log("The extension is up and running")

// ==UserScript==
// @name         TDX Browser Scripts
// @namespace    http://tampermonkey.net/
// @version      2025-05-22
// @description  Consolidated script of multiple extended features for Team Dynamix
// @author       ajtaylor@alaska.edu
// @author       ccelardo@alaska.edu
// @match        https://service.alaska.edu/TDNext/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teamdynamix.com
// @grant        none
// ==/UserScript==

// Define the Features
const scriptFeatures = {
	darkMode: false,
	notifications: false,
	autoSave: false
};

// select the DOM object to locate the feature menu
const divTdxDashboardToolbarRt = document.getElementsByClassName("tdbar-settings");

// on initial load, create and populate the menu
let divScriptFeatureMenu = createDivForMenu();
divScriptFeatureMenu.appendChild(createSelectForMenu());

divTdxDashboardToolbarRt[0].firstElementChild.prepend(divScriptFeatureMenu);

populateScriptFeatureMenu();


/***************************
* FUNCTIONS
**************************/

// create the div for the menu
function createDivForMenu() {
	let divObj = document.createElement("div");
		divObj.className = "gutter-right-sm pull-left";
		// divScriptFeatureMenu.style = "";
		
		return divObj;
	}

// create the script feature menu
function createSelectForMenu() {
	let selectObj = document.createElement("select");
	selectObj.id = "tdxScriptFeatureMenu";
	selectObj.addEventListener("change", toggleFeature);
	
	return selectObj;
}

// populate the script feature menu
function populateScriptFeatureMenu() {
	const menu = document.getElementById('tdxScriptFeatureMenu');
	menu.innerHTML = '';

	// Add default label option
	const defaultOption = document.createElement('option');
	defaultOption.textContent = 'Toggle TDX User Script Features';
	defaultOption.disabled = true;
	defaultOption.selected = true;
	menu.appendChild(defaultOption);

	// Add feature options
	for (const [feature, isEnabled] of Object.entries(scriptFeatures)) {
		const option = document.createElement('option');
		option.value = feature;
		option.textContent = `${feature} (${isEnabled ? 'ON' : 'OFF'})`;
		menu.appendChild(option);
	}
}

// toggle the script features, both in the menu, and the scriptFeatures array
function toggleFeature(event) {
	let featureName = event.target.value;
	scriptFeatures[featureName] = !scriptFeatures[featureName];
	console.log(`${featureName} is now ${scriptFeatures[featureName] ? 'ENABLED' : 'DISABLED'}`);
	populateScriptFeatureMenu();
}