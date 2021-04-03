import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <button>Share Place</button>
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
                        image={placeItem.imageUrl}
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