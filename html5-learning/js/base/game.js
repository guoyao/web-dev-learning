/**
 * User: wuguoyao
 * Time: 2/5/12 5:59 PM
 */

var GAME = {
    collision: function (a, b) {
        if (a.x + a.width < b.x)
            return false;
        if (b.x + b.width < a.x)
            return false;
        if (a.y + a.height < b.y)
            return false;
        if (b.y + b.height < a.y)
            return false;
        return true;
    }
};