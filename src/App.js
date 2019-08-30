import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Api from "./services/Api";
import AppHeader from "./components/header/AppHeader";
import HomeView from "./views/home/HomeView";
import PanelListView from "./views/panels/PanelListView";
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
            <Container>
              <Route path={"/"} exact component={HomeView} />
              <Route path={"/plants"} exact component={PanelListView} />
              <Route path={"/plants/create"} exact component={PlantFormView} />
              <Route path={"/plant/:plant_id"} exact component={PlantDetailView} />
            </Container>

          </div>
        </Router>
    );
  }

}

export default App;
