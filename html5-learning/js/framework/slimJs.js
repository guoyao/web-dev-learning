/**
 * User: guoyao
 * Time: 06-19-2013 18:08
 * Blog: http://www.guoyao.me
 */

(function (window, undefined) {
    var slimJs = (function () {

        function $ (value) {
            var result;
            value = value.trim();
            if (value.indexOf("#") == 0) {
                result = document.getElementById(value.substring(1));
            }
            else {
                result = document.getElementsByTagName(value);
            }
            return result;
        }

        var utils = {
            StringUtil: {
                isNullString: function(value) {
                    return value == "null";
                },
                isEmptyString: function(value) {
                    return value == "";
                }
            }
        };

        return {
            version: "0.0.1",
            $: $,
            utils: utils
        };

    })();

    // Expose slimJs to the global object
    window.slimJs = slimJs;

})(window);
