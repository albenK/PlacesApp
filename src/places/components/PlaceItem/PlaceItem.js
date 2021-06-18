import React, { useState, useContext } from 'react';

import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';
import Modal from '../../../shared/components/UIElements/Modal/Modal';
import Map from '../../../shared/components/UIElements/Map/Map';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

import useHttpClient from '../../../shared/hooks/useHttpClient/useHttpClient';
import { AuthContext } from '../../../shared/context/AuthContext';

import './PlaceItem.css';

const PlaceItem = (props) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const openMapHandler = () => {
        setShowMap(true);
    };

    const closeMapHandler = () => {
        setShowMap(false);
    };

    const openConfirmDeleteModal = () => {
        setShowConfirmDelete(true);
    };

    const closeConfirmDeleteModal = () => {
        setShowConfirmDelete(false);
    };

    const deletePlaceHandler = async () => {
        closeConfirmDeleteModal();
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
                'DELETE',
                null,
                { Authorization: 'Bearer ' + auth.token }
            );
            props.onDelete(props.id);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal 
                show={showMap} 
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>

            <Modal 
                show={showConfirmDelete} 
                onCancel={closeConfirmDeleteModal}
                header="Delete"
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={closeConfirmDeleteModal}>CANCEL</Button>
                        <Button danger onClick={deletePlaceHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                Are you sure you want to delete this place? This action cannot be undone.
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    { isLoading && <LoadingSpinner asOverlay /> }
                    <div className="place-item__image">
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title}/>
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button onClick={openMapHandler} inverse>VIEW ON MAP</Button>
                        { auth.userId === props.creatorId && <Button to={"/places/" + props.id}>EDIT</Button> }
                        { auth.userId === props.creatorId && <Button onClick={openConfirmDeleteModal} danger>DELETE</Button> }
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;