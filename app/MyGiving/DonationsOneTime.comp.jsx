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



var MonthDonations = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            error: false,
        }
    }
    componentDidMount(){
        this.FetchMonthDonationsTransactions();
    }
    FetchMonthDonationsTransactions(){
        let that = this;
        axios.get(API_URL + "donation-management/one-time-donations").then(function(response){
            that.setState({
                loading: false,
                donations: response.data.donations
            })
        }).catch(function(){
            that.setState({
                loading: false,
                error:"Could not fetch donations"
            })
        })
    }
    RenderDonation(donation, i){
        let status = "Success";
        if(donation.payment_success == 0 && donation.payment_failed == 0){
            status = "Pending";
        }else if(donation.payment_success == 0){
            status = "Failed";
        }
        return(
            <div className="uk-margin-bottom uk-card-default" key={i}>
            <div className="uk-card-body">
                <div className="uk-grid-small uk-flex-column uk-flex-1" uk-grid="true">
                    <div className="uk-width-expand">
                        <h4 className="uk-card-title uk-margin-remove-bottom">
                            {status == "Success" &&
                                <i className="fa-solid fa-check uk-text-success"></i>
                            }
                            {status == "Failed" &&
                                <i className="fa-solid fa-xmark uk-text-danger"></i>
                            }
                            {status == "Pending" &&
                                <i className="fa-solid fa-clock"></i>
                            }
                            <span>&nbsp;</span>
                            <span>Donation of</span>
                            <span>&nbsp;</span>
                            <span>{Functions.FormatAmount(donation.amount)}</span>
                        </h4>
                        <hr />
                        <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">Status: {status}</p>
                        <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
                            Created: {moment(donation.created_at).format("MMMM Do YYYY, h:mm a")}
                        </p>
                        <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">Giving Fund: {donation.name}</p>
                        <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
                            Giving Method:&nbsp;
                            {donation.method == "dd" && <span>Direct Debit</span>}
                            {donation.method == "card" && <span>Card</span>}
                        </p>

                    </div>
                </div>
            </div>
        </div>
        )
    }
    render(){
        let that = this;
        if(this.state.loading){
            return(
                <div className="uk-section-default uk-section uk-section-xsmall">
                    <div className="uk-container">
                        <div className="uk-text-center">
                            <div uk-spinner="ratio: 3"></div>
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.error){
            return(
                <div className="uk-section-default uk-section uk-section-xsmall">
                    <div className="uk-container">
                        <div className="uk-alert-danger" uk-alert>
                            <p>{this.state.error}</p>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <React.Fragment>
                <ul className="uk-subnav uk-subnav-pill" uk-switcher="connect: .switcher-container">
                    <li><a href="#">Successful Donations</a></li>
                    <li><a href="#">Failed Donations</a></li>
                </ul>

                <ul className="uk-switcher switcher-container">
                    <li>
                        {this.state.donations.map(function (donation, i) {
                            //all properly active donations
                            if (donation.payment_success == 1 || (donation.payment_success==0 && donation.payment_failed==0)) {
                                return (
                                    that.RenderDonation(donation, i)
                                )
                            }
                        })}

                    </li>
                    <li>
                        {this.state.donations.map(function (donation, i) {
                            //all properly donation pending payment method
                            if (donation.payment_failed==1) {
                                return (
                                    that.RenderDonation(donation, i)
                                )
                            }
                        })}
                    </li>
                </ul>
                
                
                
            </React.Fragment>
            
        )
    }
};

export default MonthDonations;