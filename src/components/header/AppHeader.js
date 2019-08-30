import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";


class AppHeader extends Component {
    render(){
        return <Navbar bg="light" expand="lg">
            <Navbar.Brand>MegaFront</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                <Nav.Link><Link to="/plants">Plant List</Link></Nav.Link>
                <Nav.Link><Link to="/plants/create">Create Plant</Link></Nav.Link>
            </Nav>
        </Navbar>
    }
}

export default withRouter(AppHeader);