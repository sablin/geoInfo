
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon, Tooltip, Rectangle } from 'react-leaflet'
import * as parkData from "./parks.json";
import React, {useState} from 'react'
import * as claster from './geo.json'
import FilterBox from './components/FilterBox'



function App() {

  const [infoCity, setinfo] = useState(null)
  const [discrCity, setcity] = useState(null)
  let clasterInfo = (name) =>{

    setinfo(name)
    setcity('Кругобайка́льская желе́зная доро́га (КБЖД) — название, использовавшееся во время строительства (1899—1905) и первых годов эксплуатации участка Байкал — Мысовая Забайкальской железной дороги протяжённостью 260 километров (с 1934 года участок входит в Восточно-Сибирскую железную дорогу).')
 
   }
 let markerInfo = (e) =>{
   setinfo(e.target._popup.options.children[0])
   setcity(e.target._popup.options.children[1].props.children.join(' '))
   console.log(e)

  }

  const ll = [[claster[0].coordinates]]
  const multiPolygon = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
    ],
    [
      [51.72942896601058, 103.73508053079962],
      [51.86506296361804, 103.99394259237144],
      [51.962579030746674, 104.6714636915079],
      [51.868689825215256, 104.80709577805673]
    ]
  ]

  return (
    <div>
      
    <FilterBox discrCity= {discrCity}city={infoCity} info={parkData}/>
    <MapContainer 
    center={[52.50445902013379, 103.92113774687822]} zoom={10} scrollWheelZoom={false}
    dragging={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        attributionControl={true}>

    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[0],
            park.geometry.coordinates[1]
          ]}
          eventHandlers={{
            click: (e) => {
              markerInfo(e)
            },
          }}
       
        >
       <Popup >
       {park.properties.NAME}
       <p>Номер в каталоге: {park.properties.PARK_ID}</p>
      </Popup>

        </Marker>
        
      ))}

<Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon}

eventHandlers={{
  click: (e) => {
    clasterInfo('КБЖД')
  },
}}
>
      <Tooltip sticky>КБЖД</Tooltip>
    </Polygon>


  </MapContainer>
  </div>

  );
}

export default App;
