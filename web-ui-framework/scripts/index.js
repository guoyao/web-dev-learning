/**
 * User: guoyao
 * Time: 07-25-2013 13:33
 * Blog: http://www.guoyao.me
 */

(function (document, $) {
    var modules = [
        new Module("Dropdown Menu", "dropdown-menu"),
        new Module("Tab Navigator", "tab-navigator")
    ];

    function Module(name, artifact) {
        this.name = name;
        this.artifact = artifact;
    }

    var randomQueryString = function (value) {
        return value + "?" + new Date().getTime();
    };

    var loadDemo = function (url) {
        $('<link rel="stylesheet" href="' + url + '/_index.css"/>').appendTo($("head")[0]);
        $("#shell").load(randomQueryString(url + "/_index.html"), function () {
            $.getScript(url + "/_index.js");
        });
    };

    var init = function () {
        var $navigator = $("#navigator");
        for (var i = 0, length = modules.length; i < length; i++) {
            $("<div></div>").wrapInner("<a href='demos/" + modules[i].artifact + "'>" + modules[i].name + "</a>").appendTo($navigator);
        }

        var selectedItem;
        $navigator.find("a").click(function () {
            if (selectedItem == this) {
                return false;
            }
            if (selectedItem) {
                $(selectedItem).parent().removeClass("selected");
            }
            selectedItem = this;
            $(this).parent().addClass("selected");
            loadDemo(this.href);
            return false;
        });
    };

    $(document).ready(init);

})(document, jQuery);
