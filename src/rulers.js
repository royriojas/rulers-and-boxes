export const initRulers = () => {
  if (window.__rulers) {
    console.log('rulers already loaded');
    return;
  }
  
  const $ = window.jQuery;
  
  let $currentTarget = null;
      
  $('body').on('mousedown', (e) => {
    $currentTarget?.removeClass('rulers-box-selected');
        
    const $box = $(e.target).closest('[data-c="box"]') 
    const $ruler = $(e.target).closest('[data-c="ruler"]');
    const $target = $box?.length ? $box : $ruler;
    
    if ($target?.length === 0) {
      $currentTarget = null;
      return;
    }
    
    $currentTarget = $target;
    $target.addClass('rulers-box-selected');
  });
  
  $('body').on('keydown', (e) => {
    if (!$currentTarget || $currentTarget.length === 0) return;
    if (e.key === 'Escape') {
      $currentTarget?.removeClass('rulers-box-selected');
      $currentTarget = null;
    }

    if (e.key === 'Delete') {
      $currentTarget?.remove();
      $currentTarget = null;
    }
    const displacement = e.metaKey ? 10 : 1;
    
    if (e.metaKey) {
      e.preventDefault();
    }
    
    const axis = $currentTarget?.attr('data-axis');
    
    if (e.key === 'ArrowUp') {
      if (!axis || axis === 'y') {
        $currentTarget?.css({ top: `-=${displacement}px` });
      }
    }
    if (e.key === 'ArrowDown') {
      if (!axis || axis === 'y') {
        $currentTarget?.css({ top: `+=${displacement}px` });
      }
    }
    if (e.key === 'ArrowLeft') {
      if (!axis || axis === 'x') {
        $currentTarget?.css({ left: `-=${displacement}px` });
      }
    }
    if (e.key === 'ArrowRight') {
      if (!axis || axis === 'x') {
        $currentTarget?.css({ left: `+=${displacement}px` });
      }
    }
  });
  
  const createBox = () => {
    const w = 100;
    const h = 100;
  
    const $box = $(`<div data-c="box" tab-index="1" class="rulers-box"><span data-size>${w}, ${h}</span></div>`).appendTo('body');
    $box.css({ width: w, height: h });
    $box.draggable().resizable({
      resize(event, ui) {
        $box.find('[data-size]').text(`${ui.size.width}, ${ui.size.height}`);
      }
    });
  };
  
  const createRuler = (axis) => {
    axis = axis || 'y';
  
    const dimensions = axis === 'y' ? 'width:100vw; height: 40px;' : 'height: 100vh;width: 40px;';
  
    const closeStyle = 'color:#fff;position:absolute;right:10px;top:5px;font-size:12px;text-decoration:none;';
    const $ruler = $(`<div data-c="ruler" style="${dimensions}" class="rulers-box-ruler" data-axis="${axis}">
                      <a data-cmd="close" style="${closeStyle}">
                        <span>close</span>
                      </a>
                    </div>`).appendTo('body');
  
    $ruler.draggable({
      axis: axis
    });
  
    $ruler.on('click', '[data-cmd=close]', function (e) {
      $ruler.remove();
      $currentTarget = null;
      return false;
    });
  };
  
  const style = document.createElement('style');
  
  style.innerHTML = `
  .rulers-box {
    background: rgba(0,0,0,.4);
    position:fixed;
    top: 0;
    left: 0;
    z-index: 9999999999999;
    font-size: 12px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  
  .rulers-box-ruler {
    cursor:pointer; 
    background: rgba(0,0,0,.4);
    position:fixed;
    top:0;
    left:0;
    z-index:9999999999999;
    outline: 1px solid red;
  }
  
  .rulers-box-selected {
    outline: 1px solid green;
  }
  `;
  
  document.head.appendChild(style);
  
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