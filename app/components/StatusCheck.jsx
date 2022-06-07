import React, {Component} from "react";

import Navbar from "./Navbar/Navbar.jsx";
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

var StatusCheck = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            headline:"",
            message:""
        }
    }
    componentDidMount(){
        let headline = "Unknow Page";
        let message = "We're not quite sure how you got here, but we're sure you're not supposed to be here.";
        //extract search params
        let params = new URLSearchParams(window.location.search);
        let method = params.get("method");
        let stat = params.get("stat");
        let donation_id = params.get("d");
        let session_id = params.get("session_id");
        if(method=="direct-debit"){
            if(stat=="cancel"){
                headline = "Direct Debit Setup Cancelled";
                message = "Your setup has been cancelled. Never mind!";
            }else if(stat=="success"){
                headline = "Thank you so much for your generosity!";
                message = "Your direct debit setup has been completed. It will take a few days to finalise the details with your bank.";
            }
        }else if(method=="cardonce"){
            headline = "Thank you so much for your generosity!";
            message = "Your payment is being processed.";
        }else if(method=="cardrec"){
            headline = "Thank you so much for your generosity!";
            message = "Your recurring donation method is being established, you will recieve an email shortly.";
        }
        this.setState({
            headline: headline,
            message: message
        })
    }
    render(){
        return(
            <React.Fragment>
                <Navbar />
                <div className="uk-section-default uk-section uk-section-xsmall">
                    <div className="uk-container">
                        <div className="uk-grid">
                            <div className="uk-width-1-1">
                                <h1>{this.state.headline}</h1>
                                <p className="uk-text-lead">{this.state.message}</p>
                                <hr />
                                <p className="uk-text">In the meantime, you can head back to the Assemble Church website: </p>
                                <a href="https://www.assemblechurch.com" className="uk-button uk-button-primary uk-button-large">Back To Assemble Church</a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default StatusCheck;