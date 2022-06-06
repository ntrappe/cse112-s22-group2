import { launchBulletModal } from "/source/scripts/notes-script.js";
export var longpress = false;
export var presstimer = null;
export var longtarget = null;
//export const mostRecentBullet = null;

export var cancel = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
    //console.log(e.target);
    this.classList.remove("longpress");
};

export var click = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
    
    this.classList.remove("longpress");
    
    if (longpress) {
        return false;
    }
    //alert("press");
    //console.log(e.target);
};

export var start = function(e) {
    var target = e.currentTarget;
    //console.log(target);
    if (e.type === "click" && e.button !== 0) {
        return;
    }
    
    longpress = false;
    
    this.classList.add("longpress");
    
    presstimer = setTimeout(function() {
        //alert("long click");
        //console.log(targ);
        launchBulletModal(target);
        longpress = true;
    }, 1000, target);
    //console.log(e.target);
    return false;
};

// node.addEventListener("mousedown", start);
// node.addEventListener("touchstart", start);
// node.addEventListener("click", click);
// node.addEventListener("mouseout", cancel);
// node.addEventListener("touchend", cancel);
// node.addEventListener("touchleave", cancel);
// node.addEventListener("touchcancel", cancel);