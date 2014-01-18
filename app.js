// Generated by CoffeeScript 1.6.3
(function() {
  var Message, apiKey, speechRecognition;

  apiKey = 'AIzaSyDUpThQIyJRlszXEnT2HvSMbPbObbcYNE4';

  speechRecognition = function(language, onresult) {
    var recognition;
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interminResults = false;
    recognition.onstart = function() {
      return recognition.lang = language;
    };
    recognition.onresult = onresult;
    recognition.onerror = function(err) {
      return console.error(err);
    };
    return recognition.onend = function() {};
  };

  Message = (function() {
    function Message(speaker, text, language) {
      this.speaker = speaker;
      this.text = text;
      this.language = language;
    }

    Message.prototype.speak = function() {
      var msg;
      msg = new SpeechSynthesisUtterance();
      msg.text = this.text;
      msg.lang = this.language;
      return window.speechSynthesis.speak(msg);
    };

    Message.prototype.translate = function(targetLanguage, callback) {
      var that;
      that = this;
      return $.getJSON("https://www.googleapis.com/language/translate/v2?key=" + apiKey + "&q=" + this.text + "&source=" + this.language + "&target=" + targetLanguage, function(data) {
        return callback(new Message(that.speaker, data.data.translations[0].translatedText, targetLanguage));
      });
    };

    return Message;

  })();

  recognition.start();

}).call(this);
