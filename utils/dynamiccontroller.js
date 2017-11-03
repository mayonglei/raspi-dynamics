//设置L298N使用的各GPIO端口
var gPinLRIn = [11, 12, 15, 16];    //pin in
var gPinLREn = [7, 18];             //pin enable
var stop = true;
var shell = require('./shellUtils');
/*
 * 动力控制器
 * */
var dynamicController = function () {
    initGpio();
}


//移动,[dir]f:进,b:退,l:左,r:右;[speed]速度，1-10
dynamicController.prototype.move = function (dir, speed) {
    console.log('motor move,dir:' + dir + ',speed:' + speed);
    doMove(dir, speed);
}

function initGpio() {
    setPinMode(gPinLRIn, 'out');
    writePinValue(gPinLRIn, 0);
    initSpeed(gPinLREn);
}

function doMove(dir, speed) {
    setSpeed(speed);
    switch (dir) {
        case 'f':  //forward
            writePinValue([gPinLRIn[0], gPinLRIn[2]], 1);
            writePinValue([gPinLRIn[1], gPinLRIn[3]], 0);
            break;
        case 'b':  //backward
            writePinValue([gPinLRIn[0], gPinLRIn[2]], 0);
            writePinValue([gPinLRIn[1], gPinLRIn[3]], 1);
            break;
        case 'l':  //left
            writePinValue([gPinLRIn[0], gPinLRIn[1]], 1);
            writePinValue([gPinLRIn[2], gPinLRIn[3]], 0);
            break;
        case 'r':  //right
            writePinValue([gPinLRIn[0], gPinLRIn[1]], 0);
            writePinValue([gPinLRIn[2], gPinLRIn[3]], 1);
            break;
        default :
            break;
    }
}

function setPinMode(pins, mode) {
    for (var i = 0; i < pins.length; i++) {
        var command = 'gpio mode ' + pins[i] + ' ' + mode;
        shell.execute(command);
    }
}

function writePinValue(pins, value) {
    for (var i = 0; i < pins.length; i++) {
        var command = 'gpio write ' + pins[i] + ' ' + value;
        shell.execute(command);
    }
}

function initSpeed(pins) {
    for (var i = 0; i < pins.length; i++) {
        var command = 'gpio mode ' + pins[i] + ' pwm';
        shell.execute(command);
        command = 'gpio pwm-ms';
        shell.execute(command);
        command = 'gpio pwmr 1024';
        shell.execute(command);
        command = 'gpio pwmc 1024';
        shell.execute(command);
        command = 'gpio pwm ' + pins[i] + ' 0';
        shell.execute(command);
    }
}

function setSpeed(speed) {
    speed = Math.abs(speed);
    if (speed > 1024) {
        speed = 1024;
    }

    for (var i = 0; i < gPinLREn.length; i++) {
        var command = 'gpio pwm ' + gPinLREn[i] + ' ' + speed;
        shell.execute(command);
    }
}

module.exports = new dynamicController();
