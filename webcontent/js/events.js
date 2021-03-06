var geocoder;
var map;
var autocomplete;
var initPosition;
var first;

function initialize() {
  initPosition = new google.maps.LatLng(-23.5652103, -46.65112599999998);
  var options = {
		zoom: 5,
		center: initPosition,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var div = $('.map');
	map = new google.maps.Map(div[0], options);
	geocoder = new google.maps.Geocoder();
	var autoCompleteInput = $('.map-control');
	autoCompleteInput = autoCompleteInput[0];
  autoCompleteOpcoes = {
  types: ['geocode']
}
autocomplete = new google.maps.places.Autocomplete(autoCompleteInput,autoCompleteOpcoes);
google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var data = $('.map-control').serialize();
    app.userEvents.fetchMap();
  });
  map.setCenter(initPosition);
}
 
app.userEvents.fetchMap = function()
{
  if (!first)
  {
    first = true
    this.loadMap("Aclimação, São Paulo - SP, Brasil");
  }
  else if($($('.map-control').val()).val() !== "")
  {
    this.loadMap($('.map-control').val());
  }	
  return true;
}

app.userEvents.loadMap = function(endereco)  {
  initialize();
	geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		  if (results[0]) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				var location = new google.maps.LatLng(latitude, longitude);
				map.setCenter(location);
				map.setZoom(16);
			}
		}
	})
}