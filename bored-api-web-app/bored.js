$(document).ready(function(){
  //Assign variables and get fields
  var endpoint = 'https://www.boredapi.com/api/activity';
  $errorMsg = $('#error');
  $activityText = $('#activity');
  $typeText = $('#typeText');
  $numPartsText = $('#numParticipantsText');
  $priceText = $('#priceText');
  $accessText = $('#accessText');
  $linkText = $('#linkText');
  $card = $('#activity-card');

  //hide card on first load
  $card.hide();

//Function to get activity based on params
function getActivity(type,numParticipants,price,accessibility){
  //reset all text fields first
  reset();

  //Starting url endpoint
  var url = endpoint;

  //add params
  if (type !== undefined || type != null || type.length !== 0 ){
     url = url + "?type=" + type;
  }
  if (numParticipants !== undefined || numParticipants != null || numParticipants.length !== 0){
    url = url + "&participants=" + numParticipants;
  }
  if (price !== undefined || price != null || price.length !== 0){
  url = url + "&price=" + price;
  }
  if (accessibility !== undefined || accessibility != null || accessibility.length !== 0){
    url = url + "&accessibility=" + accessibility;
  }
 console.log(url);
  //perform ajax call, return results to text fields
  $.ajax({
    type: 'GET',
    url: url,
    success: function (data) {
      console.log("Success", data);
      if (data.error !== undefined){
        $errorMsg.html(data.error);
      } 
      else {
        $activityText.html(data.activity);
        $typeText.html("Type: " + data.type);
        $numPartsText.html("Number of Participants: " + data.participants);
        $priceText.html("Price: " +data.price);
        $accessText.html("Accessibility: " + data.accessibility);
        if (data.link.length > 0){
          $linkText.html("Link: <a href='" + data.link + "'>" + data.link + "</a>");
          $linkText.show();
        }
        else {
          $linkText.hide();
        }
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      $errorMsg.html("Error occurred. Please try again later.");
    }
});
//Show card
$card.show();
}
    
//Click function to bind get activity 
  $('#submit').click(function() {
    var numParts = $("#numParticipants").val();
    var thisType = $("#typeSelect").val();
    var price = $('#price').val();
    var accessibility = $('#accessibility').val();
    getActivity(thisType,numParts,price,accessibility);
  });

  //Click function to bind get activity 
  $('#reset').click(function() {
    reset();
  });

//Reset function
function reset(){
  $card.hide();
  $errorMsg.empty();
  $activityText.empty();
  $typeText.empty();
  $numPartsText.empty();
  $priceText.empty();
  $accessText.empty();
  $linkText.empty();
}
});

