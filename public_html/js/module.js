'use strict';
var app = angular.module("map", []);

app.controller('MyCtr', function($scope) {

    
    var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(42.1638,24.6795),
          new google.maps.LatLng(42.1138,24.8119));

    var address = document.getElementById('pac-input');

    var searchBox = new google.maps.places.SearchBox(address, {
          bounds: defaultBounds
        });
    var map;
    function initMap() {
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(42.147026,24.752530)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

    };
    initMap();
                        function setMarkers(map, address) {
                    // Add markers to the map

                    // Marker sizes are expressed as a Size of X,Y
                    // where the origin of the image (0,0) is located
                    // in the top left of the image.

                    // Origins, anchor positions and coordinates of the marker
                    // increase in the X direction to the right and in
                    // the Y direction down.
                    
                    // Shapes define the clickable region of the icon.
                    // The type defines an HTML &lt;area&gt; element 'poly' which
                    // traces out a polygon as a series of X,Y points. The final
                    // coordinate closes the poly by connecting to the first
                    // coordinate.
                    
                    
                      codeAddress(address, map);
                      
                    
                  }
                  

    
    
    function codeAddress(address, map) {
        var geocoder = new google.maps.Geocoder();
        var image = {
            url: 'img/pin.svg',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(23, 32),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 32)
            };
            geocoder.geocode({
                'address': address },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            icon: image,
                            title: address
                        });
                    }
                    else {
                            console.log('Geocode was not successful for the following reason: ' + status);
                         }
                });
            };
    google.maps.event.addListener(searchBox, 'places_changed',function() {setMarkers(map, address.value);});        
    $scope.register = function() {
            console.log('User clicked register',  $scope.user.name);
            setMarkers(map, address.value);
    };

                            //codeAddress('E14 8BZ');
});
