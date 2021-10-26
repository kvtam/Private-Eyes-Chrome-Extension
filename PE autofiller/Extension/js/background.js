
	
chrome.commands.onCommand.addListener(function(command){
	chrome.tabs.executeScript(null, {file: "js/translator.js"});
	
});
chrome.browserAction.onClicked.addListener(function(tab) {// Clicking on the button on the extension bar runs the script
   chrome.tabs.executeScript(null, {file: "js/auto.js"});
	
});

