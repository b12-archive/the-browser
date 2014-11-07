/**
 * @credits to http://stackoverflow.com/a/2401861/2816199
 */

var theBrowser = (function () {
	"use strict";

	var quickMatch,
	    self = {},
	    agent = navigator.userAgent,
	    matches = agent.match(/(opera|chrome|safari|firefox|msie|trident)[\/ ]*([\d.]+)/i) || [];


	self.is = function () {
		var browserTable, browserName, browserData, doesMatch;

		if (arguments[0] instanceof Array) return self.is._byBrowserTable(arguments[0]);
		else if (typeof arguments[0] == 'string') return self.is._byBrowserName(arguments[0]);
		else if (typeof arguments[0] == 'object') return self.is._byBrowserData(arguments[0]);

		return false;
	};

	self.is._byBrowserTable = function (browserTable) {
		for (var i=0; i<browserTable.length; i++) {
			if (self.is(browserTable[i])) return true;
		}

		return false;
	};

	self.is._byBrowserName = function (browserName) {
		if (self.name.toLowerCase() === browserName.toLowerCase()) return true;
		else return false;
	};

	self.is._byBrowserData = function (browserData) {
		var doesMatch = true;

		if (typeof browserData.name !== 'string') doesMatch = false;
		else if (self.name.toLowerCase() !== browserData.name.toLowerCase()) doesMatch = false;
		else if (typeof browserData.minVersion == 'number' &&
		         parseInt(self.version) < browserData.minVersion) doesMatch = false;
		else if (typeof browserData.maxVersion == 'number' &&
		         parseInt(self.version) > browserData.maxVersion) doesMatch = false;
		else if (typeof browserData.version == 'number' &&
		         parseInt(self.version) !== browserData.version) doesMatch = false;
		else if (typeof browserData.Version == 'string' &&
		         self.version !== browserData.version) doesMatch = false;

		return doesMatch;
	};



	// Detect new IE versions
	if (/trident/i.test(matches[1])) {
		quickMatch = /\brv[ :]+([\d.]+)/g.exec(agent) || [];
		self.name = 'Internet Explorer';
		self.version = (quickMatch[1] || null);
		return self;
	}


	// Detect Opera
	if (/chrome/i.test(matches[1])) {
		quickMatch = agent.match(/\bOPR\/([\d.]+)/);
		if (quickMatch !== null) {
			self.name = 'Opera';
			self.version = quickMatch[1];
			return self;
		}
	}


	// Detect other browsers
	if (matches[2]) {
		self.name = matches[1];
		self.version = matches[2];
	}

	// ...or fall back to navigator
	else {
		self.name = navigator.appName;
		self.version = navigator.appVersion;
	}

	// Pull funny-style version
	quickMatch = agent.match(/version\/([\d.]+)/i);
	if (quickMatch) {
		self.version = quickMatch[1];
	}

	// Handle old IE
	if (/msie/i.test(self.name)) {
		self.name = 'Internet Explorer';
	}


	return self;
}());
