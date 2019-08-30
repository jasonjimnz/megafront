import React, {Component} from 'react';
import Alert from "react-bootstrap/Alert";
import {withRouter} from "react-router-dom";


class HomeView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h2>React</h2>
                <Alert variant="success">React alert</Alert>
            </div>
        );
    }
}

export default withRouter(HomeView);