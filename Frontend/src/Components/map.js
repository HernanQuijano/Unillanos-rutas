import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { Icon } from "leaflet";
import BASE_URL from '../constants/constants'
import bus_marker from '../images/bus_marker_icon_138837.svg'

const icon = new Icon ({
    iconUrl: bus_marker,
    iconSize: [25,25]
});

function Map() {
    const [position, setPosition] = useState(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition(position);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("La geolocalización no es compatible con este navegador");
      }
    }, []);

    const getData = async () =>{
      const response = await fetch(`${BASE_URL}/paradas/1`)
       const data = await response.json()
       console.log(data)
       return data
     }
    
     getData();

    return (
      <div>
        {position ? (
          <>
          <div class="card" id="ubication">
            <div class="card-body">
              <p>
                Tu ubicación actual es: {position.coords.latitude}, {position.coords.longitude}
              </p>
              <button type="button" class="btn btn-primary" center={[position.coords.latitude, position.coords.longitude]}>Su ubicación</button>
            </div>
          </div>
            <MapContainer center={[position.coords.latitude, position.coords.longitude]} zoom={15}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
                contributors'
              />
              <Marker position={[position.coords.latitude, position.coords.longitude]}>
                <Popup>
                  Usted está aquí...
                </Popup>
              </Marker>
              {/* {getData().map(parada => (
                <Marker key={parada.id} position={[parada.latitud, parada.longitud]}/>
                ))} */}
              <Marker position={[4.146687, -73.636781]} icon={icon}>
                <Popup>
                Paradero - Parque de estudiantes
                </Popup>
              </Marker>
              <Marker position={[4.143015, -73.633421]} icon={icon}>
              <Popup>
                Paradero - Unicentro
                </Popup>
              </Marker>
              <Marker position={[4.138799, -73.630203]} icon={icon}>
              <Popup>
                Paradero - Universal de Tornillos
                </Popup>
              </Marker>
              <Marker position={[4.135098, -73.627411]} icon={icon}>
              <Popup>
                Paradero - Colegio Industrial
                </Popup>
              </Marker>
              <Marker position={[4.128412, -73.622292]} icon={icon}>
              <Popup>
                Paradero - Makro
                </Popup>
              </Marker>
              <Marker position={[4.124141, -73.619065]} icon={icon}>
              <Popup>
                Paradero - Semillano
                </Popup>
              </Marker>
              <Marker position={[4.115221, -73.609173]} icon={icon}>
              <Popup>
                Paradero - UCC
                </Popup>
              </Marker>
              <Marker position={[4.075178, -73.585655]} icon={icon}>
              <Popup>
                Paradero - Unillanos Barcelona
                </Popup>
              </Marker>
            </MapContainer>
          </>
        ) : (
          <p>Obteniendo tu ubicación...</p>
        )}
      </div>
    );
  }
  
  export default Map;