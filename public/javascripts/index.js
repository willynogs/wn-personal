var circle = new mojs.Shape({
  shape:        'circle',
  radius:       {0 : 20},
  fill:         'none',
  stroke:       '#fff',
  strokeWidth:  1,
  x: -60,
  y: -10,
  duration: 1000,
  isShowStart:  true
}).play();

var tri = new mojs.Shape({
  shape:        'polygon',
  radius:       25,
  radiusY:      25,
  fill: 'none',
  stroke: '#fff',
  strokeWidth: 1,
  x: -70,
  y: 15,
  angle: {330 : 360},
  duration: 800,
  delay: 200,
  isShowStart:  true
}).play();

var zigzag = new mojs.Shape({
  shape:        'zigzag',
  points:       {0 : 17},
  radius:       {0 : 55},
  radiusY:      10,
  fill:         'none',
  stroke:       '#fff',
  strokeWidth: 1,
  angle: 0,
  x: {22.5 : 0},
  y: 45,
  duration: 1000,
  isShowStart:   true,
}).play();
