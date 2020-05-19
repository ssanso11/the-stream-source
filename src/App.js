import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search, Modal, Image, Header } from "semantic-ui-react";
import PostScreen from "./posts/PostScreen";
import HomeScreen from "./home/HomeScreen";
import PostMain from "./posts/PostMain";
import FooterApp from "./home/Footer";
import "rc-footer/assets/index.css";
import "bootstrap/dist/css/bootstrap.css";
import CreatePost from "./posts/CreatePost";
import AboutScreen from "./home/AboutScreen";
import logo from "./images/company-logo.png";
import ReactGA from "react-ga";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }
  componentDidMount() {
    ReactGA.initialize("UA-165934709-1");
  }

  render() {
    return (
      <Router>
        <div value="mainDiv">
          <div className="image-div" style={{ backgroundColor: "#fcfcfc" }}>
            <a href="/">
              <img
                src={logo}
                height={120}
                style={{ margin: "auto", display: "block" }}
              />
            </a>
          </div>
          <nav
            className="navbar navbar-expand"
            style={{ backgroundColor: "#fcfcfc" }}
          >
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul id="menu-main-nav" className="navbar-nav nav-fill w-100">
                  <li
                    id="menu-item-reviews"
                    className="nav-item  menu-item-reviews"
                  >
                    <a href="/reviews" className="nav-link">
                      Movie Reviews
                    </a>
                  </li>
                  <li
                    id="menu-item-963"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-963"
                  >
                    <a href="/about" class="nav-link">
                      About Us
                    </a>
                  </li>
                  <li
                    id="menu-item-40"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40"
                  >
                    <a
                      href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=Contact+The+Streamsource&to=contact.thestreamsource@gmail.com"
                      class="nav-link"
                      target="_blank"
                    >
                      Feedback
                    </a>
                  </li>
                  {/* <li
                    id="menu-item-40"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40"
                  >
                    <Search placeholder="Search for a review..." />
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
          <hr className="hr-test" style={{ color: "black" }} />

          <div style={{ backgroundColor: "black", height: "100" }}></div>

          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/home">
              <HomeScreen />
            </Route>
            <Route exact path="/reviews">
              <PostScreen />
            </Route>
            <Route exact path="/about">
              <AboutScreen />
            </Route>
            <Route exact path="/reviews/:title" component={PostMain} />
            <Route exact path="/admin/create">
              <CreatePost />
            </Route>
          </Switch>

          <div className="footer" style={{ paddingTop: 200 }}>
            <hr style={{ color: "black", width: "85%" }} />
            <FooterApp />
          </div>
        </div>
      </Router>
    );
  }
}
