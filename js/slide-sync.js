window.onload = function(){

  var socket = io.connect('http://localhost');

  var SlideSync = function(){};
  SlideSync.prototype = window.slidedeck;

  SlideSync.prototype.onBodyKeyDown_ = function(e) {
    socket.emit('keypress', [e.keyCode]);
  };

  document.removeEventListener('keydown', window.slidedeck.onBodyKeyDown_);
  var slidesync = new SlideSync();
  document.addEventListener('keydown', slidesync.onBodyKeyDown_);

  socket.on('keypressed', function (data) {
    var e = $.Event("keydown");
    e.keyCode = data.keyCode[0];
    $(document).trigger(e);
  });
};
