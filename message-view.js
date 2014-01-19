// Generated by CoffeeScript 1.6.3
(function() {
  var LANGUAGES, MessageView;

  LANGUAGES = ['de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'zh'];

  MessageView = (function() {
    function MessageView(id, onLanguageChange) {
      this.onLanguageChange = onLanguageChange;
      this.$container = $('#' + id);
      this.selectedLanguage = 'en';
    }

    MessageView.prototype._createMessage = function(message) {
      return $("<div class=\"chat-element\"><span class=\"chat-sender\">" + message.sender + "        </span><span class=\"chat-message\">" + message.text + "</span></div>");
    };

    MessageView.prototype._createLanguageButton = function(language) {
      var $languageButton, viewRef;
      $languageButton = $("<li class=\"language-button\">" + language + "</li>");
      if (language === this.selectedLanguage) {
        $languageButton.addClass('is-selected');
      }
      viewRef = this;
      return $languageButton.click(function() {
        if (language !== viewRef.selectedLanguage) {
          $('.language-button.is-selected').removeClass('.is-selected');
          $(this).addClass('is-selected');
          viewRef.selectedLanguage = language;
          return viewRef.onLanguageChange(language);
        }
      });
    };

    MessageView.prototype._fillChat = function() {
      var $chatWindow, messagePromises;
      $chatWindow = $('<div class="chat-window"></div>');
      messagePromises = Message.all().map(function(message) {
        return new Promise(function(resolve, reject) {
          return Message.translate(message, this.selectedLanguage, resolve);
        });
      });
      return Promise.all(messagePromises).then(function(results) {
        return $chatWindow.append(results);
      });
    };

    MessageView.prototype._fillLanguageSelector = function() {
      var $languageSelector;
      $languageSelector = $('<div class="language-selector"></div>');
      return $languageSelector.append(LANGUAGES.map(this._createLanguageButton));
    };

    MessageView.prototype.refresh = function() {
      var $chat;
      $chat = this._fillChat;
      this.$container.empty().append(this._fillLanguageSelector()).append($chat);
      return $chat.scrollTop(999999);
    };

    MessageView.prototype.start = function() {
      return refresh();
    };

    return MessageView;

  })();

}).call(this);
