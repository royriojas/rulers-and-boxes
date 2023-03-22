export const loadStyles = () => {
  const tpl = `
  @font-face {
    font-family: 'Overpass Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/overpassmono/v15/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EXUonz0VOvcT3IqP6o.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  
  .rulers-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }
  
  .rulers-container * { pointer-events: auto; }
  
  .rulers-box {
    container-type: size;
    container-name: box;
    background: rgba(255, 0, 0, 0.1);
    background-blend-mode: multiply;
    box-shadow: inset 0px -0.5px 0px rgba(255, 0, 0, 0.2), inset 0px 0.5px 0px rgba(255, 0, 0, 0.2);
    position:absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    border: 1px solid #FF00001A;
  }
  
  .rulers-box.rulers-box-selected:after {
    border: 2px solid #9747ff;
  }
  
  .rulers-box:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: ' ';
    border: 3px solid transparent;
    pointer-events: none;
  }
  
  .rulers-box:before {
    position: absolute;
    bottom: 3px;
    right: 8px;
    font-size: 15px;
    content: attr(data-dimensions);
    color: rgba(255, 0, 0, 0.12);
  }

  @container box (min-width: 130px) {
    .rulers-box:before {
      font-size: 30px;
    }
  }
  @container box (min-width: 200px) {
    .rulers-box:before {
      font-size: 40px;
    }
  }
  
  @container box (min-width: 300px) {
    .rulers-box:before {
      font-size: 60px;
    }
  }
  
  @container box (min-width: 450px) {
    .rulers-box:before {
      font-size: 80px;
    }
  }
  
  .rulers-box [data-size] {
    position: absolute;
    top: -20px;
    left: 0;
    font-family: 'Overpass Mono', monospace;
    font-size: 13px;
    color: #FF0000;
    padding: 5px 5px 2px;
    line-height: 13px;
    white-space: nowrap;
  }
  
  .rulers-box [data-size]:focus {
    box-shadow: 0 0 5px #FF00001A;
    color: #fff;
    background: red;
  }
  
  .rulers-box .ui-resizable-handle:hover {
    background: rgb(43 34 184 / 31%)
  }
  
  .rulers-box:hover {
    background: rgba(255, 0, 0, 0.2);
  }
  
  .rulers-box:hover:after {
    border: 3px solid #9747ff;
  }
  
  .rulers-box .ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se:hover {
    background: none;
  }
  
  .rulers-box .ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se:after {
    width: 10px;
    height: 10px;
    border: 5px solid rgba(255,0,0, 0.2);
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    content: ' ';
  }
  
  .rulers-box .ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se:hover:after {
    border: 5px solid rgba(255,0,0, 0.35);
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
  }
  
  .rulers-box-ruler {
    font-family: 'Overpass Mono', monospace;
    cursor:pointer; 
    background: rgba(255, 0, 0, 0.1);
    background-blend-mode: multiply;
    box-shadow: inset 0px -0.5px 0px rgba(255, 0, 0, 0.2), inset 0px 0.5px 0px rgba(255, 0, 0, 0.2);
    position:absolute;
    top:0;
    left:0;
  }
  
  .rulers-box-ruler:hover {
    background: rgba(255, 0, 0, 0.15);
  }
  
  .rulers-box-ruler:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: ' ';
    pointer-events: none;
  }
  
  .rulers-box-ruler[data-axis="x"] {
    height: 100vh;
    width: 40px;
  }
  
  .rulers-box-ruler[data-axis="x"]:after {
    border-left: 1px solid red;
    border-right: 1px solid red;
  }
  
  .rulers-box-ruler[data-axis="x"].rulers-box-selected:after {
    border-left: 2px solid #9747ff;
    border-right: 2px solid #9747ff;
  }
  
  .rulers-box-ruler[data-axis="x"]:hover:after {
    border-left: 3px solid #9747ff;
    border-right: 3px solid #9747ff;
  }
  
  .rulers-box-ruler[data-axis="y"] {
    width:100vw; 
    height: 40px;
  }
  
  .rulers-box-ruler[data-axis="y"]:after {
    border-top: 1px solid red;
    border-bottom: 1px solid red;
  }
  
  .rulers-box-ruler[data-axis="y"]:hover:after {
    border-top: 3px solid #9747ff;
    border-bottom: 3px solid #9747ff;
  }
  
  .rulers-box-ruler[data-axis="y"].rulers-box-selected:after {
    border-top: 2px solid #9747ff;
    border-bottom: 2px solid #9747ff;
  }
    
  a.rulers-box-ruler-close {
    display: flex;
    opacity: 0;
    position: absolute;
    right: 5px;
    top: 10px;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    color: #ff00009c;
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
    line-height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
  }
  
  .rulers-box-ruler:hover a.rulers-box-ruler-close {
    opacity: 1;
  }
  
  .rulers-box:hover a.rulers-box-ruler-close {
    opacity: 1;
  }
  
  a.rulers-box-ruler-close:hover {
    background: rgba(255, 0, 0, 0.1);
  }
  
  .rulers-box-ruler[data-axis="x"] a.rulers-box-ruler-close {
    top: 5px;
    right: 10px;
  }
  
  .rulers-box a.rulers-box-ruler-close {
    top: 5px;
    right: 5px;
  }
    
  @container box (max-width: 50px) {
    .rulers-box a.rulers-box-ruler-close {
      right: -23px;
    }
  }
  
  @container box (max-height: 50px) {
    .rulers-box a.rulers-box-ruler-close {
      top: -23px;
    }
  }
  
  `;
  
  const style = document.createElement('style');
  
  style.innerHTML = tpl;
  
  document.head.appendChild(style);
  
  const container = document.createElement('div');
  container.classList.add('rulers-container');
  
  document.body.appendChild(container);
}
  
 