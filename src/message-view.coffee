LANGUAGES = [
  'de'
  'en'
  'es'
  'fr'
  'it'
  'ja'
  'ko'
  'zh'
]

class MessageView
  constructor: (id, @onLanguageChange) ->
    @$container = $('#' + id)
    @selectedLanguage = 'en'

  _createMessage: (message) ->
    $("<div class=\"chat-element\"><span class=\"chat-sender\">#{message.sender}
        </span><span class=\"chat-message\">#{message.text}</span></div>")

  _createLanguageButton: (language) ->
    $languageButton = $("<li class=\"language-button\">#{language}</li>")
    if language == @selectedLanguage
      $languageButton.addClass('is-selected')

    viewRef = this
    $languageButton.click () ->
      if language != viewRef.selectedLanguage
        $('.language-button.is-selected').removeClass('.is-selected')
        $(this).addClass('is-selected')
        viewRef.selectedLanguage = language
        viewRef.onLanguageChange(language)

  _fillChat: () ->
    $chatWindow = $('<div class="chat-window"></div>')
    messagePromises = Message.all().map (message) ->
      new Promise (resolve, reject) ->
        Message.translate(message, @selectedLanguage, resolve)
    Promise.all(messagePromises).then (results) ->
      $chatWindow.append(results)

  _fillLanguageSelector: () ->
    $languageSelector = $('<div class="language-selector"></div>')
    $languageSelector.append(LANGUAGES.map @_createLanguageButton)

  refresh: () ->
    $chat = @_fillChat
    @$container.empty().append(@_fillLanguageSelector()).append($chat)
    $chat.scrollTop(999999)

  start: () ->
    refresh()
