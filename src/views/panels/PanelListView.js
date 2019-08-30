import React, {Component} from 'react';
import Alert from "react-bootstrap/Alert";
import {Link, withRouter} from "react-router-dom";


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
            window.mega_api.listPlants().then((plants) => {
                this.setState({plants: plants.plants});
            })
        }
    }

    renderPlant(plant){
        return <div>
            <span>{plant.id}</span>
            <span><Link to={`/plant/${plant.id}`}>{plant.name}</Link></span>
        </div>
    }

    render() {
        return (
            <div>
                <h2>Plant list</h2>
                {this.state.plants.map((plant) => {
                    return this.renderPlant(plant);
                })}
            </div>
        );
    }
}

export default withRouter(PlantListView);