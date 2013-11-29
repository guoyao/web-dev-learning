/**
 * Author: guoyao
 * Time: 11-28-2013 19:44
 * Blog: http://www.guoyao.me
 */

var monkey = {
    hair: true,
    feeds: 'bananas',
    breathes: 'air'
};

function Human(name) {
    this.name = name;
}
Human.prototype = monkey;

var george = new Human('George');
console.log(george.prototype);
console.log(monkey.isPrototypeOf(george));
