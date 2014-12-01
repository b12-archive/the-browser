/*!
 * the-browser.js
 * https://github.com/studio-b12/the-browser
 *
 * Copyright 2014 by Studio B12 GmbH
 * Released under the MIT license
 * https://github.com/studio-b12/the-browser/blob/master/License.md
 */


var theBrowser = (function (navigator, undefined) { 'use strict';
    var is, _init;
    var self = {};


    self.is = is = function is () {
        var argument = arguments[0];

        /**
         * @function theBrowser.is
         * @param {Array} browserTable
         * @returns {Boolean}
         */
        if (argument instanceof Array) {
            return is._byBrowserTable(argument);
            }

        /**
         * @function theBrowser.is
         * @param {String} browserName
         * @returns {Boolean}
         */
        else if (typeof argument == 'string') {
            return is._byBrowserName(argument);
            }

        /**
         * @function theBrowser.is
         * @param {Object} browserData
         * @returns {Boolean}
         */
        else if (typeof argument == 'object') {
            return is._byBrowserData(argument);
            }

        return false;
        };

    is._byBrowserTable = function is_byBrowserTable (browserTable) {
        var browserData;
        while ((browserData = browserTable.pop())) {
            if (is(browserData)) return true;
            }

        return false;
        };

    is._byBrowserName = function is_byBrowserName (browserName) {
        if (browserName.toLowerCase() === self.name.toLowerCase()) return true;
        else return false;
        };

    is._byBrowserData = function is_byBrowserData (browserData) {
        if (  typeof browserData.name !== 'string'
           || self.name.toLowerCase() !== browserData.name.toLowerCase()
           || (  typeof browserData.minVersion == 'number'
              && parseInt(self.version) < browserData.minVersion
              )
           || (  typeof browserData.maxVersion == 'number'
              && parseInt(self.version) > browserData.maxVersion
              )
           || (  typeof browserData.version == 'number'
              && parseInt(self.version) !== browserData.version
              )
           || (  typeof browserData.Version == 'string'
              && self.version !== browserData.version
              )
           ) return false;

        else return true;
        };


    self._init = _init = function _init (agent) {
        var quickMatch;
        if (!agent) agent = navigator.userAgent;

        self.name = self.version = undefined;


        // Credits to http://stackoverflow.com/a/2401861/2816199 .
        var matches = (  agent.match(/(opera|chrome|safari|firefox|msie|trident)[\/ ]*([\d.]+)/i)
                      || []
                      );


        // Detect new IE versions.
        if (/trident/i.test(matches[1])) {
            quickMatch = /\brv[ :]+([\d.]+)/g.exec(agent) || [];
            self.name = 'Internet Explorer';
            self.version = quickMatch[1] || null;
            return self;
            }


        // Detect Opera.
        if (/chrome/i.test(matches[1])) {
            quickMatch = agent.match(/\bOPR\/([\d.]+)/);
            if (quickMatch !== null) {
                self.name = 'Opera';
                self.version = quickMatch[1];
                return self;
                }
            }


        // Detect other browsers,
        if (matches[2]) {
            self.name = matches[1];
            self.version = matches[2];
            }

        // …or fall back to navigator,
        else {
            self.name = navigator.appName;
            self.version = navigator.appVersion;
            }

        // …then normalize the name for ancient versions of IE.
        if (/msie/i.test(self.name)) {
            self.name = 'Internet Explorer';
            }


        // Pull out the goofy-style version.
        quickMatch = agent.match(/version\/([\d.]+)/i);
        if (quickMatch) {
            self.version = quickMatch[1];
            }

        return self;
        };


    return _init();
    }(window.navigator));


/* exported theBrowser */
