/**
 * User: guoyao
 * Time: 07-26-2013 18:01
 * Blog: http://www.guoyao.me
 */

(function ($) {

//    (function () {
        $,fn.graceNav = function () {
            return this.find(".item").each(function () {
                $(this).mouseover(function () {
                    console.log(this);
                });
            });
        };
//    })();

})(jQuery);