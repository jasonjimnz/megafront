import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


class PlantListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: []
        };
        this.renderPlant = this.renderPlant.bind(this);
    }

    componentDidMount(){
        if (window.mega_api){
            const plantList = window.mega_api.listPlants();
            if (plantList){
                plantList.then((plants) => {
                    this.setState({plants: plants.plants});
                })
            }
        }
    }

    renderPlant(plant){
        return <tr>
            <td>{plant.name}</td>
            <td>{plant.id}</td>
            <td>
                <Button variant={""}>
                    <Link to={`/plant/${plant.id}`}>View plant</Link>
                </Button>
                <Button variant={""}>
                    <Link to={`/plant/${plant.id}/update`}>Update plant</Link>
                </Button>
            </td>
        </tr>
    }

    render() {
        return (
            <div>
                <h2>Plant list</h2>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.plants.map((plant) => {
                        return this.renderPlant(plant);
                    })}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default withRouter(PlantListView);