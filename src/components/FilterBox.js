import React from 'react'

export default function FilterBox(props){
    return (
        <div className="filterBox"> 

       {props.city ? 'Информация о выбранно объекте:' :  'Выберите объект на карте'} 
        <p>{props.city}</p>
        <p>{props.discrCity}</p>
        {/* {props.info.default.features.map(park => (
        
      <p key={park.properties.PARK_ID}> {park.properties.NAME}</p>
    
      ))} */}
       {console.log(props.info)}
        </div>
    )
}