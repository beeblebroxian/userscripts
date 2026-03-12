// ==UserScript==
// @name         AllKeyShop Reward Booster
// @namespace    allkeyshop-reward-booster
// @version      1.0
// @description  Mimics the official extension to unlock reward program benefits.
// @match        https://www.allkeyshop.com/blog/reward-program/*
// @match        https://www.goclecd.fr/programme-fidelite/*
// @match        https://www.keyforsteam.de/reward-program/*
// @match        https://www.clavecd.es/programa-de-regalos/*
// @match        https://www.cdkeyit.it/reward-program/*
// @match        https://www.cdkeypt.pt/reward-program/*
// @match        https://www.cdkeynl.nl/reward-program/*
// @icon         https://icons.duckduckgo.com/ip3/allkeyshop.com.ico
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function() {
    "use strict";

    const translations = {
        enableExtension: {
            en: 'Enable Extension',
            fr: 'Activer l’extension',
            de: 'Erweiterung aktivieren',
            es: 'Activar extensión',
            it: 'Abilita estensione',
            pt: 'Ativar extensão',
            nl: 'Extensie inschakelen'
        },
        extensionEnabled: {
            en: 'Extension enabled',
            fr: 'Extension activée',
            de: 'Erweiterung aktiviert',
            es: 'Extensión activada',
            it: 'Estensione abilitata',
            pt: 'Extensão ativada',
            nl: 'Extensie ingeschakeld'
        },
        siteFunctionUnavailable: {
            en: 'Site function not available',
            fr: 'Fonction du site non disponible',
            de: 'Seitenfunktion nicht verfügbar',
            es: 'Función del sitio no disponible',
            it: 'Funzione del sito non disponibile',
            pt: 'Função do site não disponível',
            nl: 'Sitefunctie niet beschikbaar'
        }
    };

    function getTranslation(key) {
        const localeFull = unsafeWindow.__site?.i18n?.locale || 'en';
        const locale = localeFull.substring(0, 2).toLowerCase();
        return translations[key]?.[locale] || translations[key]?.en || key;
    }

    async function enableExtension() {
        if (typeof unsafeWindow.confirmExtensionEnabled !== "function") {
            alert(getTranslation('siteFunctionUnavailable'));
            return;
        }

        const targetUrl = unsafeWindow.__site?.ajaxUrl + '?action=set_user_extension_enabled';
        const origFetch = unsafeWindow.fetch;

        unsafeWindow.fetch = async function(input, init) {
            const url = typeof input === "string" ? input : input?.url;
            const response = await origFetch.apply(this, arguments);

            if (url === targetUrl) {
                const text = await response.clone().text();
                if (response.status === 200 && text.trim() === "ok") {
                    unsafeWindow.fetch = origFetch;
                    location.reload();
                }
            }

            return response;
        };

        unsafeWindow.confirmExtensionEnabled();
    }

    function addButton() {
        const omtForm = document.getElementById("omt_form");
        if (!omtForm || !omtForm.parentElement) return;
        if (document.getElementById("reward-extension-button")) return;

        const btn = document.createElement("button");
        btn.id = "reward-extension-button";
        btn.className = "btn-primary-alt";
        btn.style.marginLeft = "10px";

        const isEnabled = unsafeWindow.__site && unsafeWindow.__site.isExtensionEnabled;
        if (isEnabled) {
            btn.textContent = getTranslation('extensionEnabled');
            btn.disabled = true;
            btn.style.filter = "invert(1)";
        } else {
            btn.textContent = getTranslation('enableExtension');
            btn.addEventListener("click", enableExtension);
        }

        omtForm.parentElement.appendChild(btn);
    }

    addButton();

})();
