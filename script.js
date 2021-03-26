var mapLat;
var mapLng;
var map;
function updateMap(){
    if(map != undefined){
        map.remove();
    }
    map = L.map('map').setView([mapLat, mapLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([mapLat, mapLng]).addTo(map)
    .bindPopup(`<span>Lat: ${mapLat}</span><br><span>Lng: ${mapLng}</span>`)
    .openPopup();

}

function updateAddress(data){
    console.log(data);
    mapLat=data.location.lat;
    mapLng=data.location.lng;
    $('#ip-value').html(data.ip);
    $('#location-value').html(data.location.city+", "+data.location.region);
    $('#timezone-value').html(data.location.timezone);
    $('#isp-value').html(data.isp);
    updateMap();
}

function updateChanges(){
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        method: "GET",
        success: updateAddress,
        data: {
            apiKey: "at_77upRBzcEy8oYSVcYzdvjzTiGygaI",
            ipAddress: $('#ip-address-value').val(),
        }
    });
}

updateChanges();

$('.search-bar-icon').click(function(event){
    event.preventDefault();
    updateChanges();
});    