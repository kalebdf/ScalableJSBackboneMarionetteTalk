(function() {
  'use strict';

  describe("bespoke-scale", function() {

    var container, deck,

      createDeck = function(width, height) {
        var style = document.createElement('style'),
          parent = document.createElement('article');

        container = document.createElement('div');

        style.innerText =
          '.bespoke-parent { position: absolute; width: ' + width + 'px; height: ' + height + 'px; }' +
          '.bespoke-slide { position: absolute; left: 50%; top: 50%; width: 100px; height: 100px; margin-left: -50px; margin-top: -50px; }';

        for (var i = 0; i < 10; i++) {
          parent.appendChild(document.createElement('section'));
        }

        container.appendChild(style);
        container.appendChild(parent);
        document.body.appendChild(container);

        deck = bespoke.from(parent, {
          scale: true
        });
      },

      destroyDeck = function() {
        document.body.removeChild(container);
      },

      resize = function(el, width, height) {
        el.style.width = width + 'px';
        el.style.height = height + 'px';

        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      },

      actualSize = function(el, dimension) {
        return el['offset' + (dimension === 'width' ? 'Width' : 'Height')] * el.style.zoom;
      };

    describe("loading a 4x3 pressentation", function() {

      beforeEach(createDeck.bind(null, 1024, 768));

      it("should resize the slide to fit the height of the deck", function() {
        expect(actualSize(deck.slides[0], 'height')).toBe(deck.parent.offsetHeight);
      });

      describe("resizing the window to a 3x4 ratio", function() {

        beforeEach(function() {
          resize(deck.parent, 768, 1024)
        });

        it("should resize the slide to fit the width of the deck", function() {
          expect(actualSize(deck.slides[0], 'width')).toBe(deck.parent.offsetWidth);
        });

      });

    });

    describe("loading a 16x9 pressentation", function() {

      beforeEach(createDeck.bind(null, 1280, 720));

      it("should resize the slide to fit the height of the deck", function() {
        expect(actualSize(deck.slides[0], 'height')).toBe(deck.parent.offsetHeight);
      });

    });

    describe("loading a 3x4 pressentation", function() {

      beforeEach(createDeck.bind(null, 480, 640));

      it("should resize the slide to fit the width of the deck", function() {
        expect(actualSize(deck.slides[0], 'width')).toBe(deck.parent.offsetWidth);
      });

    });

  });

}());
