/**
 * @module Main
 */

 import DailyLog from './components/daily-log/daily-log.js';

 /* grab the point on the HTML page to add component to */
 const main = document.getElementById('main');
 /* create an instance of the custom component DailyLog */
 const dailyLog = new DailyLog();

 main.appendChild(dailyLog);

 /* append 1 daily log to the page */
 /* append another daily log to the page */
 // main.appendChild (dailyLog);