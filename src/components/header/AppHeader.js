import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";


class AppHeader extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return <Navbar bg="light" expand="lg">
            <Navbar.Brand>MegaFront</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Item><Link to="/">Home</Link></Nav.Item>
                <Nav.Item><Link to="/plants">Plant List</Link></Nav.Item>
                <Nav.Item><Link to="/plants/create">Create Plant</Link></Nav.Item>
            </Nav>
        </Navbar>
    }
}

export default withRouter(AppHeader);