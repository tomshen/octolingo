recognition = new webkitSpeechRecognition()

recognition.continuous = true
recognition.interminResults = false

apiKey = 'AIzaSyDUpThQIyJRlszXEnT2HvSMbPbObbcYNE4'

translateLangs = ['af,ar,az,be,bg,bn,bs,ca,ceb,cs,cy,da,de,el,en,eo,es,et,eu,fa,fi,fr,ga,gl,gu,hi,hmn,hr,ht,hu,id,is,it,iw,ja,jw,ka,km,kn,ko,la,lo,lt,lv,mk,mr,ms,mt,nl,no,pl,pt,ro,ru,sk,sl,sq,sr,sv,sw,ta,te,th,tl,tr,uk,ur,vi,yi,zh,zh-TW']

translate = (text, sourceLang, targetLang, callback) ->
  $.get(
    "https://www.googleapis.com/language/translate/v2?key=#{apiKey}&q=#{text}&source=#{sourceLang}&target=#{targetLang}",
    (data) -> callback(data.data.translations[0].translatedText, targetLang)
  )

speak = (text, language) ->
  msg = new SpeechSynthesisUtterance()
  msg.text = text
  msg.lang = language
  $('#output').append(text)
  window.speechSynthesis.speak(msg)

transcript = ''
recognition.onstart = ()->
  recognition.lang = 'en'
recognition.onresult = (event)->
  for result in event.results
    translate(result[0].transcript, recognition.lang, 'es', speak)
    transcript += result[0].transcript
  $('#input').text(transcript)
recognition.onerror = (err)->
  console.error(err)
recognition.onend = ()->
  return

recognition.start()