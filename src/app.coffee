

apiKey = 'AIzaSyDUpThQIyJRlszXEnT2HvSMbPbObbcYNE4'

speechRecognition = (language, onresult) ->
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.interminResults = false
  recognition.onstart = ()->
    recognition.lang = language
  recognition.onresult = onresult
  recognition.onerror = (err)->
    console.error(err)
  recognition.onend = ()->
    return

class Message
  constructor: (@speaker, @text, @language) ->

  speak: () ->
    msg = new SpeechSynthesisUtterance()
    msg.text = @text
    msg.lang = @language
    window.speechSynthesis.speak(msg)

  translate: (targetLanguage, callback) ->
    that = this
    $.getJSON "https://www.googleapis.com/language/translate/v2?key=#{apiKey}
&q=#{@text}&source=#{@language}&target=#{targetLanguage}",
      (data) -> callback new Message that.speaker,
        data.data.translations[0].translatedText,
        targetLanguage

recognition.start()