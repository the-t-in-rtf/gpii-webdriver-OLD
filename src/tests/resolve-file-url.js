/*
 A server-side (node) function that uses `fluid.module.resolvePath` to resolve File URLs relative to the location of
 this module. `path` should be something like:

 `%gpii-webdriver/tests/get/html/index.html`

 */
/* eslint-env node */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");
var url   = require("url");

fluid.registerNamespace("gpii.test.webdriver");

/*
    A file URL resolver.  Used to construct file:// URLs to be opened using the test browser.

    We expect this to equal the browser's current window.location.href value.  Because node's URL resolution differs
    from what actual browsers produce on Windows, we must have our own special handling until these issues are resolved:

    https://github.com/nodejs/node-v0.x-archive/issues/5452
    https://github.com/nodejs/node-eps/pull/28

 */
gpii.test.webdriver.resolveFileUrl = function (path) {
    var resolvedUrl = url.resolve("file://", fluid.module.resolvePath(path));

    // Windows URL handling
    if (resolvedUrl.indexOf("file:") !== 0) {
        resolvedUrl = "file:///" + resolvedUrl[0].toUpperCase() + resolvedUrl.substring(1);
    }

    return resolvedUrl;
};
