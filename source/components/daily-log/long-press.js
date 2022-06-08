import { launchBulletModal } from './notes-script.js';

export let longpress = false;
export let presstimer = null;
export const longtarget = null;

export const cancel = function (e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
    this.classList.remove('longpress');
};

export const click = function (e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }

    this.classList.remove('longpress');

    if (longpress) {
        return false;
    }

    return true;
};

export const start = function (e) {
    const target = e.currentTarget;

    if (e.type === 'click' && e.button !== 0) {
        return;
    }

    longpress = false;

    this.classList.add('longpress');

    presstimer = setTimeout(() => {
        launchBulletModal(target);
        console.log('got a long press!');
        longpress = true;
    }, 1000, target);
};
