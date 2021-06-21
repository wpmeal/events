
// initialize Event class only once
if (typeof initEvent == "undefined") {

    initEvent = new Event();

}

// get and render all events from server
initEvent.getEvents();


