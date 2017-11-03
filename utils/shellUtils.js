/**
 * Created by mayonglei on 2017/10/31.
 */

var execSync = require('child_process').execSync;
var exec = require('child_process').exec;

var shellUtils = function () {

};

shellUtils.prototype.execute = function (commond, nolog) {
    //log('同步执行命令:\n' + commond);
    var s = execSync(commond).toString();
    if (!nolog) {
        //log('同步执行命令结果:\n' + s);
    }
    return s;
};

shellUtils.prototype.executeAsync = function (commond, callback) {
    exec(commond, function (err, stdout, stderr) {
        if (callback) {
            callback(err, stdout, stderr);
        }
    });
};

module.exports = new shellUtils();