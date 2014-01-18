var C = {};
C.LANGUAGES = [
  'de',
  'en',
  'es',
  'fr',
  'it',
  'ja',
  'ko',
  'zh'
];
function MessageHandler(id, onLanguageChange) {
  this.languages = [];
  this.$container = $("#" + id);
  this.selectedLanguage = 'en';

  this.onLanguageChange = onLanguageChange;
}


//Takes two strings, a message and a sender
//and returns at jQuery object with that message.
MessageHandler.prototype._createMessage = function(message) {
  var messageTemplate = "<div class='chat-element'><span class='chat-sender'>{{SENDER}}</span> <span class='chat-message'>{{CONTENT}}</span></div>";

  var message = messageTemplate.replace("{{SENDER}}", message.sender).replace("{{CONTENT}}", message.text);

  $message = $(message);

  return $message;
}

//Takes an element from the language object
//and returns a jquery object made from that element
MessageHandler.prototype._createLanguageButton = function(language) {
  var languageButtonTemplate = "<li{{SELECTED}}>{{LANGUAGE}}</li>";

  if(language === this.selectedLanguage) {
    var selected = true;
  }

  if(selected) {
    var languageButton = languageButtonTemplate.replace("{{LANGUAGE}}", language).replace("{{SELECTED}}", " class='is-selected'");
  }
  else {
    var languageButton = languageButtonTemplate.replace("{{LANGUAGE}}", language).replace("{{SELECTED}}", "");
  }

  $languageButton = $(languageButton);

  if(selected) {
    this.selectedLanguageButton = $languageButton;
  }

  var handlerReference = this;

  $languageButton.click(function() {
    if(language != handlerReference.selectedLanguage) {
      $this = $(this);
      $this.addClass("is-selected");
      if(handlerReference.selectedLanguageButton)
        handlerReference.selectedLanguageButton.removeClass("is-selected");

      handlerReference.selectedLanguage = language;
      handlerReference.selectedLanguageButton = $this;
      handlerReference.onLanguageChange(language);
    }
  });

  return $languageButton;
}


MessageHandler.prototype._fillChat = function() {
  var $chatWindow = $("<div class='chat-window'></div>");
  var messages = Message.all();
  var _this = this;
  for (var i = 0; i < messages.length; i++) {
    Message.translate(messages[i], this.selectedLanguage, function (message) {
      $chatWindow.append(_this._createMessage(message));
    });
  };


  return $chatWindow;
}


//Populate the language selector
MessageHandler.prototype._fillLanguageSelector = function() {
  var $languageSelector = $("<div class='language-selector'></div>");
  for (var i = 0; i < C.LANGUAGES.length; i++) {
    $languageSelector.append(this._createLanguageButton(C.LANGUAGES[i]));
  };

  return $languageSelector;
}

MessageHandler.prototype._fillMessageHandler = function() {
  this.$container.empty();
  this.$container.append(this._fillLanguageSelector());
  this.$container.append(this._fillChat());
}

//Start the message handler (fill it with content)
MessageHandler.prototype.start = function() {
  this._fillMessageHandler();
}


//Create a new message and refresh the sender
MessageHandler.prototype.refresh = function() {
  this._fillMessageHandler();
}

