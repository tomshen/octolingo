

apiKey = 'AIzaSyDUpThQIyJRlszXEnT2HvSMbPbObbcYNE4'

initSpeechRecognition = (language, onresult) ->
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
  recognition.start()
  return recognition

class Message
  constructor: (@speaker, @text, @language) ->

  @speak: (message) ->
    msg = new SpeechSynthesisUtterance()
    msg.text = message.text
    msg.lang = message.language
    window.speechSynthesis.speak(msg)

  @translate: (message, targetLanguage, callback) ->
    if message.language == targetLanguage
      return callback(message)
    $.getJSON "https://www.googleapis.com/language/translate/v2?key=#{apiKey}
&q=#{message.text}&source=#{message.language}&target=#{targetLanguage}",
      (data) -> callback new Message message.speaker,
        data.data.translations[0].translatedText,
        targetLanguage
