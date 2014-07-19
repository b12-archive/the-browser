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
		var browser, browserTable, i, doesMatch;

		if (arguments[0] instanceof Array) {
			browserTable = arguments[0];
			for (i=0; i<browserTable.length; i++) {
				if (self.is(browserTable[i])) return true;
			}

			return false;
		}

		else if (typeof arguments[0] == 'object') {
			browser = arguments[0];
			doesMatch = true;

			if (typeof browser.name !== 'string') doesMatch = false;
			else if (self.name.toLowerCase() !== browser.name.toLowerCase()) doesMatch = false;
			else if (typeof browser.minVersion == 'number' &&
			         parseInt(self.version) < browser.minVersion) doesMatch = false;
			else if (typeof browser.maxVersion == 'number' &&
			         parseInt(self.version) > browser.maxVersion) doesMatch = false;
			else if (typeof browser.version == 'number' &&
			         parseInt(self.version) !== browser.version) doesMatch = false;
			else if (typeof browser.Version == 'string' &&
			         self.version !== browser.version) doesMatch = false;

			return doesMatch;
		}
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
