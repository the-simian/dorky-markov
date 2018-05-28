



(function(){

  var order = 4;
  currentNGrams = {};


  //selectors
  var $makeNgrams;
  var $loadSpeech;
  var $makeSpeech;
  var $src;
  var $ngramOutput;
  var $speechOutput;
  var $stopSpeech;
  var text ='';

  function getRandomItem(items){
    return items[Math.floor(Math.random()*items.length)]
  }

  function stopSpeaking(){
    responsiveVoice.cancel();
  }

  function startSpeaking(result){
    responsiveVoice.speak(result, 'US English Male', {rate: 0.5});
  }

  function makeSpeech(){
    var currentGram = text.substring(0, order);
    var result = currentGram;

    for(var i=0; i<text.length; i++){

      var possibilities = currentNGrams[currentGram];
      var next = getRandomItem(possibilities);
      result = (result + next);
      var len = result.length;
      currentGram = result.substring(len - order, len)
    }

    $speechOutput.html(result);
    startSpeaking(result);
  }

  function makeNgrams(){
    order = parseInt($order.val()) || 4;

    console.log(order, $order.val())
    text = $src.val();
    var ngrams = {};
    for(var i=0; i <= text.length - order; i++){
      var gram = text.substring(i, i+order);
      if(!ngrams[gram]){
        ngrams[gram] = [];
      }
      ngrams[gram].push(text.charAt(i + order));
    }
    currentNGrams = ngrams;
    $ngramOutput.jsonViewer(ngrams);
  }

  function loadTrumpSpeech(){
    var $src = $('.source-material');
    fetch('./trump-speech')
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        $src.val(data.data);
      });
  }

  function cacheElements(){
    $makeNgrams = $('.make-ngrams');
    $loadSpeech = $('.load-speech');
    $makeSpeech = $('.make-speech');
    $src = $('.source-material');
    $ngramOutput = $('.ngram-output');
    $speechOutput = $('.speech-output');
    $stopSpeech = $('.stop-speech');
    $order = $('.order');
  }

  function bindHandlers(){
    $makeNgrams.on('click', makeNgrams);
    $loadSpeech.on('click', loadTrumpSpeech);
    $makeSpeech.on('click', makeSpeech);
    $stopSpeech.on('click', stopSpeaking);
  }

  function init(){
    cacheElements();
    bindHandlers();
  }


  $(document).ready(init);

})();
