"use strict";
exports.__esModule = true;
var Tasks = /** @class */ (function () {
    function Tasks(values) {
        Object.assign(this, values);
    }
    return Tasks;
}());
exports.Tasks = Tasks;
var task = new Tasks({
    id: 1,
    title: 'Complete',
    description: 'Finish',
    due: '02/22/2018',
    done: false
});
console.log(task);
