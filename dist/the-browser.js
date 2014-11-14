/*!
 * the-browser.js
 * https://github.com/studio-b12/the-browser
 *
 * Copyright 2014 by Studio B12 GmbH
 * Released under the MIT license
 * https://github.com/studio-b12/the-browser/blob/master/License.md
 */


var theBrowser = (function (navigator) { 'use strict';
    var is, _init;
    var self = {};


    self.is = is = function theBrowser_is () {
        /**
         * @function theBrowser.is
         * @param {Array} browserTable
         * @returns {Boolean}
         */
        if (arguments[0] && arguments[0] instanceof Array) {
            return is._byBrowserTable(arguments[0]);
            }

        /**
         * @function theBrowser.is
         * @param {String} browserName
         * @returns {Boolean}
         */
        else if (typeof arguments[0] == 'string') {
            return is._byBrowserName(arguments[0]);
            }

        /**
         * @function theBrowser.is
         * @param {Object} browserData
         * @returns {Boolean}
         */
        else if (typeof arguments[0] == 'object') {
            return is._byBrowserData(arguments[0]);
            }

        return false;
        };

    is._byBrowserTable = function theBrowser_is_byBrowserTable (browserTable) {
        var browserData;
        while ((browserData = browserTable.pop())) {
            if (self.is(browserData)) return true;
            }

        return false;
        };

    is._byBrowserName = function theBrowser_is_byBrowserName (browserName) {
        if (browserName.toLowerCase() === self.name.toLowerCase()) return true;
        else return false;
        };

    is._byBrowserData = function theBrowser_is_byBrowserData (browserData) {
        if (  typeof browserData.name !== 'string'
           || ( self.name.toLowerCase() !== browserData.name.toLowerCase()
              )
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


    self._init = _init = function theBrowser_init () {
        var quickMatch;
        var agent = navigator.userAgent;


        // Credits to http://stackoverflow.com/a/2401861/2816199 .
        var matches = (  agent.match(/(opera|chrome|safari|firefox|msie|trident)[\/ ]*([\d.]+)/i)
                      || []
                      );


        // Detect new IE versions.
        if (/trident/i.test(matches[1])) {
            quickMatch = /\brv[ :]+([\d.]+)/g.exec(agent) || [];
            self.name = 'Internet Explorer';
            self.version = (quickMatch[1] || null);
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
