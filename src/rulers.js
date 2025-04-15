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
    if ($(e.target).closest('[data-size], [data-cmd], [data-c="pos"]').length > 0) return;
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
        $currentTarget?.find('[data-c="pos"]').text(`${$currentTarget.position().top}px`);
        e.preventDefault();
      }
    }
    if (e.key === 'ArrowDown') {
      if (!axis || axis === 'y') {
        $currentTarget?.css({ top: `+=${displacement}px` });
        $currentTarget?.find('[data-c="pos"]').text(`${$currentTarget.position().top}px`);
        e.preventDefault();
      }
    }
    if (e.key === 'ArrowLeft') {
      if (!axis || axis === 'x') {
        $currentTarget?.css({ left: `-=${displacement}px` });
        $currentTarget?.find('[data-c="pos"]').text(`${$currentTarget.position().left}px`);
        e.preventDefault();
      }
    }
    if (e.key === 'ArrowRight') {
      if (!axis || axis === 'x') {
        $currentTarget?.css({ left: `+=${displacement}px` });
        $currentTarget?.find('[data-c="pos"]').text(`${$currentTarget.position().left}px`);
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
                      <div data-c="pos" contenteditable="true">
                        0, 0
                      </div>
                    </div>`).appendTo('.rulers-container');
    $box.css({ width: w, height: h });
    $box.draggable({
      cancel: '[data-size], [data-c="pos"]',
      create: (e, ui) => {
        const left = $box.position().left;
        const top = $box.position().top;

        $box.find('[data-c="pos"]').text(`${left}px, ${top}px`);
      },
      drag: (e, ui) => {
        const left = ui.position.left;
        const top = ui.position.top;

        $box.find('[data-c="pos"]').text(`${left}px, ${top}px`);
      },
      stop: (e, ui) => {
        const left = ui.position.left;
        const top = ui.position.top;

        $box.find('[data-c="pos"]').text(`${left}px, ${top}px`);
      },
      start: (e, ui) => {
        const left = ui.position.left;
        let top = ui.position.top;

        $box.find('[data-c="pos"]').text(`${left}px, ${top}px`);
      }
    }).resizable({
      resize(event, ui) {
        const w = ui.size.width;
        const h = ui.size.height;
        const pos = ui.position;
        $box.find('[data-c="pos"]').text(`${pos.left}px, ${pos.top}px`);
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

    $box.find('[data-c="pos"]').on('input', function (e) {
      const $this = $(this);
      let [left, top] = $this.text().split(',').map(v => parseInt(v, 10));

      if (left === undefined || Number.isNaN(left)) {
        left = 0;
      }
      if (top === undefined || Number.isNaN(top)) {
        top = 0;
      }

      $box.css({ left: left, top: top });
    });
  };
  
  
  const createRuler = (orientation) => {
    if (!firstElementAdded) {
      firstElementAdded = true;
      loadStyles();
    }

    const axis = orientation === "vertical" ? "x" : "y";

    const $ruler = $(`<div data-c="ruler" class="rulers-box-ruler" data-axis="${axis}">
                      <div data-c="pos" contenteditable="true" data-pos="before"></div>
                      <a data-cmd="remove" class="rulers-box-ruler-close">
                        <span>x</span>
                      </a>
                      <div data-c="pos" contenteditable="true" data-pos="after"></div>
                    </div>`).appendTo('.rulers-container');

    $ruler.draggable({
      axis: axis,
      cancel: '[data-c="pos"]',
      create: (e, ui) => {
        const left = $ruler.position().left;
        const top = $ruler.position().top;

        const pos = axis === "x" ? left : top;

        $ruler.find('[data-c="pos"]').text(`${pos}px`);
      },
      drag: (e, ui) => {
        const left = ui.position.left;
        const top = ui.position.top;
        const pos = axis === "x" ? left : top;

        $ruler.find('[data-c="pos"]').text(`${pos}px`);
      },
      stop: (e, ui) => {
        const left = ui.position.left;
        const top = ui.position.top;
        const pos = axis === "x" ? left : top;

        $ruler.find('[data-c="pos"]').text(`${pos}px`);
      },
      start: (e, ui) => {
        const left = ui.position.left;
        let top = ui.position.top;

        const pos = axis === "x" ? left : top;

        $ruler.find('[data-c="pos"]').text(`${pos}px`);
      }
    });

    $ruler.find('[data-c="pos"]').on('input', function (e) {
      const $this = $(this);
      let val = parseInt($this.text().trim(), 10);

      if (val === undefined || Number.isNaN(val)) {
        val = 0;
      }
      if (axis === "x") {
        $ruler.css({ left: val });
      } else {
        $ruler.css({ top: val });
      }

      const pos = $this.attr('data-pos');

      if (pos === "before") {
        $ruler.find('[data-c="pos"][data-pos="after"]').text(`${val}px`);
      } else {
        $ruler.find('[data-c="pos"][data-pos="before"]').text(`${val}px`);
      }
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

    clearAll: () => {
      $('[data-c="box"], [data-c="ruler"]').remove();
    },
  };
};