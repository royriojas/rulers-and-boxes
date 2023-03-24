import { loadStyles } from "./styles";

export const initRulers = () => {
  if (window.__rulers) {
    console.log('rulers already loaded');
    return;
  }
  
  const $ = window.jQuery;
  
  let $currentTarget = null;
  let firstElementAdded = false;
      
  $('body').on('mousedown', (e) => {
    if ($(e.target).closest('[data-cmd]').length > 0) return;
    
    $currentTarget?.removeClass('rulers-box-selected');
    
    const $target = $(e.target).closest('[data-c="box"], [data-c="ruler"]');
            
    if ($target?.length === 0) {
      $currentTarget = null;
      return;
    }
    
    $currentTarget = $target;
    $target.addClass('rulers-box-selected');
    $target.appendTo('.rulers-container'); // move it to the end to make it to the top
  });
  
  $('body').on('keydown', (e) => {
    if ($(e.target).closest('[data-size], [data-cmd]').length > 0) return;
    if (!$currentTarget || $currentTarget.length === 0) return;
    if (e.key === 'Escape') {
      $currentTarget?.removeClass('rulers-box-selected');
      $currentTarget = null;
      e.preventDefault();
    }

    if (e.key === 'Delete') {
      $currentTarget?.remove();
      $currentTarget = null;
      e.preventDefault();
    }
    const displacement = e.metaKey ? 10 : 1;
    
    if (e.metaKey) {
      e.preventDefault();
    }
    
    const axis = $currentTarget?.attr('data-axis');
    
    if (e.key === 'ArrowUp') {
      if (!axis || axis === 'y') {
        $currentTarget?.css({ top: `-=${displacement}px` });
        e.preventDefault();
      }
    }
    if (e.key === 'ArrowDown') {
      if (!axis || axis === 'y') {
        $currentTarget?.css({ top: `+=${displacement}px` });
        e.preventDefault();
      }
    }
    if (e.key === 'ArrowLeft') {
      if (!axis || axis === 'x') {
        $currentTarget?.css({ left: `-=${displacement}px` });
        e.preventDefault();
      }
    }
    if (e.key === 'ArrowRight') {
      if (!axis || axis === 'x') {
        $currentTarget?.css({ left: `+=${displacement}px` });
        e.preventDefault();
      }
    }
    
    
  });
  
  $('body').on('click', '[data-cmd="remove"]', (e) => {
    $(e.target).closest('[data-c="box"], [data-c="ruler"]').remove();
    $currentTarget = null;
  });
  
  const createBox = () => {
    if (!firstElementAdded) {
      firstElementAdded = true;
      loadStyles();
    }
    
    const w = 100;
    const h = 100;

    const $box = $(`<div data-c="box" tab-index="1" class="rulers-box">
                      <div contenteditable="true" data-size>${w}, ${h}</div>
                      <a data-cmd="remove" class="rulers-box-ruler-close">
                        <span>x</span>
                      </a>
                    </div>`).appendTo('.rulers-container');
    $box.css({ width: w, height: h });
    $box.draggable({
      cancel: '[data-size]',
    }).resizable({
      resize(event, ui) {
        const w = ui.size.width;
        const h = ui.size.height;
        $box.find('[data-size]').text(`${w}, ${h}`);
        $box.attr('data-dimensions', `${w}, ${h}`); 
      }
    });
    
    $box.find('[data-size]').on('input', (e) => {
      let [w, h] = $box.find('[data-size]').text().split(',').map(v => parseInt(v, 10));
      
      if (w === undefined || Number.isNaN(w)) {
        w = 100;
      }
      if (h === undefined || Number.isNaN(h)) {
        h = 100;
      }
      
      $box.css({ width: w, height: h });
      $box.attr('data-dimensions', `${w}, ${h}`); 
    });
  };
  
  
  const createRuler = (axis) => {
    if (!firstElementAdded) {
      firstElementAdded = true;
      loadStyles();
    }
    
    const $ruler = $(`<div data-c="ruler" class="rulers-box-ruler" data-axis="${axis}">
                      <a data-cmd="remove" class="rulers-box-ruler-close">
                        <span>x</span>
                      </a>
                    </div>`).appendTo('.rulers-container');
  
    $ruler.draggable({
      axis: axis
    });
  };
  
  
  
  window.__rulers = {
    createRuler,
    createBox,
    setCurrentBoxSize: (w, h) => {
      const $box = $('.rulers-box.rulers-box-selected');
      if ($box?.length === 0) return;
      $box.css({ width: w, height: h });      
    },
  };
};