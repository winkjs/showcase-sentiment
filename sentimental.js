var s = require( 'wink-sentiment' );

var colorize = function ( score ) {
  var neutral = 'c8ccd1';

  var sad = [ // From sad to saddest
    '6e76af',
    '495193',
    '323a80',
    '1e276b',
    '1e276b'
  ];

  var happy = [ // From happy to happiest
    '89415e',
    'a55e7b',
    'd0809d',
    'e09bb4',
    'eebacd'
  ];

  var s = Math.round( score / 2.0 );
  var color;

  // Update color
  if ( s === 0 ) {
    color = neutral;
  } else if ( s > 0 ) {
    color = happy[ s - 1 ];
  } else {
    color = sad[ Math.abs( s ) - 1];
  }
  document.body.style.backgroundColor = '#' + color;

  // Update score and legend
  document.getElementById('score').innerHTML = s;
  var relativePosition = Math.abs(s) * 10;
  relativePosition = (relativePosition > 40 ) ? 40 : relativePosition;
  relativePosition = ( s < 0 ) ? (relativePosition * - 1) : relativePosition;
  var position = 50 + relativePosition;
  document.getElementById('score').style.left = position + '%';
  console.log(position);
}

document.getElementById( "textarea" ).addEventListener( "keydown", function () {
  colorize( s( this.value).score );
} );

document.addEventListener( 'DOMContentLoaded', function () {
  var poems = [
    "Earthquakes thunder past,\nbut the canary survives,\na yellow phrase on \nthe perennial.\nWhirlwinds sunder our lives\nbut small things still matter.",
    "Some blues are sad\nBut some are glad,\nDark-sad or bright-glad\nThey're all blues.\n\nThe colors of colors\nThe blues are more than a color\nThey're a moan of pain\nA taste of strife\nAnd a sad refrain.",
    "Today was not fun.",
    "Sometimes I can be so short sighted.",
    "That is just what I need, great! Terrific!",
    "Not so well done my boy! I am unhappy.",
    "Got a flat tyre on my way to the mall 😕 This is just great 😒😒",
  ]
  var i=0;
  var params = new URLSearchParams(window.location.search);

  if ( !params.has('text') ) return;
  var text = params.get('text');



  function typeChar(t) {
    document.getElementById( "textarea" ).value =  document.getElementById( "textarea" ).value + text[i];
    colorize( s( document.getElementById( "textarea" ).value).score );

    window.setTimeout( function () {
      if ( i < text.length-1 ){
        i++;
        var newT = 100;
        if ( text[i] === ' ' ) {
          newT = 30;
        }
        if ( text[i] === '\n' ) {
          newT = 300;
        }
        typeChar(newT);
      }
    }, t)
  }

  window.setTimeout( function () {
    document.getElementById( "textarea" ).value = "";
    typeChar(100);
  }, 500)

})
