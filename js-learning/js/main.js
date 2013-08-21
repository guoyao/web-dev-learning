/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 12-12-27
 * Time: 上午11:10
 * To change this template use File | Settings | File Templates.
 */

(function (window, document) {
    var $ = function (id) {
        return document.getElementById(id);
    };

    var isString = function (value) {
        return typeof value === "string";
    };

    var toNumber = function (numeric, fallback) {
        return isNaN(numeric) ? (fallback || 0) : Number(numeric);
    };

    // `pfx` is a function that takes a standard CSS property name as a parameter
    // and returns it's prefixed version valid for current browser it runs in.
    // The code is heavily inspired by Modernizr http://www.modernizr.com/
    var pfx = (function () {

        var style = document.createElement('dummy').style,
            prefixes = 'Webkit Moz O ms Khtml'.split(' '),
            memory = {};

        return function ( prop ) {
            if ( typeof memory[ prop ] === "undefined" ) {

                var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
                    props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');

                memory[ prop ] = null;
                for ( var i in props ) {
                    if ( style[ props[i] ] !== undefined ) {
                        memory[ prop ] = props[i];
                        break;
                    }
                }

            }

            return memory[ prop ];
        };

    })();

    // `translate` builds a translate transform string for given data.
    var translate = function ( t ) {
        return " translate3d(" + t.x + "px," + t.y + "px," + t.z + "px) ";
    };

    // `rotate` builds a rotate transform string for given data.
    // By default the rotations are in X Y Z order that can be reverted by passing `true`
    // as second parameter.
    var rotate = function ( r, revert ) {
        var rX = " rotateX(" + r.x + "deg) ",
            rY = " rotateY(" + r.y + "deg) ",
            rZ = " rotateZ(" + r.z + "deg) ";

        return revert ? rZ+rY+rX : rX+rY+rZ;
    };

    // `scale` builds a scale transform string for given data.
    var scale = function ( s ) {
        return " scale(" + s + ") ";
    };

    // `perspective` builds a perspective transform string for given data.
    var perspective = function ( p ) {
        return " perspective(" + p + "px) ";
    };

    // `css` function applies the styles given in `props` object to the element
    // given as `el`. It runs all property names through `pfx` function to make
    // sure proper prefixed version of the property is used.
    var css = function ( element, props ) {
        var style = isString(element) ? $(element).style : element.style;
        var key, pkey;
        for ( key in props ) {
            if ( props.hasOwnProperty(key) ) {
                pkey = pfx(key);
                if ( pkey !== null ) {
                    style[pkey] = props[key];
                }
            }
        }
        return el;
    };

    window.onload = function () {
        for (var i = 1; i < 6; i++) {
            $("button" + i).addEventListener("click", function (ii) {
                return function () {
                    console.log(ii);
                }
            }(i));
        }
        $("button1").addEventListener("click", function () {
            css("step1", {
                transform: translate({
                    x: toNumber(100),
                    y: toNumber(100),
                    z: toNumber(100)
                }) +
                rotate({
                    x: toNumber(45),
                    y: toNumber(0),
                    z: toNumber(45)
                }, false) +
                scale(toNumber(0.5, 1)),
                transformOrigin: "top left"
            });
            alert($("step1").style.transform);
        });
//        console.log(navigator.userAgent);
    };

    var arrayify = function (a) {
        return Array.prototype.slice.call(a);
    };

})(window, document);
