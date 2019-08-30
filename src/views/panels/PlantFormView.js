import React, {Component} from 'react';
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
        if (this.state.plantId)
            this.getPlantDetail()
    }

    getPlantDetail(){
        if (window.mega_api){
            const plantDetail = window.mega_api.getPlant(this.state.plantId);
            if (plantDetail){
                plantDetail.then((plant) => {
                    this.setState({plant: plant.plant});
                })
            }
        }
    }

    savePlantForm(event){
        event.preventDefault();
        if (window.mega_api){
            if (this.state.plantId){
                const updatePlant = window.mega_api.updatePlant(this.state.plantId, this.state.plant.name)
                if (updatePlant){
                    updatePlant.then((plant) => {
                        this.setState({
                            redirectTo: true
                        })
                    })
                }
            } else {
                const createPlant = window.mega_api.createPlant(this.state.plant.name);
                if (createPlant){
                    createPlant.then((plant) => {
                        this.setState({
                            plantId: plant.id,
                            redirectTo: true
                        })
                    })
                }
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
                <h2>{plantId ? "Update" : "Create"} Plant</h2>
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
                    <Button variant={""}>
                        <Link to="/plants" className={"button button-danger"}>
                            Go to plant list
                        </Link>
                    </Button>

                </Form>
            </div>
        );
    }
}

export default withRouter(PlantFormView);