import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

import NameForm from './components/eventSubmit';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZXBlYWNlcGxhbiIsImEiOiJja2x1ZHljaDQxeGY0MnZsd2k2YmhicTJjIn0.N5OMsCEawbIj3yN4UgCp2w';




export default function App() {

  var stores = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.034084142948,
            38.909671288923
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 234-7336",
          "phone": "2022347336",
          "address": "1471 P St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 15th St NW",
          "postalCode": "20005",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043929,
            38.910525
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 387-9338",
          "phone": "2023879338",
          "address": "1512 Connecticut Ave NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at Dupont Circle",
          "postalCode": "20036",
          "state": "D.C."
        }
      },

    ]
  };


  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-77.0369);
  const [lat, setLat] = useState(38.9072);
  const [zoom, setZoom] = useState(9);
  var arrayd = [];
  var toPassOn = "";

  var eventList = [];
  var convertedArray = [];
  var argsString = "";
  var actions = {};

  var gj = {
    "type":"FeatureCollection",
    "features":[]
};
var reset = {
  "name":"MyFeatureType",
  "type":"FeatureCollection",
  "features":[]
};


  var geoJSON = {
      "name":"NewFeatureType",
      "type":"FeatureCollection",
      "features":[{
          "type":"Feature",
          "geometry":{
              "type":"LineString",
              "coordinates": []
          },
          "properties":null
      }]
  };


async function fetchRequest()
{

  //arrayd = [];
  axios.get('http://localhost:3001/api/events')
    .then((response) => {
      //setThings(response.data);

      arrayd = response.data.events_;
      //console.log(response.data.events_[0].coordinates);
    });

    //myJSON = JSON.stringify(arrayd);


    return arrayd;
}





  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', function() {
      map.current.addSource('event-listings', {
        'type': 'geojson',
        'data': stores
      })
      map.current.addLayer({
        "id": "locations",
        "type": "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        "source": 'event-listings'
      });
    })






  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      //fetchRequest();
    });


  });

var displayData = "";

function populateMap(actionSource)
{

  if(actionSource[0] != null)
  {
    for (var i = 0; i < actionSource.length; i++) {
      gj.features.push({ "type": "Feature","geometry": {"type": "LineString","coordinates": actionSource[i].coordinates},"properties": {"hi": "hello"} });
      console.log(JSON.stringify(gj));

    }
    displayData = JSON.stringify(gj);
    console.log("display:" + displayData);



    map.current.getSource('event-listings').setData(gj);
    map.current.getLayer('locations').source = 'event-listings';
  }

console.log("data:" + map.current.getSource('event-listings').data);



}

 function handleClick() {
      async function run() {
        const data = await fetchRequest();
        //console.log(data); // will print your data
        gj = {"name":"MyFeatureType",
        "type":"FeatureCollection",
        "features":[]};
        populateMap(data);
        //events = data;
      }

      run();


console.log(JSON.stringify(gj));


    }


  console.log(gj);

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

function openModal()
{  // Get the modal
var modal = document.getElementById("NameForm");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
}
function closeModal()
{
  var modal = document.getElementById("NameForm");
  modal.style.display = "none";
}


  return (


    <div>
    <div className='sidebar'>
  <div className='heading'>
    <h1>Actions</h1>
  </div>
  <div id='listings' className='listings'>
    <button onClick={handleClick}>
      Search
    </button>
    <button onClick={() => loginWithRedirect()}>Log In</button>
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>


    <button id="myBtn" onClick={openModal}>Open Modal</button>

    <div id="NameForm">
    <button id="close" onClick={closeModal}>X</button>
    <NameForm />
    </div>


    <p id = "container">  </p>
  </div>
</div>
      <div ref={mapContainer} className="map-container" />


    </div>

  );
}
