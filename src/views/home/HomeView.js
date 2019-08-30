import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Jumbotron} from "react-bootstrap";


class HomeView extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Megafront</h1>
                <p>Welcome to the simple platform for solar panels management</p>
                <p>You can go to the <Link to={'/plants'}>plant list</Link> and manage any plant from there</p>
                <p>Also you can <Link to={'/plants/create'}>create a new plant</Link> to add it to your list</p>
            </Jumbotron>
        );
    }
}

export default withRouter(HomeView);