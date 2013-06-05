function init() {
  var context = new window.webkitAudioContext();
  var options = {'audio': true, 'video': false};

  navigator.webkitGetUserMedia(options, function(stream) {
    var mic = context.createMediaStreamSource(stream);
    var filter = context.createDelay();

    filter.delayTime.value = 0.25;

    mic.connect(filter);
    filter.connect(context.destination);

    // Handle slider
    var delay  = document.getElementById('delay');
    var slider = document.getElementById('slider');
    
    slider.onchange = function(e) {
      filter.delayTime.value = slider.value;
      delay.innerHTML = slider.value;
    }
  }, handleError);

  var handleError = function() {
    console.log('> ERROR ', arguments);
  }

}
