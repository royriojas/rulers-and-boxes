import { genURL } from './dayjs-helper';

document.addEventListener('DOMContentLoaded', () => {
  const $ = document.querySelector.bind(document);
  
  $('div.commands').addEventListener('click', (e) => {

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
  
  const $input = $('[data-c="cid"]');
  const $daysFrom = $('[data-c="time-from"]');
  const $daysTo = $('[data-c="time-unit"]');
  const $btn = $('[data-c="open-dd"]');
  
  $btn.addEventListener('click', () => {
    const cid = $input.value;
    const fromNow = Number.parseInt($daysFrom.value) || 7;
    const unit = $daysTo.value || 'd';
   
    if (!cid) return;
    
    const url = genURL(cid, { fromNow, unit });
    console.log('>>> url', url);
    
    window.open(url, '_blank');
  });
});

