import React, {Component} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import moment from "moment";
import Functions from "../helpers/Functions";



var Summary = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            error: false,
        }
    }
    componentDidMount(){
    
    }
    render(){
        if(this.state.loading){
            return(
                <div className="uk-section-default uk-section uk-section-xsmall">
                    <div className="uk-container">
                        <h3>Thank you for giving to Assemble Church</h3>
                        <p>In this portal you can view your historical giving and cancel any recurring giving donations.</p>
                        <p>If you'd like to make an additional donation to Assemble Church, you can do so by using the giving form on the Assemble Church website:</p>
                        <p><a href="https://www.assemblechurch.com/giving/give-online">https://www.assemblechurch.com/giving/give-online</a></p>
                        <hr />
                        <h5>Direct Debits</h5>
                        <p>Direct debit mandates will appear on your bank statement as "STRIPE" - which is our Payment Service Provider</p>
                        <hr />
                        <h5>Further Assistance</h5>
                        <p>If you need help with anything else, drop an email across to <a href="mailto:giving@assemblechurch.com">giving@assemblechurch.com</a>, and someone will get back to you! Or you can call us on <a href="tel:01636 556110">01636 556110</a></p>
                    </div>
                </div>
            )
        }
    }
}

export default Summary;