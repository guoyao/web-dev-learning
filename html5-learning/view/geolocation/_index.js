/**
 * User: guoyao
 * Time: 12/3/11 11:19 PM
 */

var targetPosition;

var firstPosition;

var map;

var isGoogleMapApiCalled = false;

var watchId = null;

var geolocationOptions = {
    enableHighAccuracy:true,
    timeout:Infinity,
    maximumAge:0
};

init();

function init() {
    document.title = "Wherever you go, there you are";
    if (navigator.geolocation) {
        GLOBAL.$("#watchButton").onclick = watchLocation;
        GLOBAL.$("#clearWatchButton").onclick = clearWatch;
    }
    else {
        GLOBAL.$("#geolocationDiv").innerHTML = "Oops, no geolocation support";
    }
}

function watchLocation() {
    if(watchId == null) {
       watchId = navigator.geolocation.watchPosition(displayLocation,
           displayError, geolocationOptions);
    }
}

function clearWatch() {
    if(watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayLocation(position) {
    targetPosition = position;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    GLOBAL.$("#geolocationDiv").innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    GLOBAL.$("#geolocationDiv").innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    //the geolocation of Chang Sha China
    var targetCoords = {
        latitude: 28.1149,
        longitude: 112.5842
    };
    var km = computeDistance(position.coords, targetCoords);
    GLOBAL.$("#distanceDiv").innerHTML = "You are " + km + " km from the Chang Sha China";

    if(map == null) {
        firstPosition = position;
        if(!isGoogleMapApiCalled) {
            isGoogleMapApiCalled = true;
            $.getScript("http://maps.google.com/maps/api/js?sensor=false&callback=showMap");
        }
    }
    else {
        GLOBAL.$("#moveDistanceDiv").innerHTML = Math.abs(computeDistance(
            firstPosition.coords, position.coords));
        scrollMapToPosition(position.coords);
    }
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    else if(error.code == 3) {
        errorMessage += ", retrying...";
        watchId = navigator.geolocation.watchPosition(displayLocation,
                    displayError, geolocationOptions);
    }
    GLOBAL.$("#geolocationDiv").innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
            Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}

function showMap() {
    var googleLatAndLong = new google.maps.LatLng(targetPosition.coords.latitude, targetPosition.coords.longitude);
    var mapOptions = {
        zoom:13,
        center:googleLatAndLong,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(GLOBAL.$("#mapDiv"), mapOptions);

    var title = "Your Location";
    var content = "You are here: " + targetPosition.coords.latitude + ", " + targetPosition.coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position:latlong,
        map:map,
        title:title,
        clickable:true
    };
    var marker = new google.maps.Marker(markerOptions);
    var infoWindowOptions = {
        content:content,
        position:latlong
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map);
    });
}

function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);
    map.panTo(latlong);
    addMarker(map, latlong, "Your new location", "You moved to: " +
        latitude + ", " + longitude);
}