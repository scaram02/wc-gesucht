import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom';
import axios from "axios";
import mapboxgl, { LngLat, Layer, Feature, Marker } from 'mapbox-gl';
import './map.css'




// make this private!
mapboxgl.accessToken = `pk.eyJ1Ijoic2NhcmFtMDIiLCJhIjoiY2tha2EzeGdjMDBwNzJ3cnR4NTY0c2xueSJ9.okEwbRZu2x0aIbks4zmeVA`


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        allToilets: [],
        lng: 5,
        lat: 45,
        zoom: 3,
        // name: '',
        // description: '',
        // location: '',
        }

        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.getMarkers = this.getMarkers.bind(this)
        };

        componentDidMount() {
            const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
            });


            map.on('move', () => {
                this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(4)
                });
                });

            let marker = new mapboxgl.Marker({
                draggable: true,
                color: "blue"
            }).setLngLat([13.40, 52.52]).addTo(map) 




            marker.on('dragend', () => {
                const lngLat = marker.getLngLat();
                this.setState({
                    lng: lngLat.lng,
                    lat: lngLat.lat
                })
                console.log("Marker location: ", this.state.lng, this.state.lat)
            })

    
            axios
            .get('/api/add', {})
            .then(res => {
                const data = res.data
                data.forEach(toilet => {
                const infos = 
                `<div key=${toilet._id}>
                <a href="toilets/${toilet._id}">
                <h1>${toilet.name}</h1></a></div>`
                const popup = new mapboxgl.Popup({ offset: 10})
                .setHTML(infos) 
                
               
                const coords = [toilet.lng, toilet.lat]
                new mapboxgl.Marker({draggable: false})
                  .setLngLat(coords)
                  .setPopup(popup) 
                  .addTo(map)
                })
            })
            .catch((error) => {
                console.log(error)
            })
            }


            
            




handleSubmit = event => {
    event.preventDefault();
    const {name, description, location, lng, lat, locType, genderNeutral, free} = this.state;
    axios
    .post('/api/add', {
        lng,
        lat,
        name,
        description,
        location,
        locType,
        genderNeutral,
        free,
        user: this.props.user
    })
    .then(toiletData => {
        this.props.history.push(`/add/${toiletData.data._id}`)     
    })
    .catch(err => {
        console.log(err)
    })
}



    render() {
        return (
            <div>
               
                <div className='sidebarStyle'>
                <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
                </div>
                
                <div ref={el => this.mapContainer = el} className="mapContainer"/>
                <div>
                 <button onClick={this.handleSubmit}>Submit me</button>
                   </div>
                </div>
            </div>
        )
    }
}