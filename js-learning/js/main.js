/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 12-12-27
 * Time: 上午11:10
 * To change this template use File | Settings | File Templates.
 */

function $(id) {
    return document.getElementById(id);
}

window.onload = function () {
    for (var i = 1; i < 6; i++) {
        $("button" + i).addEventListener("click", function (ii) {
            return function () {
                alert(ii);
            }
        }(i));
    }
};

