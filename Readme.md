the-browser.js
==============

> Simple browser detection
>  – by Studio B12 GmbH

We all know [browser detection is bad]. But admit it, there are valid situations when you have to use it. Even the puritan principles of [progressive enhancement] may require switching some fancy off for older versions of a browser.

That said, we present a browser detection plugin, as simple as it can get.



Usage
-----

- Download the script. You can use [bower]:

```
bower install git@git.sb12.de:js/lib/the-browser.git
```

- Include the script before yours:

```html
<script src="bower_components/the-browser.js"></script>
```

- You now have access to the global object `theBrowser`, which you can use in the following ways:

```js
theBrowser.name;                           // This property holds the browser's name. The name
                                           // comes from parsing the userAgent and is therefore
                                           // capitalised.


theBrowser.version;                        // This is the browser's version – a string with digits
                                           // and dots, again pulled out of userAgent.



theBrowser.is({name: 'Internet Explorer',  // This will return true if the site is viewed with IE8,
               version: 8});               // otherwise false. A string version (e.g. "8.0" is also
                                           // supported, as well as minVersion and maxVersion as
                                           // integer numbers.

theBrowser.is([                            // An array syntax for theBrowser.is() is also supported.
    {name: 'Internet Explorer',            // This will return true when the site is viewed either
     maxVersion: 8},                       // with IE8 or earlier, or with Firefox 3 or earlier.
    {name: 'Firefox',
     maxVersion: 3}
]);
```




<!-- Links ---------------------------------------------------------------------------------------->

[browser detection is bad]: http://css-tricks.com/browser-detection-is-bad/ "Browser Detection is Bad, on CSS-Tricks"
[bower]:                    http://bower.io/ "Bower – A package manager for the web"
[progressive enhancement]:  http://sixrevisions.com/web-development/progressive-enhancement/ "Progressive Enhancement 101, on Six Revisions"
