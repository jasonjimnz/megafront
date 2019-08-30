import React, {Component} from 'react';
import Alert from "react-bootstrap/Alert";
import {Link, Redirect, withRouter} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class PlantFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: {
                name: ''
            },
            plantId: this.props.match.params['plant_id'],
            redirectTo: false,
            error: false,
            errorMessage: ""
        };

        this.savePlantForm = this.savePlantForm.bind(this);
        this.getPlantDetail = this.getPlantDetail.bind(this);
    }

    componentDidMount(){
        this.getPlantDetail()
    }

    getPlantDetail(){
        if (window.mega_api){
            window.mega_api.getPlant(this.state.plantId).then((plant) => {
                this.setState({plant: plant.plant});
            })
        }
    }

    savePlantForm(event){
        event.preventDefault();
        if (window.mega_api){
            if (this.state.plantId){
                window.mega_api.updatePlant(this.state.plantId, this.state.plant.name).then((plant) => {
                    this.setState({
                        redirectTo: true
                    })
                })
            } else {
                window.mega_api.createPlant(this.state.plant.name).then((plant) => {
                    this.setState({
                        plantId: plant.id,
                        redirectTo: true
                    })
                })
            }
        }
    }

    // eslint-disable-next-line
    render() {
        const {plantId, redirectTo} = this.state;
        if (plantId && redirectTo)
            return <Redirect to={`/plant/${plantId}`}/>;

        return (
            <div>
                <h2>React</h2>
                <Alert variant="success">{plantId ? "Update": "Create"} form View</Alert>
                <Form onSubmit={this.savePlantForm}>
                    <Form.Group>
                        <Form.Label>Plant name</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.plant.name}
                            placeholder="Enter plant name"
                            onChange={(e) => {
                                const {plant} = this.state;
                                plant.name = e.target.value;
                                this.setState({plant: plant});
                        }}/>
                        <Form.Text className="text-muted">
                            The plant name should be unique
                        </Form.Text>
                    </Form.Group>
                    <Button variant="success" type={"submit"}>Save plant</Button>
                    <Link to="/plants" className={"button button-danger"}>Go to plant list</Link>
                </Form>
            </div>
        );
    }
}

export default withRouter(PlantFormView);