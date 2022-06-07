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

var RouterLoggedOut = class extends Component{
    constructor(props){
        super(props)
        this.state = {
    
        }
    }
    componentDidMount(){
    
    }
    render(){
        return(
            <Router>
                <Routes>
                    <Route path="/login" element={<div>login form</div>} />
                    <Route path="/register" element={<div>register form</div>} />
                    <Route path="/forgot-password" element={<div>forgot password</div>} />
                    <Route path="/" element={<Navigate to="login" replace />} />
                    <Route path="*" element={<Navigate to="login" replace />} />
                </Routes>
            </Router>
        );
    }
};

export default RouterLoggedOut;