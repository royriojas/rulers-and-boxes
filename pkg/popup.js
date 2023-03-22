document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('div.commands').addEventListener('click', (e) => {

    const cmd = e.target.dataset.cmd;
    if (!cmd) return;

    if (cmd === 'create-ruler') {
      chrome.tabs.executeScript(null, { code: `__rulers.createRuler('${e.target.dataset.axis}');` });
      return;
    }
    if (cmd === 'create-box') {
      chrome.tabs.executeScript(null, { code: '__rulers.createBox(); '});
      return;
    }
  });
});
