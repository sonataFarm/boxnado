$(() => {
  const Cell = require ('./cell.js');
  const Render = require('./render.js');
  const Board = require('./board.js');

  const TICK_DELAY = 0;
  const BOARD_SHIFT_DELAY = 2000;

  function tick(boards) {
    boards.forEach((board) => board.tick());
    new Render(boards).tick();
    // Render.styleLogo(); // apply average of colors in canvas 1 to logo
    $('html').css({'background-image':"url(" + boards[0].canvas.toDataURL("image/png")+ ")" });
    // $('.navbar a').css('border', '1px solid '+ boards[0].getLightestColor();
    setTimeout(tick.bind(this, boards), TICK_DELAY);
  }

  function shiftBoards(boards) {
    const firstCanvas = boards[0].canvas;

    boards.forEach((board, idx, boards) => {
      if (idx < boards.length - 1) {
        board.setCanvas(boards[idx + 1].canvas);
      }
    });

    boards.pop();
    boards.unshift(new Board(firstCanvas));

    let dark = boards[0].getDarkestColor();
    let light = boards[0].getLightestColor();
    let avg = boards[0].getAverageColor();

    if (!light.contrastsWith(dark)) {
      light = light.mask(dark.getContrastYIQ());
    }

    $('.navbar').css({'background-image':"url(" + boards[0].canvas.toDataURL("image/png")+ ")" });

    $('.navbar a').css({
      'color': light.toCssString(),
      'background': dark.toCssString(),
    });

    $('.navbar a').hover(function() {
      $(this).css({
        'border-width': 0,
        'color': dark.toCssString(),
        'background': light.toCssString(),
        // 'border': '1px solid ' + avg.toCssString()
      });
    }, function() {
      $(this).css({
        'color': light.toCssString(),
        'background': dark.toCssString()
      });
    });

    setTimeout(shiftBoards.bind(this, boards), BOARD_SHIFT_DELAY);
  }

  const canvases = $('.hero').toArray();
  const boards = canvases.map(canvas => new Board(canvas));
  const render = new Render(boards);

  // const renders = canvases.map((idx, canvas) => {
  //   const board = boards[idx];
  //   return new Render(canvas, board);
  // });

  // shiftBoards(boards);
  tick(boards);
  setTimeout(shiftBoards.bind(null, boards), 1000);
});
