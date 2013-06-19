/**
 * User: wuguoyao
 * Time: 1/2/12 5:06 PM
 */

(function () {
    var video = slimJs.$("#video");
    video.addEventListener("canplaythrough", loadComplete);

    function loadComplete() {
        video.play();
    }
})();
