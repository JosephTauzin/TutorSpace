import React from 'react';
import { useParams, useLocation, useRouteMatch, useHistory } from 'react-router-dom';

function MyComponent() {
    // Get URL parameters
    let { id } = useParams();

    // Get current path
    let { path, url } = useRouteMatch();

    // Get the location object
    let location = useLocation();

    // Get the history object
    let history = useHistory();

    // Extract the query parameters
    let searchParams = new URLSearchParams(location.search);
    let myParam = searchParams.get('myParam');

    return (
        <div>
            <h3>ID: {id}</h3>
            <p>Current URL: {url}</p>
            <p>Current Path: {path}</p>
            <p>Query Parameter myParam: {myParam}</p>
            <button onClick={() => history.goBack()}>Go Back</button>
        </div>
    );
}

export default MyComponent;