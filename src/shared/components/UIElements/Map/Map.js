import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = (props) => {
    /* useRef creates a reference to the div, where the Google Map will be placed.
    Similar to document.getElementById() in vanilla JS.
    */
    const mapReference = useRef(); 
    /* object destructuring. Assign value of center and zoom from props
    to variables named center, zoom. Now we can refer to center, zoom
    instead of props.center, or props.zoom */
    const { center, zoom } = props;

    /* useEffect takes two arguments. First argument is a callback function which will run
    whenever any of the elements within the second argument (array/list of dependencies) change.
    If the second argument is an empty array, then the callback function will run ONCE on the first render!
    Similar to ngOnChanges within Angular, if any of the dependecies change, the callback function
    is called. React does not track these dependencies behind the scenes. Instead, useEffect()
    re-evaluates the dependency values whenever the component in which you use useEffect() is re-evaluated
    (i.e. whenever the component's props or state changed). If the component is re-evaluated and the dependencies
    did NOT change, the logic in useEffect() won't run again. The useEffect() logic re-runs AFTER the component
    (including its JSX code) was re-evaluated. That means, that the first execution of the useEffect() logic
    (when a component mounts for the first time) will ALWAYS happen AFTER the component rendered for the first time.
    */
    useEffect(() => {
        const API_KEY = process.env.REACT_APP_LOCATION_IQ_API_KEY;

        // Add layers that we need to the map
        const streets =  window.L.tileLayer.Unwired({key: API_KEY, scheme: "streets"});

        // Initialize the map
        const mapId = mapReference.current.id;
        const map = window.L.map(mapId, {
            center: [ center.lat, center.lng ], // map loads with this location as center
            zoom: zoom,
            layers: [streets] // Show 'streets' by default
        });

        // Add the 'scale' control
        window.L.control.scale().addTo(map);
        // Add the 'layers' control
        window.L.control.layers({
            "Streets": streets
        }).addTo(map);

        // Add marker
        window.L.marker([ center.lat, center.lng ]).addTo(map);

    }, [center, zoom]);

    return (
        <div ref={mapReference} id="map" className={`map ${props.className}`} style={props.style}>

        </div>
    );
};

export default Map;