(function(){
  
  function PianoPlayer(){
    var self = this;
    
    var audiocontext, pianobuffers = {};
    var initialized = false;
    
    self.play = PlayNote;
    
    self.onload = new Function();
    
    function PlayNote(note, deltatime){
      if(!initialized) return false;
      var buffer = pianobuffers[note];
      if(!buffer) return false;
      
      var deltatime = deltatime || buffer.duration;
      
      var source = audiocontext.createBufferSource();
      source.buffer = buffer;
      source.connect(audiocontext.destination);
      source.start(0);
      source.stop(deltatime);
      
      return true;
    }
    
    function InitPlayer(){
      initialized = true;
      console.log('Piano Player Initialized');
      self.onload(self);
    }
    
    function LoadAudioAPI(piano){
      if(!LoadContext()) return;
      
      var notes = 0;
      for(var note in piano){
        notes++;
        LoadNoteBuffer(note, piano[note], function(){
          if(--notes == 0) InitPlayer();
        });
      }
    }
    function LoadContext(){
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audiocontext = new AudioContext();
        return true;
      }catch(e){
        alert('Web Audio API is not supported in this browser');
        return false;
      }
    }
    function LoadNoteBuffer(note, url, callback){
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        audiocontext.decodeAudioData(request.response, function(buffer) {
          pianobuffers[note] = buffer;
          callback();
        }, function(){
          console.error('Error Loading Audio Clip');
        });
      }
      request.send();
    }
    
    (function Constructor(piano){
      LoadAudioAPI(piano);
    }).apply(self, arguments);
  }
  
  window.PianoPlayer = PianoPlayer;
  
})();