/**
 * User: guoyao
 * Time: 11/26/11 2:00 PM
 */

var GLOBAL = {

    keyboard: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        A: 65
    },

    isNullString: function(value) {
        return value == "null";
    },

    isEmptyString: function(value) {
        return value == "";
    },

    getStoredArray: function(key) {
        var playlistArray = localStorage.getItem(key);
        return (playlistArray == null || GLOBAL.isEmptyString(playlistArray) ||
            GLOBAL.isNullString(playlistArray)) ? [] : JSON.parse(playlistArray);
    },

    getRandomedUrl: function (url) {
        return url + "?" + new Date().getTime();
    },

    inherit: function (subClass, superClass) {
        var tempFunc = function() {};
        tempFunc.prototype = superClass.prototype;
        subClass.prototype = new tempFunc();
        subClass.prototype.constructor = subClass;
        subClass.superClass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    }
};