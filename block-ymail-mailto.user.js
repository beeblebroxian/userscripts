// ==UserScript==
// @name         Block Yahoo Mail mailto handler
// @namespace    block-ymail-mailto
// @version      1.0
// @description  Prevents Yahoo Mail from registering itself as the default mailto handler in the browser.
// @match        https://mail.yahoo.com/*
// @icon         https://icons.duckduckgo.com/ip3/mail.yahoo.com.ico
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const original = navigator.registerProtocolHandler;

    navigator.registerProtocolHandler = function(protocol, url) {
        if (protocol === "mailto") {
            console.log("Blocked mailto protocol registration from Yahoo Mail");
            return;
        }
        return original.apply(this, arguments);
    };
})();
