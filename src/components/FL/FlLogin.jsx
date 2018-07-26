/* global gapi */

import React from "react";
import PropTypes from "prop-types";
import Auth from "../../server/auth/authUserCheck";
import GoogleLogin from "react-google-login";
import GoogleLogout from "react-google-login";
import Loading from "../../container/Loading";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default class FlLogin extends React.Component {
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem("successMessage");
    let successMessage = "";

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem("successMessage");
    }

    this.state = {
      errors: "",
      successMessage,
      loading: false
    };

    this.onSignIn = this.onSignIn.bind(this);
    //        this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount = () => {
    //      window.gapi.signin2.render('g-signin2', {
    //        'scope': 'https://www.googleapis.com/auth/plus.login',
    //        'width': 200,
    //        'height': 50,
    //        'longtitle': true,
    //        'theme': 'dark',
    //        'onsuccess': this.onSignIn
    //      });
  };

  onSignIn = googleUser => {
    console.log("on Sign In");
    this.setState({loading: true})
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    let email = profile.getEmail();
    let url = localStorage.getItem("BACKEND_HOST")+"/doFlSignIn";
    let restMethod = "POST";
    let async = true;
    let data = {
      email: email,
      password: id_token,
      user_type: "Freelancer",
      mode: "Google",
      status: "Profile Setup"
    };

    let response;
    console.log("doSignIn => " + url);
    console.log(data);
    let xhttp = new XMLHttpRequest();
    xhttp.open(restMethod, url, async);
    xhttp.setRequestHeader("Content-type", "application/json");
    //        xhttp.responseType = 'json';

    xhttp.addEventListener("load", () => {
      if (xhttp.status === 200) {
        console.log("xhttp.status : " + xhttp.status);
        this.setState({
          errors: ""
        });

        response = JSON.parse(xhttp.response);
        Auth.authenticateUser(id_token);
        localStorage.setItem("userType", "Freelancer");
        localStorage.setItem("FreelancerEmail", email);
        localStorage.setItem(
          "FlAccessLink",
          "FlProfileSetup,FlProfile,FlAddInfo,FlDashboard,FlInbox"
        );
        this.context.router.history.push("/FlDashboard"); //see dashboard
      } else {
        console.log("xhttp.status : " + xhttp.status);
        response = JSON.parse(xhttp.response);
        console.log(response);
        let errors = response.message;
        this.setState({
          errors
        });
        console.log(this.state.errors);
        this.setState({loading: false})
      }
    });

    xhttp.send(JSON.stringify(data));
  };

  //    onSignOut = () => {
  //        console.log('onSignOut from fllogin');
  //        let auth2 = gapi.auth2.getAuthInstance();
  //        auth2.signOut().then(function () {
  //            console.log('User signed out.');
  //        });
  //    }

  onBackButtonEvent = e => {
    e.preventDefault();
    this.transitionTo("/");
  };

  responseGoogle = response => {
    console.log(response);
  };

  handleClose = () => {
    this.setState({ loading: false });
  };
  
  render() {
    if(this.state.loading)
        return <Dialog open={this.state.loading}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <Loading />
                </DialogContent>
              </Dialog>
    return (      
        <div id="flLoginDiv">
          <GoogleLogin
            clientId="810373962823-sl3hgiutuefcemik07aighoom6rve9ej.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.onSignIn}
            onFailure={this.responseGoogle}
          />
          {/*
            <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.onSignOut}
            >
            </GoogleLogout>
            */}
        </div>    
    );
  }
}

FlLogin.contextTypes = {
  router: PropTypes.object.isRequired
};
