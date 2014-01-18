C = {};

C.LANGUAGES = [{
		name: "English",
		transcribe: "en",
		translate: "en"
	},{
		name: "French",
		transcribe: "fr",
		translate: "fr"
	},{
		name: "Spanish",
		transcribe: "sp",
		translate: "sp"
	},{
		name: "Italian",
		transcribe: "it",
		translate: "it"
	},{
		name: "German",
		transcribe: "gr",
		translate: "gr"
	},{
		name: "Japanese",
		transcribe: "jp",
		translate: "jp"
	},{
		name: "Korean",
		transcribe: "ko",
		translate: "ko"
	},{
		name: "Chinese",
		transcribe: "cn",
		translate: "cn"
	}]

function MessageHandler(id) {
	this.messages = [];
	this.languages = [];
	this.container = $("#" + id);
	this.selectedLanguage = {};
}


//Takes two strings, a message and a sender
//and returns at jQuery object with that message.
MessageHandler.prototype._createMessage = function(message) {
	var messageTemplate = "<div class='chat-element'><span class='chat-sender'>{{SENDER}}</span> <span class='chat-message'>{{CONTENT}}</span></div>";

	var message = messageTemplate.replace("{{SENDER}}", message.sender).replace("{{CONTENT}}", message.content);

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
		var languageButton = languageButtonTemplate.replace("{{LANGUAGE}}", language.name).replace("{{SELECTED}}", " class='is-selected'");
	}
	else {
		var languageButton = languageButtonTemplate.replace("{{LANGUAGE}}", language.name).replace("{{SELECTED}}", "");
	}

	$languageButton = $(languageButton);

	if(selected) {
		this.selectedLanguageButton = $languageButton;
	}

	var handlerReference = this;

	$languageButton.click(function() {
		if(language != handlerReference.selectedLanguage) {
			this.addClass("is-selected");
			handlerReference.selectedLanguageButton.removeClass("is-selected");

			handlerReference.selectedLanguage = language;
			handlerReference.selectedLanguageButton. = this;
		}
	})

	return $languageButton;
}


MessageHandler.prototype._fillChat() {
	var $chatWindow = $("<div class='chat-window'");

	for (var i = 0; i < this.messages.length; i++) {
		$chatWindow.append(this._createMessage(this.messages[i]));
	};

	return $chatWindow;
}

MessageHandler.prototype._fillChat() {
	var $chatWindow = $("<div class='chat-window'");

	for (var i = 0; i < this.messages.length; i++) {
		$chatWindow.append(this._createMessage(this.messages[i]));
	};

	return $chatWindow;
}
