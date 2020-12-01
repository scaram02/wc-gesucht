import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom';
import axios from "axios";
import mapboxgl from 'mapbox-gl';
import '../stylesheets/map.css'




// make this private!
// mapboxgl.accessToken = `pk.eyJ1Ijoic2NhcmFtMDIiLCJhIjoiY2tha2EzeGdjMDBwNzJ3cnR4NTY0c2xueSJ9.okEwbRZu2x0aIbks4zmeVA`
mapboxgl.accessToken = `pk.eyJ1Ijoic2NhcmFtMDIiLCJhIjoiY2syenk4YTlxMGtqejNncDhwb29yNDF5cCJ9.p5Vo_c8qKilksBjL-TZZyg`


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        allToilets: [],
        lng: 5,
        lat: 45,
        zoom: 3,
        }

        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.getMarkers = this.getMarkers.bind(this)
        };

        componentDidMount() {
            const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/scaram02/ckh6mzfik0ij019p5lwmpqjrx',
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
                color: 'black' //midnightblue rgb(53, 54, 58
            }).setLngLat([13.40, 52.52]).addTo(map) 




            marker.on('dragend', () => {
                const lngLat = marker.getLngLat();
                this.setState({
                    lng: lngLat.lng,
                    lat: lngLat.lat
                })
                console.log("Marker location: ", this.state.lng, this.state.lat)
            })

    // this miht be te getalltoilets
            axios
            .get('/api/add', {})
            .then(res => {
                const data = res.data

                data.forEach(toilet => {
                
                const calcCost = (toilet.cost < 1)? `0.${toilet.cost*100}` : (toilet.cost === 1)? toilet.cost : `${toilet.cost}0`

                const infos = 
                `<div class="popup" key=${toilet._id}>
                <a href="toilets/${toilet._id}">
                <h1>${toilet.name}</h1><h2>${(toilet.free || toilet.cost === 0)? `Cost: Free` : `Cost: €${calcCost}`}</h2></a></div>`
                const popup = new mapboxgl.Popup({ offset: 10})
                .setHTML(infos) 
                
               
                const coords = [toilet.lng, toilet.lat]
                const color = ((toilet.free || toilet.cost == 0)? "darkolivegreen" : "darkred")
                
                new mapboxgl.Marker({draggable: false, color: color})
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
    const {name, description, lng, lat, locType, genderNeutral, free, femProd, barrierFree, cost} = this.state;
    axios
    .post('/api/add', {
        lng,
        lat,
        name,
        description,
        locType,
        genderNeutral,
        free,
        femProd,
        barrierFree,
        cost,
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
               
                <div className='page-container'>
                <div className="sidebar-container">
                <h1> Drag the black pin to a restroom location </h1>
                <button onClick={this.handleSubmit}>Rate</button>
                </div>
                
                <div ref={el => this.mapContainer = el} className="map-container"/>
                <div>
                   </div>
                </div>
            </div>
        )
    }
}