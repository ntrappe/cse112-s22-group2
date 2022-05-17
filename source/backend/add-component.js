/**
 * @module Main
 */

 import DailyLog from './dailylog.js';

 /* grab the point on the HTML page to add component to */
 const main = document.getElementById('main');
 /* create an instance of the custom component DailyLog */
 const dailyLog = new DailyLog();
 /* append 1 daily log to the page */
 main.appendChild(dailyLog);
 /* append another daily log to the page */
 // main.appendChild (dailyLog);