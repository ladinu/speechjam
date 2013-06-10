function init() {

  var getAudioContext = function() {
    var context = ( window.AudioContext    || window.webkitAudioContext ||
                    window.mozAudioContext || window.msAudioContext );
    return new context();
  }

  navigator.getMedia = (
      navigator.getUserMedia    || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia );


  var context = getAudioContext();
  var options = {'audio': true, 'video': false};

  navigator.getMedia(options, function(stream) {
    console.log("> Stream URL:", URL.createObjectURL(stream));
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
