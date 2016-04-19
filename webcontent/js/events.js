var geocoder;
var map;
var marker;

function initialize() {
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	var options = {
		zoom: 5,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("mapa"), options);
	
	geocoder = new google.maps.Geocoder();
	
	marker = new google.maps.Marker({
		map: map,
		draggable: true,
	});
	
	marker.setPosition(latlng);
}

app.userEvents.fetchMap = function()
{
  if($(this.address).val() != "")
  {
    this.carregarNoMapa(this.address);
  }	
			
		return true;
}


 app.userEvents.carregarNoMapa = function(endereco)  {

	initialize();
	
	
		geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
		
					//$('#txtEndereco').val(results[0].formatted_address);
					//$('#txtLatitude').val(latitude);
          //         	$('#txtLongitude').val(longitude);
		
					var location = new google.maps.LatLng(latitude, longitude);
					console.log(location);
					marker.setPosition(location);
					map.setCenter(location);
					map.setZoom(16);
				}
			}
		})
	}


	
	google.maps.event.addListener(marker, 'drag', function () {
		geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {  
					//$('#txtEndereco').val(results[0].formatted_address);
					//$('#txtLatitude').val(marker.getPosition().lat());
					//$('#txtLongitude').val(marker.getPosition().lng());
				}
			}
		});
	});
	
	app.userEvents.autocomplete = function() {
			console.log("to digitando");
			geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
				response($.map(results, function (item) {
					return {
						label: item.formatted_address,
						value: item.formatted_address,
						latitude: item.geometry.location.lat(),
          				longitude: item.geometry.location.lng()
					}
				}));
			})
		}
		
	app.userEvents.autocompleteselect = function () {
			//$("#txtLatitude").val(ui.item.latitude);
//    		$("#txtLongitude").val(ui.item.longitude);
			console.log("to clicando");
			var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
			marker.setPosition(location);
			map.setCenter(location);
			map.setZoom(16);
			
		}
	
	
	$("form").submit(function(event) {
		event.preventDefault();
		
		//var endereco = $("#txtEndereco").val();
		//var latitude = $("#txtLatitude").val();
		//var longitude = $("#txtLongitude").val();
		
		//alert("Endereço: " + endereco + "\nLatitude: " + latitude + "\nLongitude: " + longitude);
	
});