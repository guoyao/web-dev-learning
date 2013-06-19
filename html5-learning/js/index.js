/**
 * User: guoyao
 * Time: 11/26/11 2:00 PM
 */

(function () {
    var modules = [
        new Module("Local Storage", "localStorage"),
        new Module("Geolocation", "geolocation"),
        new Module("Ajax", "ajax"),
        new Module("Canvas", "canvas"),
        new Module("Video", "video")
    ];

    $(document).ready(function () {
        for (var i in modules) {
            $("<div></div>").wrapInner("<a href='" + modules[i].artifact + "'>" + modules[i].name + "</a>").appendTo($("#navigator"));
        }
        $("#navigator a").click(function (event) {
            event.preventDefault();
            $("#navigator div").removeClass("selected");
            $(this).parent().addClass("selected");
            loadExample($(this).attr("href"));
        });
    });
})();

function Module(name, artifact) {
    this.name = name;
    this.artifact = artifact;
}

function loadExample(name) {
    var css = document.createElement("link");
    css.setAttribute("href", "view/" + name + "/_index.css");
    css.setAttribute("rel", "stylesheet");
    slimJs.$("head")[0].appendChild(css);
    $("#shell").load(GLOBAL.getRandomedUrl("view/" + name + "/_index.html"), function () {
        $.getScript("view/" + name + "/_index.js");
    });
}