



(function(){

  var order = 3;

  function makeNgrams(){
    var $src = $('.source-material');
    var $output = $('.output');
    var text = $src.val();

    var ngrams = {};

    for(var i=0; i <= text.length - order; i++){
      var gram = text.substring(i, i+order);
      if(!ngrams[gram]){
        ngrams[gram] = [];
        ngrams[gram].push(text.charAt(i + order))
      } else {
        ngrams[gram]++;
      }
    }

    console.log(ngrams)

    $output.jsonViewer(ngrams)

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


  function init(){
    var $makeNgrams = $('.make-ngrams');
    var $loadSpeech = $('.load-speech');

    $makeNgrams.on('click', makeNgrams);
    $loadSpeech.on('click', loadTrumpSpeech)
  }


  $(document).ready(init);

})();
