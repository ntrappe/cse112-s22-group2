import { launchBulletModal } from './notes-script.js';
export var longpress = false;
export var presstimer = null;
export var longtarget = null;

export var cancel = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
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
};

export var start = function(e) {
    var target = e.currentTarget;

    if (e.type === "click" && e.button !== 0) {
        return;
    }
    
    longpress = false;
    
    this.classList.add("longpress");
    
    presstimer = setTimeout(function() {
        launchBulletModal(target);
        console.log('got a long press!');
        longpress = true;
    }, 1000, target);
    return false;
};