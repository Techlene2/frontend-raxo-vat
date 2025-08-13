import React, { useState, useEffect } from 'react'
import { GoogleMap, InfoWindow, Marker, Polyline } from '@react-google-maps/api';

import { RoutesImport } from './Imports'
const { Loader, useNavigate, useLocation, useDispatch, useSelector, routesPositionTodo, lang } = RoutesImport;

const containerStyle = {
    width: '100%',
    height: '500px'
};
const defaultCenter = { lat: 22.72, lng: 75.88 };

const locationDataCustomer = {
    "locations": [
        {
            "name": "Rajesh",
            "position": {
                "lat": 22.692633,
                "lng": 75.86760749999999
            },
            "details": "Rajesh General Store, Bhawarkuan Square"
        },
        {
            "name": "Nitesh",
            "position": {
                "lat": 22.71771,
                "lng": 75.8544848
            },
            "details": "Nitesh Mart 48, Rajwada, opp to bank"
        },
        {
            "name": "Pankaj",
            "position": {
                "lat": 22.7042972,
                "lng": 75.8779283
            },
            "details": "IndraPratima Brand Factory"
        }
    ]
};

const locationDataSuccess = {
    "locations": [
        {
            "name": "Suresh",
            "position": {
                "lat": 22.6889623,
                "lng": 75.8844925
            },
            "details": "GMART 58, Near Teen Imli Bus Stand"
        },
        {
            "name": "Bhupendra",
            "position": {
                "lat": 22.7138491,
                "lng": 75.86844889999999
            },
            "details": "36, Indra Nagar, Main Road"
        },
        {
            "name": "Jonny Hot Dog",
            "position": {
                "lat": 22.7241703,
                "lng": 75.88459
            },
            "details": "56 Main Food Street, Shop no. 12"
        }
    ]
};

export default function RouteDetails() {

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    // });

    const [loading, setLoading] = useState(true)
    const [selectedMarker, setSelectedMarker] = useState(null)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const position = useSelector(state => state && state.routePosition && state.routePosition.data)
    // console.log(position)

    const [directions, setDirections] = useState([])
    const [map, setMap] = useState(null)

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    const position_res = (res) => {
        if (res && res.status == 200) {

            const DirectionsService = new window.google.maps.DirectionsService();
            const waypoints = res && res.data && res.data.map(location => ({
                location: new window.google.maps.LatLng({
                    lat: location.position.lat,
                    lng: location.position.lng
                }),
                // stopover: true
            }));
            setDirections(waypoints);
            const origin = new window.google.maps.LatLng(res && res.data && res.data[0] && res.data[0].position.lat, res && res.data && res.data[0] && res.data[0].position.lng);
            const destination = new window.google.maps.LatLng(res && res.data && res.data[0].position.lat, res && res.data && res.data[0].position.lng);

            DirectionsService.route(
                {
                    origin,
                    destination,
                    waypoints,
                    optimizeWaypoints: true,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result.routes);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            )

            setLoading(false)

        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        dispatch(routesPositionTodo({ 'position': state })).then((res) => position_res(res.payload))
    }, [])


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.routes + ' ' + lang.details}</h6>
                        </div>
                    </div>

                    {loading ?
                        <div className="col-md-12">
                            <div className="layout">
                                <Loader />
                            </div>
                        </div>
                        :
                        // isLoaded &&
                        <div className="col-md-12">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={defaultCenter}
                                zoom={12}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                {/* Render Locations Markers */}
                                {position && position.map((val, index) => (
                                    <Marker
                                        key={index}
                                        position={val.position}
                                    />
                                ))}

                                {/* Render Customer Markers */}
                                {locationDataCustomer && locationDataCustomer.locations.map((location, index) => (
                                    <Marker
                                        key={index}
                                        position={location.position}
                                        icon={{
                                            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                            scaledSize: new window.google.maps.Size(50, 50),
                                        }}
                                        onClick={() => setSelectedMarker(location)}
                                    />
                                ))}

                                {/* Render Success Markers */}
                                {locationDataSuccess && locationDataSuccess.locations.map((location, index) => (
                                    <Marker
                                        key={index}
                                        position={location.position}
                                        icon={{
                                            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                                            scaledSize: new window.google.maps.Size(50, 50),
                                        }}
                                        onClick={() => setSelectedMarker(location)}
                                    />
                                ))}

                                {/* Render Polyline for Directions */}
                                {directions && directions.map((route, index) => (
                                    <Polyline
                                        key={index}
                                        path={route && route.overview_path && route.overview_path.map(p => ({ lat: p.lat(), lng: p.lng() }))}
                                        options={{
                                            strokeColor: "#FF0000",
                                            strokeOpacity: 1,
                                            strokeWeight: 2,
                                        }}
                                    />
                                ))}

                                {/* Render InfoWindow */}
                                {selectedMarker && (
                                    <InfoWindow
                                        position={selectedMarker.position}
                                        onCloseClick={() => setSelectedMarker(null)}
                                    >
                                        <div>
                                            <h6>{selectedMarker.name}</h6>
                                            <span>{selectedMarker.details}</span>
                                        </div>
                                    </InfoWindow>
                                )}

                            </GoogleMap>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
