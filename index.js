function init() {
  var context = new window.webkitAudioContext();
  var options = {'audio': true, 'video': false};

  navigator.webkitGetUserMedia(options, function(stream) {
    var mic = context.createMediaStreamSource(stream);
    var filter = context.createDelay();

    filter.delayTime.value = 0.25;

    mic.connect(filter);
    filter.connect(context.destination);
  }, handleError);

  var handleError = function() {
    console.log('> ERROR ', arguments);
  }
}
