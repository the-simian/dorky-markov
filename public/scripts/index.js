



(function(){

  var order = 3;
  currentNGrams = {};


  //selectors
  var $makeNgrams;
  var $loadSpeech;
  var $makeSpeech;
  var $src;
  var $ngramOutput;
  var $speechOutput

  function makeSpeech(){

    $speechOutput.html('sadf')
  }

  function makeNgrams(){

    var text = $src.val();

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
  }

  function bindHandlers(){
    $makeNgrams.on('click', makeNgrams);
    $loadSpeech.on('click', loadTrumpSpeech);
    $makeSpeech.on('click', makeSpeech)
  }

  function init(){
    cacheElements();
    bindHandlers();
  }


  $(document).ready(init);

})();
