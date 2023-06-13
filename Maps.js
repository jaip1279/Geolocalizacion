const argCoords = {lat: -34.0, lng: -64.0};
const mapDiv = document.getElementById("map");
const input = document.getElementById("place_input");
const button = document.getElementById('MiUbicacion');
const coords = 0;
let map;
let marker;
let autocomplete;

// =================================Inicia la Función initMap=================================
function initMap(){
    map = new google.maps.Map(mapDiv, {
    center: argCoords,
    zoom: 5,
});

    //Agregar marcador de la ubicación
    marker = new google.maps.Marker({
    position: argCoords,
    map: map,
    });//Finaliza Agregar marcador
    initAutocomplete();



    
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
        
    });
}
// =================================Termina la Función initMap=================================


// =================================Inicia la Función initAutocomplete=================================
   function initAutocomplete(){
      autocomplete = new google.maps.places.Autocomplete(input);
      //Aqui lo que se hace es mover el mapa al lugar seleccionado
      autocomplete.addListener('place_changed', function(){
          const place = autocomplete.getPlace();
          //Aqui se actualiza el centro y las coordenadas
          map.setCenter(place.geometry.location);
          //Aqui se actualiza el marcador
          marker.setPosition(place.geometry.location);
      })

   }
   // =================================Termina la Función initAutocomplete=================================


// =================================Inicia Button que posiciona en la ubicacion actual=================================
button.addEventListener('click', () => {
         // =================================Inicia Obtener la ubicación del Usuario=================================
 if(window.navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (position) => {
            //console.log(position);
            const coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            //console.log(coords);
            map.setCenter(coords);
            marker.setPosition(coords);
        },
        () => {
            alert("Tu Navegador tiene disponible la geolocalización, pero ocurrió un error");
        }
    );
}else{
    alert("Tu Navegador  no dispone de la geolocalización")
}
// =================================Termina Obtener la ubicación del Usuario=================================
})
// =================================Finaliza Button que posiciona en la ubicacion actual=================================



// Estas útimas funciones sirven para ubicar el punto deseado sobre el mapa al hacer click
function placeMarker(localizacion) {
    if ( marker ) {
      marker.setPosition(localizacion);
    } else {
      marker = new google.maps.Marker({
        position: localizacion,
        map: map
      });
    //   const coords = {
    //     lat: localizacion.latitude,
    //     lng: localizacion.longitude
    // }
    
    }
    document.getElementById('localizacion').value=localizacion;
    document.getElementById('GetZoom').innerHTML = map.getZoom();
    // $("#localizacion").val(localizacion);
    //document.getElementById('localizacion').innerHTML = localizacion;
    //console.log(localizacion);
  }





