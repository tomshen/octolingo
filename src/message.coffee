

apiKey = 'AIzaSyDUpThQIyJRlszXEnT2HvSMbPbObbcYNE4'

window.initSpeechRecognition = (language, onresult) ->
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.interminResults = false
  recognition.onstart = ()->
    recognition.lang = language
  recognition.onresult = onresult
  recognition.onerror = (err)->
    console.error(err)
    initSpeechRecognition(language, onresult)
  recognition.onend = ()->
    return
  recognition.start()
  return recognition

class Message
  constructor: (@sender, @text, @language) ->

  @messages = []
  save: () ->
    Message.messages.push this
    gapi.hangout.data.sendMessage JSON.stringify(this)

  @all: ()->
    Message.messages

  @save: (message)->
    @messages.push message

  @speak: (message) ->
    msg = new SpeechSynthesisUtterance()
    msg.text = message.text
    msg.lang = message.language
    console.log("#{msg.sender}: #{msg.text} | #{JSON.stringify(msg)}")
    window.speechSynthesis.speak(msg)

  @translate: (message, targetLanguage, callback) ->
    if message.language == targetLanguage
      return callback(message)
    $.getJSON "https://www.googleapis.com/language/translate/v2?key=#{apiKey}
&q=#{message.text}&source=#{message.language}&target=#{targetLanguage}",
      (data) -> callback new Message message.sender,
        data.data.translations[0].translatedText,
        targetLanguage

window.Message = Message
