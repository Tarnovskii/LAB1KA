let isSystemOn = false;
let forceStop = true;
let delay = 200;
let oldDelay = 200;
let interval = function(){};
let logBuffer;

function delayConfig() {
    delay = document.getElementById("delayInput").value;
    document.getElementById("delayText").innerText = "Затримка: (" + delay + ") мс.";
    addToLog("Delay was changed to " + delay)

}

function work(statusObj) {
    addToLog("System started!");
    oldDelay = delay;
    addToLog("Saving start delay!");
    interval = setInterval(function () {
        addToLog("Checking delay!");
        if (oldDelay !== delay) {
            addToLog("Rebooting system, because delay was changed!");
            reboot(statusObj);
        }

        addToLog("Checking status: isSystemOn = " + isSystemOn);
        if (isSystemOn) {
            addToLog("Object is ON! Continue...");
            addToLog("Switching power off!");
            addToLog("Object turned down");
            statusObj.src = "img/redprocess.png";
            isSystemOn = !isSystemOn;
        } else {
            addToLog("Object is DOWN! Continue...");
            addToLog("Switching power on!");
            addToLog("Object turned on!");
            statusObj.src = "img/greenprogress.gif";
            isSystemOn = !isSystemOn;
        }

    }, delay);
}

function reboot(status) {
    addToLog("System down!");
    forceStop = true;
    clearInterval(interval);
    forceStop = false;
    work(status);
}

function init() {
    let stopb = document.getElementById("stopb");
    let startb = document.getElementById("startb");
    let status = document.getElementById("status");
    status.src = "img/redprocess.png";


    stopb.onclick = function () {
        if (!forceStop) {
            addToLog("Control level: LOW");
            clearInterval(interval);
            forceStop = true;
            isSystemOn = false;
            status.src = "img/redprocess.png";
        } else addToLog("System already down!");
    };

    startb.onclick = function() {
        if (!forceStop) addToLog("System already started");
        else {
            addToLog("Control level: HIGHT!");
            isSystemOn = true;
            forceStop = false;
            work(status);
        }
    }
}


function addToLog(phrase) {
    var scrollinDiv = document.getElementById('logConteiner');

    logBuffer +=  "Device said: " + phrase + "\n";

    log.textContent = logBuffer;
    scrollinDiv.scrollTop = 9999;
}
init();