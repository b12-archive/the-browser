**This package is deprecated!** Please use [detect-browswer](https://github.com/DamonOehlman/detect-browser) instead.

***

the-browser.js
==============

> Simple browser detection.
> 
> <div style="text-align:right">                                          – by Studio B12 GmbH</div>

We all know [browser sniffing is bad][]. But admit it, there are valid situations when you have to use it. Displaying helpful messages. Gathering statistics. Even the puritan principles of [progressive enhancement][] sometimes require switching on some un-feature-detectable fancy for certain browsers.

That said, we present a browser detection plugin. As simple as it can get.




Usage
-----

- Download the script. You can use [bower][]:

```
bower install the-browser
```


- Include the script before yours:

```html
<script src="bower_components/the-browser/dist/the-browser.js"></script>
```


- You now have access to the global object `theBrowser`, which you can use in the following ways:

```js
theBrowser.name;                            // This property holds the browser's name. "Internet
                                            // Explorer" and "Opera" are normalized, as they try to
                                            // spoof browser sniffing. Other browsers' names come
                                            // fresh from parsing the userAgent string, normally
                                            // title-cased.


theBrowser.version;                         // This is the browser's version – a string with digits
                                            // and dots.


theBrowser.is('Chrome');                    // This will return true if the site is viewed with
                                            // Google Chrome.


theBrowser.is({ name: 'Internet Explorer'   // This will return true if the site is viewed with
              , version: '8.0'              // IE 8.0, otherwise false. `version` can also be an
              });                           // integer. Instead of `version` you can specify the
                                            // integers `minVersion` and/or `maxVersion`.


theBrowser.is([ { name: 'Internet Explorer' // Array syntax for `theBrowser.is()` is also supported.
                , maxVersion: 8             // This will return true when the site is viewed either
                }                           // with IE 8 or earlier, or with Firefox 3 or earlier.
              , { name: 'Firefox'
                , maxVersion: 3              
                }                
              ]);
```




License
-------

This software is released under the terms of the [MIT License][].




<!-- Links ---------------------------------------------------------------------------------------->

[browser sniffing is bad]:  http://css-tricks.com/browser-detection-is-bad/ "Browser Detection is Bad, on CSS-Tricks"
[bower]:                    http://bower.io/ "Bower – A package manager for the web"
[progressive enhancement]:  http://sixrevisions.com/web-development/progressive-enhancement/ "Progressive Enhancement 101, on Six Revisions"
[MIT License]:              ./License.md
