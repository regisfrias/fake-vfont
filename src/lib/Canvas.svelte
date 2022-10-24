<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { Typr, TyprU } from 'typr-ts'; // Library to load and parse the font files [TODO: link]
  import RobotoSlabBlack from '../assets/fonts/RobotoSlab-Black.ttf'; // Bold font
  import RobotoSlabThin from '../assets/fonts/RobotoSlab-Thin.ttf';   // Thin font
  import { loadFont, getDPR, layoutText, pathDiffs, distanceToPoint } from './utils';
  import type { TextBoxType, ControlsType } from '../types';
  
  export let controls: ControlsType;
  export let textBox: TextBoxType;
  let drag = {isDragging: false, x: 0, y: 0, xAbs: 0, yAbs: 0}
  let canvas: HTMLCanvasElement;

  ////////////////
  // Load fonts //
  // 1.1. Load fonts as promises (see 'utils.js')
  const fontStrongBuffer = loadFont(RobotoSlabBlack);
  const fontMildBuffer = loadFont(RobotoSlabThin);
  let fontStrong;
  let fontMild;

  Promise.all([fontStrongBuffer, fontMildBuffer]).then(function(fonts) {
    // 1.1. We get the fonts as a ArrayBuffers ('fonts')
    // 2. Parse ArrayBuffers to get font objects
    fontStrong = Typr.parse(fonts[0]);
    fontMild = Typr.parse(fonts[1]);

    // 3. After we have the font objects
    //    we trigger the drawing function,
    //    which will print things on screen
    draw();
  });
  ////////////////

  afterUpdate(() => {
    if (textBox) {
      draw()
    }
  })

  const isTouchDevice = () => (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))

  function draw() {
    const dpr = getDPR();
    // 4. Set canvas width to match sourceTextBox
    canvas.width = Math.floor(textBox.width * dpr);
    canvas.height = Math.floor(textBox.height * dpr);
  
    // Set up canvas
    const scale = textBox.fontSize * dpr / fontStrong.head.unitsPerEm; // Typr.js uses sizes in 'em' unit
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // redraw on blank canvas every frame
    ctx.save();

    scaleCnv(canvas); // Set canvas size to the same as sourceTextBox based on device pixel ratio
    ctx.scale(scale,-scale); // Also scale the 2D context

    // 5. Lay out text based on the text box.
    //    The sourceText comes as a continuous string,
    //    so we need to break lines according to font size
    //    and amount of text.
    const laidoutText = layoutText(textBox.text, fontStrong, scale, canvas.width);  
    let tpath = {cmds:[], crds:[]};

    // 6. Loop through each line of laid out text.
    laidoutText.map( (txt, lineNumber ) => {
      // Get glyph IDs    
      const gls = TyprU.stringToGlyphs(fontStrong, txt);

      // Initialise 'x' position
      let x = 0;

      // 6.a Loop through each glyph.
      for(var i=0; i<gls.length; i++) {
        var gid = gls[i];
        if(gid==-1) continue;

        var gid2 = (i<gls.length-1 && gls[i+1]!=-1)  ? gls[i+1] : 0;
        var path = TyprU.glyphToPath(fontMild, gid);
        var pathStrong = TyprU.glyphToPath(fontStrong, gid);
        const diffs = pathDiffs(path, pathStrong);

        // 6.b Loop through each coordinate.
        for(var j=0; j<path.crds.length; j+=2) {
          // Get difference between each coordinate (bold to thin)
          const pointX = path.crds[j] + x;
          const pointXDiff = diffs.crds[j];
          const pointY = path.crds[j+1];
          const pointYDiff = diffs.crds[j+1];
          const yOffset = (lineNumber+0.75) * fontStrong.head.unitsPerEm;
          
          // If 'bulge' is set to true
          // get the distance between current point
          // and bulge position (slider 0–slider width)
          const bulgeX = distanceToPoint(pointX * scale, drag.x * textBox.width, 0, controls.radius.x);
          const bulgeY = distanceToPoint((pointY - yOffset) * scale, (drag.y - 1) * textBox.height, 0, controls.radius.y);

          const bulgeAmount = (controls.bulge.x ? bulgeX : 1) * (controls.bulge.y ? bulgeY : 1);

          // 6.c. For each coordinate multiply the amount of thickness and the diff between each font weight.
          const coordX = pointX + (pointXDiff * controls.thickness * bulgeAmount);
          const coordY = pointY + (pointYDiff * controls.thickness * bulgeAmount) - yOffset;

          // Add the coordinates to the array
          // This will be added to the canvas context by
          // 'TyprU.pathToContext(tpath, ctx)' (see below)
          tpath.crds.push(coordX);
          tpath.crds.push(coordY);
        }

        for(var j=0; j<path.cmds.length; j++) tpath.cmds.push(path.cmds[j]);

        // Correct letter spacing for bulge if set.
        const bulgeAmount = controls.bulge.x ? distanceToPoint(x*scale, drag.x * textBox.width, 0, canvas.width) : 1;
        
        const diff = fontStrong.hmtx.aWidth[gid] - fontMild.hmtx.aWidth[gid];

        // Increment 'x' position for each glyph by its width
        // Also compensate for font weight (if thin, this should be smaller)
        x += fontMild.hmtx.aWidth[gid] + (diff * controls.thickness * bulgeAmount);

        // Adjust kerning
        if(i<gls.length-1) x += TyprU.getPairAdjustment(fontStrong, gid, gid2);
      }
    });

    ctx.fillStyle = 'black';
    TyprU.pathToContext(tpath, ctx);
    ctx.fill('evenodd');

    ctx.restore();

    if (controls.debug) {
      ctx.beginPath();
      ctx.strokeStyle = '#678f9f';
      ctx.moveTo(drag.xAbs, drag.yAbs - 20);
      ctx.lineTo(drag.xAbs, drag.yAbs + 20);
      ctx.moveTo(drag.xAbs - 20, drag.yAbs);
      ctx.lineTo(drag.xAbs + 20, drag.yAbs);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(drag.xAbs, drag.yAbs, controls.radius.x, controls.radius.y, 0, -Math.PI, Math.PI);
      ctx.stroke();
    }
  }

  function scaleCnv(canvas) {
    const dpr = getDPR();
    canvas.setAttribute("style", "width:"+(canvas.width/dpr)+"px; height:"+(canvas.height/dpr)+"px");
  }

  function setDrag(evt: MouseEvent | TouchEvent) {
    const dpr = getDPR();
    const isTouch = isTouchDevice();
    if (isTouch) {
      evt.preventDefault();
    }
    const target = (evt.target as HTMLCanvasElement);
    const targetBox = target.getBoundingClientRect();
    const offsetX = (isTouch ? (evt as TouchEvent).touches[0].clientX - targetBox.left : (evt as MouseEvent).offsetX) * dpr;
    const offsetY = (isTouch ? (evt as TouchEvent).touches[0].clientY - targetBox.top : (evt as MouseEvent).offsetY) * dpr;
    const x = (offsetX / target.width) * dpr;
    const y = 1 - (offsetY / target.height) * dpr;
    const xAbs = offsetX;
    const yAbs = offsetY;
    return { x, y, xAbs, yAbs }
  }

  function onDragStart(evt: MouseEvent | TouchEvent) {
    const offset = evt && (evt as TouchEvent).touches ? {
      x: (evt as TouchEvent).touches[0].clientX,
      y: (evt as TouchEvent).touches[0].clientY,
    } : {x: 0, y: 0}
    const {x, y, xAbs, yAbs} = setDrag(evt);
    drag = {isDragging: true, x, y, xAbs, yAbs}
  }

  function onDrag(evt) {
    if (drag.isDragging) {
      const {x, y, xAbs, yAbs} = setDrag(evt);
      drag.x = x;
      drag.y = y;
      drag.xAbs = xAbs;
      drag.yAbs = yAbs;
      draw();
    }
  }

  function onDragEnd() {
    drag.isDragging = false;
  }
</script>

<canvas
  on:mousedown={onDragStart}
  on:touchstart={onDragStart}
  on:mousemove={onDrag}
  on:touchmove={onDrag}
  on:mouseup={onDragEnd}
  on:touchend={onDragEnd}
  bind:this={canvas}
  class="row_body"
></canvas>

<style>
  canvas {
    max-width: 100%;
  }
</style>
