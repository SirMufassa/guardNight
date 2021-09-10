let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -11.6876, lng: 27.5026 },
      zoom: 8,
    });

    marker = new google.maps.Marker({
      position : { lat: -11.6876, lng: 27.5026 },
      map : map
    })
}

function newLocation(newLat,newLng)
{
    // console.log(newLat + ' ' + newLng)

    let myLatlng = new google.maps.LatLng( newLat, newLng );

    map.setCenter({
      lat : newLat,
      lng : newLng
    });

    marker.setPosition(myLatlng)
}

// google.maps.event.addDomListener(window, 'load', initMap)

