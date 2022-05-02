/** @constant @type {Audio} **/ 
const alarm = new Audio('./audio/notification-alert.wav');

/**
 * @name getAlarm
 * @function
 * @description Plays the alarm audio object for testing purposes
 * @return {Audio} The Audio element named alarm
 */
function getAlarm(){
    return alarm;
}

/**
 * @name playSound
 * @function
 * @description Plays the alarm three times to notfiy the user that the break or pomo has ended 
 */
function playSound(){
    //Play the alarm once
    alarm.play();
    //Wait 2 seconds then play it again
    setTimeout(function(){alarm.play();}, 2000);
    //Wait another 2 seconds to play it a third time
    setTimeout(function(){alarm.play();}, 4000);
    
}
 
/**
 * @name showNotif
 * @function
 * @description Displays the banner notification to notify the user which state has just finished 
 * @param {string} typeOfNotif Describes which notification and notification text should be displayed
 * @return {string} The message body of the notifcation
 */
function showNotif(typeOfNotif){
    // set the notification's title, icon, and body
    let title = 'Productoro';
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';
    let body = '';

    // body of notification depends on the current state
    if(typeOfNotif === 'Long Break State'){
        body = 'You have completed a pomo! Your long break begins now :)';
    }
    else if(typeOfNotif === 'Short Break State'){
        body = 'You have completed a pomo! Your short break begins now :)';
    }
    else if(typeOfNotif === 'Work State'){
        body = 'Your break has ended. A new pomo begins now :)';
    }

    if (typeof Notification !== 'undefined') {
        // display the notification
        let workNotif = new Notification(title,{body, icon});

        // close the notification after five seconds
        setTimeout(() => {
            workNotif.close();
        }, 5000);
    }

    return body;
}

/**
 * @name getNotificationStatus
 * @function
 * @description Collects the notification preferences of the user
 * @return {boolean} True if user prefers notifications; otherwise, false
 */
function getNotificationStatus(){
    if(!window.Notification){
        return false;
    }

    if(Notification.permission === 'granted'){
        return true;
    }  
    else if(Notification.permission === 'default'){
        Notification.requestPermission(); // prompt the user if notification preferences are not set
        return getNotificationStatus();
    }
    else{
        return false; // return false if notifications are disabled
    }
}

// export functions for testing
export { showNotif, getNotificationStatus, playSound, getAlarm };