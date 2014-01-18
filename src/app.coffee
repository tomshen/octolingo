recognition = new webkitSpeechRecognition()

recognition.continuous = true
recognition.interminResults = true

apiKey = 'AIzaSyDUpThQIyJRlszXEnT2HvSMbPbObbcYNE4'

translate = (text, language) ->
  $.get("https://www.googleapis.com/language/translate/v2?key=#{apiKey}&q=#{text}&target=#{language}",
    (data) ->
      translatedText = data.data.translations[0].translatedText
      $('#output').text(translatedText)
      msg = new SpeechSynthesisUtterance(translatedText)
      msg.lang = 'fr-FR'
      window.speechSynthesis.speak(msg)
      )

transcript = ''
recognition.onstart = ()->
  recognition.lang = 'English'
recognition.onresult = (event)->
  transcript=''
  for result in event.results
    transcript += result[0].transcript
  $('#input').text(transcript)
  translate(transcript, 'fr')
recognition.onerror = ()->
  return
recognition.onend = ()->
  return

recognition.start()