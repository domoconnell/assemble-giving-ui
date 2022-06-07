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
            donationToCancel: false,
            loading: true,
            error: false,
        }
    }
    componentDidMount(){
        this.FetchMonthDonationsTransactions();
    }
    FetchMonthDonationsTransactions(){
        let that = this;
        axios.get(API_URL + "donation-management/recurring-donations").then(function(response){
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
    CancelDonation(id){
        let that = this;
        UIkit.modal.confirm('You are about to cancel this recurring donation, are you absolutely sure? This action cannot be undone.').then(function() {
            that.setState({
                loading: true
            })
            axios.post(API_URL + "donation-management/cancel-donation", {donation_id: id}).then(function(response){
                that.FetchMonthDonationsTransactions();
            }).catch(function(){
                that.setState({
                    loading: false,
                    error: "Could not cancel donation, please contact Assemble Church"
                })
            })
        }, function () {
            that.setState({
                donationToCancel: false
            })
        });
    }
    RenderDonation(donation, i){
        let that = this;
        let status = "Active";
        if (donation.canceled_at) {
            status = "Canceled";
        }
        if (donation.paymentIntent) {
            if (donation.paymentIntent.canceled_at == null) {
                if (donation.paymentIntent.succeed_at == null) {
                    status = "Payment method pending";
                }
            }
        }

        return (
            <div className="uk-margin-bottom uk-card-default" key={i}>
                <div className="uk-card-body">
                    <div className="uk-grid-small uk-flex-column uk-flex-1" uk-grid="true">
                        <div className="uk-width-expand">
                            <h4 className="uk-card-title uk-margin-remove-bottom">
                                {status == "Active" &&
                                    <i className="fa-solid fa-check uk-text-success"></i>
                                }
                                {status == "Canceled" &&
                                    <i className="fa-solid fa-xmark uk-text-danger"></i>
                                }
                                {status == "Payment method pending" &&
                                    <i className="fa-solid fa-clock"></i>
                                }

                                <span>
                                    &nbsp;
                                    {donation.type == "month" && "Monthly"}
                                    {donation.type == "pledge" && "Pledged"}
                                    {donation.type == "once" && "One Time"}
                                </span>
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
                            {donation.type == "pledge" &&
                                <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">Monhtly Donation: {Functions.FormatAmount(donation.monthly_charge)}</p>
                            }
                            {donation.canceled_at &&
                                <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
                                    Canceled: {moment(donation.canceled_at).format("MMMM Do YYYY, h:mm a")}
                                </p>
                            }
                            <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">Giving Fund: {donation.name}</p>
                            <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
                                Giving Method:&nbsp;
                                {donation.method == "dd" && <span>Direct Debit</span>}
                                {donation.method == "card" && <span>Card</span>}
                            </p>
                            <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
                                Total Paid: {Functions.FormatAmount(donation.total_paid)}

                                {donation.type == "pledge" &&
                                    <React.Fragment>
                                        /{Functions.FormatAmount(donation.amount)}
                                    </React.Fragment>
                                }
                            </p>
                            {!donation.canceled_at &&
                                <React.Fragment>
                                    <hr />
                                    <button className="uk-button uk-button-primary uk-button-small uk-margin-small-right" onClick={() => { that.CancelDonation(donation.id)}}>Cancel This Donation</button>
                                </React.Fragment>
                            }
                            {donation.futureTransactions.length > 0 &&
                                <React.Fragment>
                                    <hr />
                                    <p className="uk-text-meta">Upcoming Transactions</p>
                                    {donation.futureTransactions.map(function (transaction, i) {
                                        return (
                                            <div className="uk-margin-small-bottom" key={i}>
                                                <span className="uk-text">
                                                    {Functions.FormatAmount(transaction.amount)}&nbsp;
                                                </span>
                                                <span className="uk-text-meta">
                                                    {new moment(transaction.charge_date).format("MMMM Do YYYY")}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </React.Fragment>
                            }
                            {donation.previousTransactions.length > 0 &&
                                <React.Fragment>
                                    <hr />
                                    <p className="uk-text-meta">Previous Transactions</p>
                                    {donation.previousTransactions.map(function (transaction, i) {
                                        let state = <span className="uk-text-meta">Pending</span>;
                                        if (transaction.payment_success == 1) {
                                            state = <span className="uk-text-meta uk-text-success">Success ({new moment(transaction.payment_returned_at).format("MMMM Do YYYY h:mma")}) </span>;
                                        } else if (transaction.payment_failed == 1) {
                                            state = <span className="uk-text-meta uk-text-danger">Failed</span>;
                                        }
                                        return (
                                            <div className="uk-margin-small-bottom" key={i}>
                                                <span className="uk-text">
                                                    {Functions.FormatAmount(transaction.amount)}&nbsp;
                                                </span>
                                                <span className="uk-text-meta">
                                                    {new moment(transaction.charge_date).format("MMMM Do YYYY")}&nbsp;
                                                </span>
                                                {state}
                                            </div>
                                        )
                                    })}
                                </React.Fragment>
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
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
        let active = 0;
        let pending = 0;
        let cancelled = 0;
        return(
            
            <React.Fragment>
                <ul className="uk-subnav uk-subnav-pill" uk-switcher="connect: .switcher-container">
                    <li><a href="#">Active Donations</a></li>
                    <li><a href="#">Pending Donations</a></li>
                    <li><a href="#">Cancelled</a></li>
                </ul>

                <ul className="uk-switcher switcher-container">
                    <li>
                        {this.state.donations.map(function (donation, i) {
                            //all properly active donations
                            if (donation.canceled_at == null && donation.paymentIntent && donation.paymentIntent.canceled_at == null && donation.paymentIntent.succeed_at != null) {
                                active++;
                                return (
                                    that.RenderDonation(donation, i)
                                )
                            }
                        })}
                        {active==0 &&
                            <div className="uk-text">
                                <p>No active donations</p>
                            </div>
                        }

                    </li>
                    <li>
                        {this.state.donations.map(function (donation, i) {
                            //all properly donation pending payment method
                            if (donation.canceled_at == null && donation.paymentIntent && donation.paymentIntent.canceled_at == null && donation.paymentIntent.succeed_at == null) {
                                pending++;
                                return (
                                    that.RenderDonation(donation, i)
                                )
                            }
                        })}
                        {pending==0 &&
                            <div className="uk-text">
                                <p>No pending donations</p>
                            </div>
                        }
                    </li>
                    <li>
                        {this.state.donations.map(function (donation, i) {
                            //all cancelled
                            if (donation.canceled_at != null || !donation.paymentIntent || donation.paymentIntent.canceled_at != null) {
                                cancelled++;
                                return (
                                    that.RenderDonation(donation, i)
                                )
                            }
                        })}
                        {cancelled==0 &&
                            <div className="uk-text">
                                <p>No cancalled donations</p>
                            </div>
                        }
                    </li>
                </ul>
                
            </React.Fragment>
            
        )
    }
};

export default MonthDonations;