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



var Quickgive = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            error: false,
        }
    }
    componentDidMount(){
        this.FetchQuickGiveTransactions();
    }
    FetchQuickGiveTransactions(){
        let that = this;
        axios.get(API_URL + "donation-management/quick-give").then(function(response){
            that.setState({
                loading: false,
                transactions: response.data.quick_gives
            })
        }).catch(function(){
            that.setState({
                loading: false,
                error:"Could not fetch Quick Give transactions"
            })
        })
    }
    render(){
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
                {this.state.transactions.map(function (transaction, i) {
                    return (
                        <div className="uk-margin-bottom uk-card-default" key={i}>
                            <div className="uk-card-body">
                                <div className="uk-grid-small uk-flex-column uk-flex-1" uk-grid="true">
                                    <div className="uk-width-expand">
                                        <h3 className="uk-card-title uk-margin-remove-bottom">{new moment(transaction.created_at).format("h:mma Do MMM YYYY")}</h3>
                                        <h4 className="uk-margin-small-top">{Functions.FormatAmount(transaction.amount)}</h4>
                                        <hr />
                                        <p className="uk-text-meta uk-margin-remove-top">
                                            {transaction.wallet_type=="apple_pay"&& <span><i className='fa-brands fa-cc-apple-pay'></i> Apple Pay</span>}
                                            {transaction.wallet_type=="google_pay"&& <span><i className="fa-brands fa-google-pay"></i> Google Pay</span>}
                                        </p>
                                        <p className="uk-text-meta uk-margin-remove-top">**** **** **** {transaction.card_last_4}</p>
                                        <p className="uk-text-meta uk-margin-remove-top">
                                            {transaction.card_network=="mastercard" && <span><i className="fa-brands fa-cc-mastercard"></i> Mastercard</span>}
                                            {transaction.card_network=="visa" && <span><i className="fa-brands fa-cc-visa"></i> Visa</span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })} 
            </React.Fragment>
            
        )
    }
};

export default Quickgive;