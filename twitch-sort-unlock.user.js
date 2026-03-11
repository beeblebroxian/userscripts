// ==UserScript==
// @name         Twitch Sort Unlock
// @namespace    twitch-sort-unlock
// @version      1.0
// @description  Enable RECENT and VIEWER_COUNT_ASC on categories Just Chatting and Roblox.
// @match        https://www.twitch.tv/*
// @icon         https://icons.duckduckgo.com/ip3/twitch.tv.ico
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const targetCategories = new Set(['just-chatting', 'roblox']);

    const originalIncludes = Array.prototype.includes;

    Array.prototype.includes = function (value, fromIndex) {
        if (
            Array.isArray(this) &&
            this.length === targetCategories.size &&
            [...targetCategories].every(slug => this.includesOriginal(slug)) &&
            targetCategories.has(value)
        ) {
            return false;
        }

        return originalIncludes.call(this, value, fromIndex);
    };

    Array.prototype.includesOriginal = originalIncludes;
})();
