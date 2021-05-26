import React from 'react';
import Button from '../../../shared/components/FormElements/Button/Button';

import Card from '../../../shared/components/UIElements/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';

import './PlaceList.css';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe add one?</h2>
                    <Button to="/places/new">Add Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {
                props.items.map((placeItem) => {
                    return (<PlaceItem 
                        key={placeItem.id}
                        id={placeItem.id}
                        image={placeItem.image}
                        title={placeItem.title}
                        description={placeItem.description}
                        address={placeItem.address}
                        creatorId={placeItem.creator}
                        coordinates={placeItem.location}
                    />);
                })
            }
        </ul>
    );
};

export default PlaceList;