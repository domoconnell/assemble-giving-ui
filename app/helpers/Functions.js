import React from 'react';
import moment from "moment";

var Functions = {

    RandomString: function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    AddThouSep: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    FormatAmount(a){
        let amount = a.toFixed(2);
        let am = amount/100;
        am = am.toFixed(2).toString();
        let whole = am.split(".")[0];
        let dec = am.split(".")[1];
        let whole_form = this.AddThouSep(whole);
        let formated = "£" + whole_form + "." + dec;
        return formated
    },
    CalculateSchedule: function(donation){
        let lastDate = donation.lastDate;
        let amount = parseInt(donation.amount);
        let chargeToday = amount;
        let monthlyCharge = amount;
        let type = donation.type;
        let pledgeLength = parseInt(donation.pledgeLength);
        let rows = [];
        let schedule = [];
        //find the next date
        let firstScheduleDate = moment(donation.pledgeTakeDate, "DD").add(1, "M").date(donation.pledgeTakeDate)
        //get the days difference between now and the firstschedueldate
        let daysDiff = firstScheduleDate.diff(moment(), "days");
        
        if(daysDiff<20){
            firstScheduleDate.add(1, "M");
        }

        if(type == "month"){
            let formattedAmount = Functions.FormatAmount(amount);
            rows.push(
                <tr key={"today"}>
                    <td>Today</td>
                    <td>{formattedAmount}</td>
                </tr>
            )
            //get the next 10 dates
            for(let i=0; i<3; i++){
                let d = firstScheduleDate.clone().add((i), "M")
                rows.push(
                    <tr key={"d" + i}>
                        <td>{d.format("Do MMM YYYY")}</td>
                        <td>{formattedAmount}</td>
                    </tr>
                )
                schedule.push({
                    date: d.format("YYYY-MM-DD"),
                    amount: amount
                })
                if(i==10){
                    lastDate = d.format("MMMM") + " of " + d.format("YYYY");
                }
            }
        }else if(type == "pledge"){
            let am = amount/pledgeLength;
            monthlyCharge = am.toFixed(0);
            chargeToday = am;
            let formattedAmount = Functions.FormatAmount(am);
            rows.push(
                <tr key={"today"}>
                    <td>Today</td>
                    <td>{formattedAmount}</td>
                </tr>
            )
            for(let i=0; i<pledgeLength-1; i++){
                let d = firstScheduleDate.clone().add((i), "M")
                rows.push(
                    <tr key={"d" + i}>
                        <td>{d.format("Do MMM YYYY")}</td>
                        <td>{formattedAmount}</td>
                    </tr>
                )
                schedule.push({
                    date: d.format("YYYY-MM-DD"),
                    amount: am
                })
            }
        }

        return {
            schedule: schedule,
            rows: rows,
            lastDate: lastDate,
            chargeToday: chargeToday,
            monthlyCharge: monthlyCharge
        }
    },
    IsValidEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    PasswordValidation(password){
        let passwordHelpers = [];
        //test for password to contain uppercase
        var uppercase = /[A-Z]/;
        //test for password to contain lowercase
        var lowercase = /[a-z]/;
        //test for password to contain numbers
        var numbers = /[0-9]/;
        //test for password to contain special characters
        var special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        //test for password to be at least 8 characters long
        var length = /.{8,}/;
        //test for password to contain at least one uppercase, one lowercase, one number and one special character
        //test for uppercase
        if(!uppercase.test(password)){
            passwordHelpers.push("Must contain at least one uppercase letter");
        }
        //test for lowercase
        if(!lowercase.test(password)){
            passwordHelpers.push("Must contain at least one lowercase letter");
        }
        //test for numbers
        if(!numbers.test(password)){
            passwordHelpers.push("Must contain at least one number");
        }
        //test for special characters
        if(!special.test(password)){
            passwordHelpers.push("Must contain at least one special character");
        }
        //test for length
        if(!length.test(password)){
            passwordHelpers.push("Must be at least 8 characters long");
        }
        return passwordHelpers;

    }

}


export default Functions;