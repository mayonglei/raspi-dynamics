/*
 * 动力控制器
 * */
var dynamicController = function () {

}

//移动,[dir]f:进,b:退,l:左,r:右
dynamicController.prototype.move = function (dir) {
    doMove(dir);
}

//停止
dynamicController.prototype.stop = function () {
    doStop();
}

function doMove(dir) {
    switch (dir) {
        case 'f':  //进
            break;
        case 'b':  //退
            break;
        case 'l':  //左
            break;
        case 'r':  //右
            break;
        default :
            break;
    }
}

function doStop() {

}
module.exports = new dynamicController();
