const d = new Date()
// checking it it's a weekday
if (d.getDay() === 0) {
    console.log('It\'s a sunday');
    // time conditions for the following: 11am to 6pm, 6pm to 8pm, 8pm to 11:30pm
    if (d.getHours() >= 11 && d.getHours() < 18) {
        console.log('It\'s time for brunch');
    }
    else if (d.getHours() >= 18 && d.getHours() < 20) {
        console.log('It\'s time for dinner');
    }
    else if ((d.getHours() >= 20 && d.getHours() < 23) || (d.getHours() < 24 && d.getMinutes() < 30)) {
        console.log('It\'s time for drinks');
    }
    else {
        console.log('Sorry, we are closed');
    }
}
else {
    console.log('It\'s a weekday');
}
console.log(d);