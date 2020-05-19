import React from "react";
import Posts from "./Posts";
import { Header, Search, Dropdown } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import axios from "axios";
import netflix from "../images/netflix-logo-clear.png";
import hulu from "../images/hulu-logo-clear.png";
import prime from "../images/prime-logo-clear.svg";
import Lottie from "react-lottie";
import loadingScreen from "../images/movie-animation.json";

function LoadingMessage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingScreen,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="splash-screen">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
}
export default class PostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      filteredPosts: [],
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .get("https://moviereviewbolg.herokuapp.com/api/reviews")
      .then((results) => {
        console.log("wtf" + results);
        console.log("data" + results.data);
        this.setState({
          posts: results.data,
          filteredPosts: results.data,
          loading: false,
        });
      });
  }

  filterPosts = (e, { value }) => {
    //bug to fix: posts duplicate when they have two of the same tag
    if (value.length === 0) {
      this.setState({
        filteredPosts: this.state.posts,
      });
    } else {
      var postsFilter = [];
      for (const val of value) {
        var filterEach = this.state.posts.filter((post) =>
          post.tags.includes(val)
        );
        //super inefficient for big data, change eventually
        var postsFilter = postsFilter.concat(filterEach).reverse();
      }
      this.setState({
        filteredPosts: postsFilter,
      });
    }
  };
  render() {
    const loadingIcon = this.state.loading ? (
      LoadingMessage()
    ) : (
      <Posts posts={this.state.filteredPosts} />
    );
    return (
      <div value="mainDiv">
        <Helmet>
          <meta
            charSet="utf-8"
            name="description"
            content="Find and search through all of our reviews - The Stream Source"
          />
          <title>All movie reviews - The Stream Source</title>
        </Helmet>
        <div className="header-div" style={{ display: "inline" }}>
          <Header as="h1" textAlign="center" style={{ fontSize: 43 }}>
            Reviews
          </Header>
          <Dropdown
            placeholder="Filter..."
            search
            multiple
            closeOnChange
            selection
            options={streamingOptions}
            onChange={this.filterPosts}
            style={{
              margin: "auto",
              display: "block",
              marginLeft: "50",
              marginRight: "50",
              width: 50,
            }}
          />
        </div>
        <hr
          width={50}
          style={{ marginBottom: 50, marginTop: 50 }}
          color="gray"
        />
        {loadingIcon}
      </div>
    );
  }
}

const streamingOptions = [
  {
    key: "Netflix",
    text: "Netflix",
    value: "Netflix",
    image: { src: netflix, size: 10 },
  },
  {
    key: "Hulu",
    text: "Hulu",
    value: "Hulu",
    image: { src: hulu },
  },
  {
    key: "Prime",
    text: "Prime",
    value: "Prime",
    image: { src: prime },
  },
];
