// SEE LECTURE 68 for alternative way using react-google-maps
// we are using a third party library that already has an idea of how to render a map onto a screen
// google maps has no idea how to integrate into a react-type application
import React, {Component} from 'react';

class GoogleMap extends Component {
    componentDidMount() {
        // lifecycle method that gets called automatically after this component
        // gets rendered to the screen

        // this show we create an embedded google map inside of our document
        // google.maps.Map takes reference to HTML element where we want to render this map to
        // this is how we interact with 3rd party libraries that dont know how to work in react-type ecosystem
        // they dont know what a render method is or what JSX is
        new google.maps.Map(this.refs.map, {
            zoom: 12,
            center: {
                lat: this.props.lat,
                lng: this.props.lon
            }
        });
    }

    render() {
        return <div ref="map"/>;   // ref system in react - allows us to get a direct reference
                            // to an html element that has been rendered to the page
                            // so after this component has been rendered to the screen
                            // i can get a direct reference to the div that was created right here
                            // by refering to this.refs.map

                            // so anywhere else in this component I can say this.refs.map
                            // and it will give a direct reference to this actual HTML element
    }

}

export default GoogleMap;