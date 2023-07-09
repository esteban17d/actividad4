var map = L.map('map').setView([0, 0], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

L.control.scale().addTo(map);

function validateIPAddress(ipAddress) {

    var ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    if (!ipRegex.test(ipAddress)) {
        alert('Dirección IP no válida')
    }
    var octets = ipAddress.split('.');
    for (var i = 0; i < octets.length; i++) {
        var octet = parseInt(octets[i]);
        if (octet < 0 || octet > 255) {
            alert('Dirección IP no válida')
        }
    }
    return true;
}

function get_ip_user() {
    return fetch('https://geo.ipify.org/api/v1?apiKey=at_ZjLC3fBlzqfCWGgfQ6zI4CzuRjA5d')
        .then(response => response.json())
        .then(data => {
            var ipAddress = data.ip;
            return ipAddress
    }).catch(error => {
        console.log('Error al obtener la dirección IP: ' + error);
    })
 }

function map_ip(ip){
    fetch('https://geo.ipify.org/api/v1?apiKey=at_ZjLC3fBlzqfCWGgfQ6zI4CzuRjA5d&ipAddress=' + ip)
        .then(response => response.json())
        .then(locationData => {
            var latitude = locationData.location.lat;
            var longitude = locationData.location.lng;
            map.setView([latitude, longitude], 13);
            L.marker([latitude, longitude]).addTo(map).bindPopup(ip).openPopup();

            document.getElementById('country').textContent = locationData.location.country;
            document.getElementById('region').textContent = locationData.location.region;
            document.getElementById('city').textContent = locationData.location.city;
            document.getElementById('postal').textContent = locationData.location.postal;
        })
        .catch(error => {
            console.log('Error al obtener la ubicación: ' + error);
        });
}

async function map_ip_user(){
    try {
        var ipAddress = await get_ip_user();
        map_ip(ipAddress)
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var ip = document.getElementById('ip-input').value;
    validateIPAddress(ip);
    map_ip(ip);
});

function toggleThemeHeader() {
    var header = document.getElementById('header');
    var isDark = header.classList.contains('dark-header');
    if (isDark) {
        header.classList.remove('dark-header');
        header.classList.add('light-header');
    } else {
        header.classList.remove('light-header');
        header.classList.add('dark-header');
    }
}

function toggleThemeBody() {
    var body = document.getElementById('body');
    var isDark = body.classList.contains('dark-body');
    if (isDark) {
        body.classList.remove('dark-body');
        body.classList.add('light-body');
    } else {
        body.classList.remove('light-body');
        body.classList.add('dark-body');
    }
}


document.getElementById('button-switch-mode').addEventListener('click', function(event) {
    toggleThemeHeader();
    toggleThemeBody();
});

map_ip_user();

L.Control.geocoder().addTo(map);