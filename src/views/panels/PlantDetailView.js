import React, {Component} from 'react';
import Alert from "react-bootstrap/Alert";
import {Redirect, withRouter} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class PlantDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: null,
            plantId: this.props.match.params['plant_id'],
            showGraphs: true,
            deleteModal: false,
            redirectToUpdate: false,
            redirectToList: false,
            fromDate: '',
            toDate: '',
            refreshDatapointsModal: false
        };
        this.renderPlant = this.renderPlant.bind(this);
        this.renderDatapoint = this.renderDatapoint.bind(this);
        this.buildDatapointCharts = this.buildDatapointCharts.bind(this);
        this.getPlantDetail = this.getPlantDetail.bind(this);
        this.refreshDatapoints = this.refreshDatapoints.bind(this);
        this.renderRefreshDatapointsModal = this.renderRefreshDatapointsModal.bind(this);
        this.deletePlant = this.deletePlant.bind(this);
        this.renderDeleteModal = this.renderDeleteModal.bind(this);
    }

    componentDidMount(){
        this.getPlantDetail()
    }

    getPlantDetail(){
        if (window.mega_api){
            window.mega_api.getPlant(this.state.plantId).then((plant) => {
                this.setState({plant: plant.plant, refreshDatapointsModal: false});
            })
        }
    }

    buildDatapointCharts(){
        let dataset = [];
        this.state.plant.datapoints.forEach((datapoint) => {
            dataset.push({
                datetime : new Date(datapoint.datetime).toUTCString(),
                "Observed Energy": datapoint.observed.energy,
                "Expected Energy": datapoint.expected.energy,
                "Observed Irradiation": datapoint.observed.irradiation,
                "Expected Irradiation": datapoint.expected.irradiation,
            })
        });

        return <div>
            <h3>Energy Charts of {this.state.plant.name}</h3>
            <ResponsiveContainer width="100%" height={window.innerHeight*0.50}>
                <LineChart
                    data={dataset}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 50
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="datetime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Observed Energy" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Expected Energy" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

            <h3>Irradiation Charts of {this.state.plant.name}</h3>
            <ResponsiveContainer width="100%" height={window.innerHeight*0.50}>
                <LineChart
                    data={dataset}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="datetime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Observed Irradiation" stroke="#cabd37"/>
                    <Line type="monotone" dataKey="Expected Irradiation" stroke="#b14cca"/>
                </LineChart>
            </ResponsiveContainer>

        </div>
    }

    refreshDatapoints(){
        if  (window.mega_api){
            const {plantId, fromDate, toDate} = this.state;
            console.log(this.state)
            const datapointsResponse = window.mega_api.refreshPlantDatapoints(plantId, fromDate, toDate)
            if (datapointsResponse){
                datapointsResponse.then((response) => {

                    this.getPlantDetail();
                })

            }
        }
    }

    renderRefreshDatapointsModal(){
        return <Modal show={this.state.refreshDatapointsModal} onHide={(event) => {
            this.setState({refreshDatapointsModal: false})
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Refresh datapoints</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>From date</Form.Label>
                        <Form.Control
                            type="date"
                            onChange={(e) => {
                                this.setState({
                                    fromDate: e.target.value
                                })
                            }}
                        />
                        <Form.Text>
                            The date from where you want the datapoints data
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>To date</Form.Label>
                        <Form.Control
                            type="date"
                            onChange={(e) => {
                                this.setState({
                                    toDate: e.target.value
                                })
                            }}
                        />
                        <Form.Text>
                            The date until you want the datapoints data
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={(event) => {
                    this.refreshDatapoints();
                }}>Save</Button>
                <Button variant="danger" onClick={(event) => {
                    this.setState({refreshDatapointsModal: false});
                }}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    }

    deletePlant(){
        if (window.mega_api){
            const deletePlant = window.mega_api.deletePlant(this.state.plantId);
            if (deletePlant){
                deletePlant.then(() => {
                    this.setState({redirectToList: true});
                })
            }
        }
    }

    renderDeleteModal(){
        return <Modal show={this.state.deleteModal} onHide={(event) => {
            this.setState({deleteModal: false})
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Refresh datapoints</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you want to delete {this.state.plant.name} ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={(event) => {
                    this.deletePlant();
                }}>Yes, delete it</Button>
                <Button variant="danger" onClick={(event) => {
                    this.setState({deleteModal: false});
                }}>No, I do not want to delete it</Button>
            </Modal.Footer>
        </Modal>
    }

    renderPlant(){
        const {plant, showGraphs} = this.state;
        if (plant){
            return <div>
                <h3>{plant.name}</h3>
                <ButtonGroup>
                    <Button variant="primary" onClick={(event) => {
                        event.preventDefault();
                        this.setState({redirectToUpdate: true})
                    }}>Edit plant</Button>
                    <Button variant="success" onClick={(event) => {
                        event.preventDefault();
                        this.setState({refreshDatapointsModal: true})
                    }}>Update plant datapoints</Button>
                    <Button variant="danger" onClick={(event) => {
                        event.preventDefault();
                        this.setState({deleteModal: true})
                    }}>Delete plant</Button>
                    <Button variant="secondary" onClick={(event) => {
                        event.preventDefault();
                        this.setState({showGraphs: !showGraphs})
                    }}>{showGraphs ? "Hide" : "Show"} Charts</Button>
                </ButtonGroup>
                {showGraphs ? this.buildDatapointCharts() : null}
                <h3>Plant datapoint table</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Energy expected</th>
                            <th>Energy observed</th>
                            <th>Irradiation expected</th>
                            <th>Irradiation observed</th>
                            <th>Datetime</th>
                        </tr>
                    </thead>
                    <tbody>
                    {plant.datapoints.map( (datapoint) => {
                        return this.renderDatapoint(datapoint);
                    } )}
                    </tbody>
                </Table>

            </div>
        }
    }

    renderDatapoint(datapoint){
        return <tr key={`datapoint_${datapoint.id}`}>
            <td>{datapoint.expected.energy}</td>
            <td>{datapoint.observed.energy}</td>
            <td>{datapoint.expected.irradiation}</td>
            <td>{datapoint.observed.irradiation}</td>
            <td>{new Date(datapoint.datetime).toUTCString()}</td>
        </tr>
    }

    render() {
        if (this.state.redirectToUpdate)
            return <Redirect to={`/plant/${this.state.plantId}/update`}/>;
        if (this.state.redirectToList)
            return <Redirect to={`/plants`}/>;
        return (
            <div>
                {this.state.plant ? this.renderPlant() : null}
                {this.state.plant ? this.renderRefreshDatapointsModal() : null}
                {this.state.plant ? this.renderDeleteModal() : null}
            </div>
        );
    }
}

export default withRouter(PlantDetailView);