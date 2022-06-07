import React, {Component} from "react";


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import axios from "axios";

var RouterLoggedIn = class extends Component{
    constructor(props){
        super(props)
        this.state = {
    
        }
    }
    componentDidMount(){
        console.log("router logged in")
    }
    render(){
        return(
            <Router>
                <Routes>
                    <Route path="/ting" element={<div>ting</div>} />
                    <Route path="/" element={<div>home</div>} />
                    <Route path="*" element={ <Navigate to="/" replace /> } />
                </Routes>
            </Router>
        );
    }
};

export default RouterLoggedIn;