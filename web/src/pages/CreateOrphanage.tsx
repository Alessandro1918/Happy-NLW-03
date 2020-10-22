import React, { useState, FormEvent, ChangeEvent } from "react";
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
//import { findConfigFile } from "typescript";
import { useHistory } from 'react-router-dom'

import Sidebar from "../components/Sidebar";
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {

  //History
  const history = useHistory()

  //State
  const [position, setPosition] = useState({latitude: 0, longitude: 0})
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [instructions, setInstructions] = useState("")
  const [opening_hours, setOpeningHours] = useState("")
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[] >([])

  //Functions
  function handleMapClick(event: LeafletMouseEvent) {
    //console.log(event.latlng)
    const {lat, lng} = event.latlng
    setPosition({latitude: lat, longitude: lng})
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    
    console.log(event.target.files)
    if (!event.target.files) {
      return
    }

    //V1 - RocketSeat - Each event overwrites selected images from last event
    //const selectedImages = Array.from(event.target.files)
    //V2 - Myself - Images selected on the second event are added after the images selected on the first event
    const selectedImages = [...images, ...Array.from(event.target.files)]
    setImages(selectedImages)
    
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages(selectedImagesPreview)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()  //avoid page reload @ submit
    const {latitude, longitude} = position
    console.log(name, position, about, instructions, opening_hours, open_on_weekends)
    
    const data = new FormData()
    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    alert("Cadastro realizado com sucesso!")

    history.push('/map')
  }

  //Methods
  return (
    <div id="page-create-orphanage">
      
      <Sidebar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.605648, -46.690230]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              {/*<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>*/}
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              
              {position.latitude !==0 
                && position.longitude !==0 
                && <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} /> 
              }
             
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {/** Images selected from the user */}
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                
                {/** "Add images" button */}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              {/* css: display: none; */}
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
