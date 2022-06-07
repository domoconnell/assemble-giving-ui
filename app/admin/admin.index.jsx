import React, {Component} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";

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

var Admin = class extends Component{
    constructor(props){
        super(props)
        this.state = {
    
        }
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <React.Fragment>
                <Navbar />
                <div>Admin section</div>
                <Routes>
                    <Route path="/" element={<div>admin route main tiunger</div>} />
                    <Route path="ting" element={<div>lting</div>} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
            </React.Fragment>
        );
    }
};

export default Admin;