/**
 * User: guoyao
 * Time: 07-16-2013 18:30
 * Blog: http://www.guoyao.me
 */

/**
 * impress.js can't handle events(such as 'keyup', 'click', 'keydown') on html embed object element,
 * so we can't goto any slide when focus is on such element.
 * I use following code to fix this bug of impress.js.
*/

(function(window, document) {

    window.impress().init();

    var arrayify = function (value) {
        return Array.prototype.slice.call(value);
    };

    var $$ = function ( selector, context ) {
        context = context || document;
        return arrayify( context.querySelectorAll(selector) );
    };

    var init = function () {
        $$("object").forEach(initSvgObject);
    };

    var initSvgObject = function (svgObject) {
        var svgDocument;
        try {
            svgDocument = svgObject.contentDocument;
        } catch (err) {
            svgDocument = svgObject.getSVGDocument();
        }

        if(svgDocument) {
            svgDocument.addEventListener("keyup", function (e) {
                var event = document.createEvent("CustomEvent");
                event.initEvent(e.type, true, true);
                event.keyCode = e.keyCode;
                document.dispatchEvent(event);
            });
        }
    };

    window.onload = init;

})(window, document);