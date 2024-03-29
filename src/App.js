import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Api from "./services/Api";
import AppHeader from "./components/header/AppHeader";
import HomeView from "./views/home/HomeView";
import PanelListView from "./views/panels/PlantListView";
import PlantFormView from "./views/panels/PlantFormView";
import PlantDetailView from "./views/panels/PlantDetailView";
import Container from "react-bootstrap/Container";

class App extends Component {
  constructor(props){
    super(props);
    window.mega_api = new Api();
  }

  render(){
    return (
        <Router>
          <div className="App">
            <AppHeader/>
            <Container style={{marginTop: '5em'}}>
              <Route path={"/"} exact component={HomeView} />
              <Route path={"/plants"} exact component={PanelListView} />
              <Route path={"/plants/create"} exact component={PlantFormView} />
              <Route path={"/plant/:plant_id"} exact component={PlantDetailView} />
              <Route path={"/plant/:plant_id/update"} exact component={PlantFormView} />
            </Container>

          </div>
        </Router>
    );
  }

}

export default App;
