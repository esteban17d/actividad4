var map = L.map('map').setView([0, 0], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

L.control.scale().addTo(map);

fetch('https://geo.ipify.org/api/v1?apiKey=at_ZjLC3fBlzqfCWGgfQ6zI4CzuRjA5d')
    .then(response => response.json())
    .then(data => {
        var ipAddress = data.ip;
        fetch('https://ipapi.co/' + ipAddress + '/json/')
            .then(response => response.json())
            .then(locationData => {
                var latitude = locationData.latitude;
                var longitude = locationData.longitude;
                map.setView([latitude, longitude], 13);
                L.marker([latitude, longitude]).addTo(map).bindPopup('Aquí está tu ip publica').openPopup();

                console.log('País: ' + locationData.country_name);
                console.log('Ciudad: ' + locationData.city);
                console.log('Código Postal: ' + locationData.postal);
            })
            .catch(error => {
                console.log('Error al obtener la ubicación: ' + error);
            });
    })
    .catch(error => {
        console.log('Error al obtener la dirección IP: ' + error);
    });

L.Control.geocoder().addTo(map);