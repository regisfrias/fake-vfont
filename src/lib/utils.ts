import { TyprU } from 'typr-ts';

export const loadFont = (path) => {
  // Let's return a promise which resolves to an ArrayBuffer 
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", path, true);
    request.responseType = "arraybuffer";
    request.onload = (e) => resolve((e.target as XMLHttpRequest).response);
    request.onerror = () => reject(request.statusText);
    request.send();
  });
};

// get device pixel ratio
export const getDPR = () => window["devicePixelRatio"] || 1;

// Break lines
// (there NUST be an easier way to do this...)
export const layoutText = (text, font, scale, boxWidth) => {
  const layedoutText = text.split(' ').reduce(function(accumulator, currentValue) {
    const glyphs = TyprU.stringToGlyphs(font, currentValue);
    const space = TyprU.stringToGlyphs(font, ' ');
    const measure = (measureWord(font, glyphs) + measureWord(font, space)) * scale; // We multiply by scale since the measureWord() function returns values in ems; also add space, lost in the split(' ')
    let brokenText = accumulator.brokenText.slice(0);
    let line = accumulator.line;
    let total = accumulator.total;

    if (total + measure > boxWidth) {
      line = accumulator.line + 1;
      total = 0;
      brokenText[line] = [];
    }

    brokenText[line].push(currentValue);

    let newObj = {
      ...accumulator,
      measure,
      line,
      brokenText,
      total: total + measure
    };

    return newObj;
  }, {total: 0, line: 0, brokenText: [[]]})
  .brokenText
  .map( text => text.join(' '));
  return layedoutText;
};

// Measure the width of a word in ems
function measureWord(font, gls){
	var x = 0;

	for (var i=0; i<gls.length; i++) {
		var gid = gls[i];  if(gid==-1) continue;
		var gid2 = (i<gls.length-1 && gls[i+1]!=-1)  ? gls[i+1] : 0;

		x += font.hmtx.aWidth[gid];// - font.hmtx.lsBearing[gid];
		if(i<gls.length-1) x += TyprU.getPairAdjustment(font, gid, gid2);
	}
	return x;
};

// Difference between bold and light paths
export const pathDiffs = (pathMild, pathStrong) => {
  return {
    cmds: pathMild.cmds,
    crds: pathMild.crds.map( (crd, i) => pathStrong.crds[i] - crd)
  };
};

export const distanceToPoint = (pointX, currentX, boundary1, boundary2) => {
  const distance = Math.min(Math.abs(pointX - currentX), boundary2) / (boundary2 - boundary1); // Between 0–1
  
  const mapToRadians = distance * Math.PI; // Between 0–PI
  const curve = Math.cos(mapToRadians) / 2 + 0.5;
  return curve;
};
