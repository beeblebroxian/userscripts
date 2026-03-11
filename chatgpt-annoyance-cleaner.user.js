// ==UserScript==
// @name         ChatGPT Annoyance Cleaner
// @namespace    chatgpt-annoyance-cleaner
// @version      1.0
// @description  Hides the rate-limit modal, restores body scroll behavior, and blocks wheel event propagation on chatgpt.com
// @match        https://chatgpt.com/*
// @icon         https://icons.duckduckgo.com/ip3/chatgpt.com.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        div[data-testid="modal-no-auth-rate-limit"] {
            display: none !important;
        }
        body {
            pointer-events: initial !important;
            --removed-body-scroll-bar-size: initial !important;
            overflow: initial !important;
            overscroll-behavior: initial !important;
            position: initial !important;
            padding-left: initial !important;
            padding-top: initial !important;
            padding-right: initial !important;
            margin-left: initial !important;
            margin-top: initial !important;
            margin-right: initial !important;
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    window.addEventListener('wheel', e => e.stopPropagation(), { capture: true });
})();
