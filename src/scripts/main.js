(function () {
  'use strict';

  var deck = bespoke.horizontal.from('article', {
    scale: true,
    hash: true,
    state: true
  });

  var i, image, j, matches, rules, sheet;

  if (document.styleSheets) {
    for (i = 0; i < document.styleSheets.length; ++i) {
      sheet = document.styleSheets[i];
      if (sheet.rules) {
        for (j = 0; j < sheet.rules.length; ++j) {
          rules = sheet.rules[j];
          if (rules.style && rules.style.backgroundImage) {
            matches = rules.style.backgroundImage.match(/url\((.*)\)/);
            if (matches) {
              image = new Image();
              image.src = matches[1];
            }
          }
        }
      }
    }
  }

})();
