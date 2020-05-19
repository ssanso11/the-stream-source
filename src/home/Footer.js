import React from "react";
import Footer from "rc-footer";

export default class FooterApp extends React.Component {
  render() {
    return (
      <Footer
        theme="light"
        columns={[
          {
            title: "Movie Reviews by Category",
            items: [
              {
                title: "Netflix",
                url: "/reviews",
              },
              {
                title: "Hulu",
                url: "/reviews",
              },
              {
                title: "Prime Video",
                url: "/reviews",
              },
            ],
          },
          {
            title: "Us",
            items: [
              {
                title: "About",
                url: "/about",
              },
              {
                title: "Feedback",
                url:
                  "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=Contact+The+Streamsource&to=contact.thestreamsource@gmail.com",
                openExternal: true,
              },
              {
                title: "Admin",
                url: "/admin/create",
              },
            ],
          },
          {
            title: "Discover",
            items: [
              {
                title: "Instagram",
                url: "https://www.instagram.com/thestreamsource/",
                openExternal: true,
              },
              {
                title: "Subscribe to the Newsletter",
                url: "https://mobile.ant.design/",
              },
              {
                title: "Github",
                url: "https://github.com/ssanso11",
              },
            ],
          },
        ]}
      />
    );
  }
}
