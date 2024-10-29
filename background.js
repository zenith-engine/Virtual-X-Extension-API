// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log("L'extension a été installée !");
});

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'popup.html' }); // Ouvrir une page popup lorsque l'icône est cliquée
});

// Exemple d'écoute d'un message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "doSomething") {
        // Effectuer une action spécifique
        sendResponse({ result: "Action effectuée !" });
    }
});
