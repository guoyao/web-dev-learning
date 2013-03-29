/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 12-12-27
 * Time: 上午11:10
 * To change this template use File | Settings | File Templates.
 */

for (var i = 1; i < 4; i++) {
    (function (ii) {
        setTimeout(function () {
            console.log(ii);
        }, 0);
    })(i);
}