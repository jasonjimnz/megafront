import React, {Component} from 'react';
import Alert from "react-bootstrap/Alert";
import {withRouter} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

class PlantDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: null,
            plantId: this.props.match.params['plant_id'],
            energyGraph: null,
            irradiationGraph: null
        };
        this.renderPlant = this.renderPlant.bind(this);
        this.renderDatapoint = this.renderDatapoint.bind(this);
        this.buildEnergyGraph = this.buildEnergyGraph.bind(this);
        this.buildIrradiationGraph = this.buildIrradiationGraph.bind(this);
        this.buildDataObject = this.buildDataObject.bind(this);
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

    buildEnergyGraph(){
        if (!this.state.energyGraph)
            return null;
        return <div>
            asdf
        </div>
    }

    buildDataObject(){
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

    buildIrradiationGraph(){
        if (!this.state.irradiationGraph)
            return null;
        return <div>
            Asdf
        </div>
    }

    renderPlant(){
        const {plant} = this.state;
        if (plant){
            return <div>
                <span>{plant.name}</span>
                <span>{plant.id}</span>
                {this.buildDataObject()}
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
        return (
            <div>
                <h2>React</h2>
                <Alert variant="success">Panel Detail View</Alert>
                {this.state.plant ? this.renderPlant() : null}
            </div>
        );
    }
}

export default withRouter(PlantDetailView);