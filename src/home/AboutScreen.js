import React from "react";
import { Helmet } from "react-helmet";

export default class AboutScreen extends React.Component {
  render() {
    return (
      <div className="main-div">
        <Helmet>
          <meta
            charSet="utf-8"
            name="description"
            content="This website is a movie review blog site run by two students at
            Santa Cruz High School. All movies reviewed on this site are
            available on one of three streaming platforms including Hulu,
            Netflix, Amazon Prime Video."
          />
          <title>About Us - The Stream Source</title>
        </Helmet>
        <div
          className="div-about"
          style={{ textAlign: "center", padding: "10px 10px 0px" }}
        >
          <h1 style={{ fontWeight: "bold" }}>About Us</h1>
          <p
            style={{ fontSize: "18px", lineHeight: "30px", marginTop: "30px" }}
          >
            This website is a movie review blog site run by two students at
            Santa Cruz High School. All movies reviewed on this site are
            available on one of three streaming platforms including Hulu,
            Netflix, Amazon Prime Video. However, not all movies may appear on
            there said platform due to frequent content removal in which that
            movie may be taken off the platform. These two students currently
            administer posts, business inquiries, as well as managing ad space
            on the site. There may be some use of language not suitable for all
            audiences on this website. Some movies we review may be rated R and
            not suitable for audiences under the age of 17.{" "}
          </p>
          <p
            style={{ fontSize: "18px", fontWeight: "bold", marginTop: "30px" }}
          >
            BEWARE: SOME OF OUR REVIEWS MAY CONTAIN SPOILERS.
          </p>{" "}
          <p style={{ fontSize: "18px", marginTop: "30px" }}>
            {" "}
            All contact information including feedback, recommendations, and
            business inquires are handled through one email which is under our
            “feedback” tab.{" "}
          </p>
          <p
            style={{ fontSize: "16px", fontWeight: "bold", marginTop: "30px" }}
          >
            {" "}
            Unauthorized reproduction of any material on this website is
            strictly prohibited. We do not own any of the images shown, all
            credit goes to the rightful copyright owner. All rights reserved,
            The Streamsource, 2020.
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bolder",
              marginTop: "30px",
            }}
          >
            contact.thestreamsource@gmail.com
          </p>
        </div>
      </div>
    );
  }
}
