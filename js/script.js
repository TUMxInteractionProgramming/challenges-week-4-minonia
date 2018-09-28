/* #6 start the #external #action and say hello */
console.log("App is alive");
var currentChannel = "";
var currentLocation = {"longitude": "48.271339", "latitude": "16.340475", "what3words":"zange.schiff.sauren"};

/* constructor for messages */
function Message (text) {
  this.createdBy = Number(currentLocation.what3words);
  this.latitude = Number(currentLocation.latitude);
  this.longitude = Number(currentLocation.longitude);
  this.createdOn = new Date();
  /* why minus ? works*/
  this.expiresOn =  new Date (new Date().getTime() + 15 * 60000);
  this.text = text;
  this.own= true;
}


/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */

function sendMessage () {
  var text = $('#input').val();
  newMessage = new Message (text);
  var news = createMessageElement(newMessage);
  $('#input').val("");
  //console.log(newMessage);
  //console.log(news);
  //(news).appendTo($('#messages'));
}

// createMessageElement(yummy)
function createMessageElement(messageObject) {
  // conversion date expiration
  var timeExpires = (messageObject.expiresOn);
  console.log(messageObject.expiresOn);
  var timeExpiresMin =  (timeExpires.getTime() - messageObject.createdOn.getTime()) / 60000;
  console.log(timeExpiresMin);
  // dates to weekday
  var createdOn = messageObject.createdOn.toLocaleString('en-GB', {timeZone: 'UTC'});
  var messageElement = '<div class="message">' +
    '<h3><a href=' +"https://map.what3words.com/" + messageObject.createdBy +"" + ' target="_blank"><strong>' + messageObject.createdBy + '</strong></a>' +
     createdOn + '<em>' + timeExpiresMin +' min. left</em></h3>' +
    '<p>' + messageObject.text +'</p>' +
    '<button> +5 min. </button>' +
  '</div>'
  $(messageElement).appendTo($('#messages'));
  //$('#messages').scrollTop();
}

/* create list items for channels */
/* loop should have been better*/
function listChannels() {
  var chYummy = createChannelElement(yummy)
  $(chYummy).appendTo($('ul'));
  var chSevenContinents = createChannelElement(sevenContinents);
  $(chSevenContinents).appendTo($('ul'));
  var chKillerApp = createChannelElement(killerApp);
  $(chKillerApp).appendTo($('ul'));
  var chFirstPersonOnMars = createChannelElement(firstPersonOnMars);
  $(chFirstPersonOnMars).appendTo($('ul'));
  var chOctoberfest = createChannelElement(octoberfest);
  $(chOctoberfest).appendTo($('ul'));
}

/* create channel data for list items */
function createChannelElement(channelObject) {
  var channelStringName = channelObject.name.slice(1, 2).toLowerCase() + channelObject.name.slice(2, )
  var funkt = "switchChannel("+ channelStringName +")";
  var starFill = channelObject.starred ?  '<i class="channelStar fas fa-star" ></i>': '<i class="far fa-star channelStar"></i>';
  console.log(starFill);
  var listChan = '<li onclick =' + funkt +" "+'>'+
      channelObject.name +
      '<span class="channel-meta">'+
          starFill +
          '<i class="fas fa-chevron-right"></i>' + '</span> </li>';

  return listChan;
}

function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);
    currentChannel = channelName;

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName.name;
    //var newLink = "http//:w3w.co/" + channelName.createdBy;
    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/upgrading.never.helps" target="_blank"><strong>'+channelName.createdBy +'</strong></a>';
    /* #6 #liking channels on #click */
    $('#channel-star').removeClass('fas fa-star far fa-star');
    channelName.starred? $('#channel-star').addClass('fas fa-star') : $('#channel-star').addClass('far fa-star');

    // $('#channel-star').removeClass("fas fa-star");
    // $('#channel-star').addClass("far fa-star");

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');
}

// switch the star in channel


/* #6 #liking a channel on #click */
function star() {
    $('#channel-star').toggleClass("fas fa-star  far fa-star");
    currentChannel.starred = !currentChannel.starred;
    $('#channels li:contains(' + currentChannel.name + ') i:first-child').removeClass("fas fa-star  far fa-star");
    currentChannel.starred ?  $('#channels li:contains(' + currentChannel.name + ') i:first-child').addClass("fas fa-star") : $('#channels li:contains(' + currentChannel.name + ') i:first-child').addClass("far fa-star");
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}
