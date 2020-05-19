import React from "react";
import { Card } from "semantic-ui-react";
import Carousel from "@brainhubeu/react-carousel";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "@brainhubeu/react-carousel/lib/style.css";
import axios from "axios";
import "../styles/Home.css";
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
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}

const carouselCard = ({
  title,
  rating,
  author,
  image,
  content,
  timestamp,
  subtitle,
  tags,
  _id,
}) => (
  <Card key={_id} style={{ height: 500, width: "100vh", overflow: "hidden" }}>
    <Link
      to={{
        pathname: `/reviews/${title
          .replace(/\s+/g, "-")
          .replace("(", "")
          .replace(")", "")
          .replace("/", "-")
          .replace(",", "")
          .replace(".", "")
          .replace("!", "")
          .toLowerCase()}-review`,
        state: {
          id: _id,
        },
      }}
    >
      <img
        src={image}
        style={{
          height: 420,
          width: "100%",
          objectFit: "cover",
        }}
      />
    </Link>

    <div className="test" style={{ backgroundColor: "#5b7f71", height: 80 }}>
      <div className="description-div" style={{ marginLeft: 20, marginTop: 5 }}>
        <h2
          style={{
            color: "white",
            fontFamily: "playfair-display",
            fontWeight: 600,
          }}
        >
          {title}
        </h2>
        <h3
          style={{
            color: "white",
            fontFamily: "goudy-old-style",
            fontWeight: 400,
            fontSize: 16,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </h3>
      </div>
    </div>
  </Card>
);

const categoryCard = ({
  title,
  rating,
  author,
  image,
  content,
  timestamp,
  subtitle,
  tags,
  _id,
  category,
}) => (
  <div
    className="category-div"
    style={{ width: "100%", textAlign: "center", margin: "10px" }}
  >
    <Link
      to={{
        pathname: `/reviews/${title
          .replace(/\s+/g, "-")
          .replace("(", "")
          .replace(")", "")
          .replace("/", "-")
          .replace(",", "")
          .replace(".", "")
          .replace("!", "")
          .toLowerCase()}-review`,
        state: {
          id: _id,
        },
      }}
    >
      <Card
        style={{
          marginRight: "2rem",
          height: 170,
          width: "100%",
          display: "inline-block",
        }}
        key={_id}
      >
        <img
          src={image}
          style={{ height: 120, objectFit: "cover", width: "100%" }}
        />
        <div
          className="card-footer-div"
          style={{ backgroundColor: "#5b7f71", height: 50 }}
        >
          <div className="description-div" style={{ textAlign: "center" }}>
            <h2
              style={{
                color: "white",
                fontFamily: "goudy-old-style",
                fontWeight: 400,
                fontSize: 24,
                padding: 0,
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                color: "white",
                fontFamily: "goudy-old-style",
                fontWeight: 400,
                fontSize: 18,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >{`${rating * 100}%`}</p>
          </div>
        </div>
      </Card>
    </Link>
  </div>
);

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postsNetflix: [],
      postsHulu: [],
      postsPrime: [],
      loading: true,
      open: false,
    };
  }
  componentDidMount() {
    axios
      .get(`https://moviereviewbolg.herokuapp.com/api/reviews/`, {})
      .then((results) => {
        console.log(results.data);
        this.setState({
          posts: results.data,
        });
        var filterNetflix = results.data.filter((post) =>
          post.tags.includes("Netflix")
        );
        var filterHulu = results.data.filter((post) =>
          post.tags.includes("Hulu")
        );
        var filterPrime = results.data.filter((post) =>
          post.tags.includes("Prime")
        );
        console.log(filterNetflix);
        this.setState({
          postsNetflix: filterNetflix,
          postsHulu: filterHulu,
          postsPrime: filterPrime,
          loading: false,
        });
      });
    setTimeout(() => {
      this.setState({
        open: true,
      });
    }, 1500);
  }
  close = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    //console.log(this.state.postsNetflix);
    const loadingIcon = this.state.loading ? (
      LoadingMessage()
    ) : (
      <div className="main-div" style={{ marginLeft: 50, marginRight: 2 }}>
        <div className="carousel-div">
          <Carousel autoPlay={5000} animationSpeed={1000} infinite>
            {this.state.posts.reverse().map(carouselCard)}
          </Carousel>
        </div>
        <div
          className="cards-div"
          style={{ "margin-right": "2%", width: "auto", "margin-top": "5%" }}
        >
          <Card fluid>
            <div
              className="card-category-header"
              style={{ display: "inline-block" }}
            >
              <h1
                style={{
                  width: "300px",
                  color: "#5b7f71",
                  fontFamily: "playfair-display",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
              >
                Netflix Reviews
              </h1>
            </div>
            <hr
              color="#5b7f71"
              style={{ marginLeft: "10px", marginRight: "10px", height: "3px" }}
            />
            <div className="category-netflix-div">
              {this.state.postsNetflix.slice(0, 8).reverse().map(categoryCard)}
            </div>
          </Card>
          <hr width={0} />
          <Card fluid>
            <div
              className="card-category-header"
              style={{ display: "inline-block" }}
            >
              <h1
                style={{
                  width: "300px",
                  color: "#5b7f71",
                  fontFamily: "playfair-display",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
              >
                Prime Reviews
              </h1>
            </div>
            <hr
              color="#5b7f71"
              style={{ marginLeft: "10px", marginRight: "10px", height: "3px" }}
            />
            <div className="category-prime-div">
              {this.state.postsPrime.slice(0, 8).reverse().map(categoryCard)}
            </div>
          </Card>
          <Card fluid>
            <div
              className="card-category-header"
              style={{ display: "inline-block" }}
            >
              <h1
                style={{
                  width: "300px",
                  color: "#5b7f71",
                  fontFamily: "playfair-display",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
              >
                Hulu Reviews
              </h1>
            </div>
            <hr
              color="#5b7f71"
              style={{ marginLeft: "10px", marginRight: "10px", height: "3px" }}
            />
            <div className="category-hulu-div">
              {this.state.postsHulu.slice(0, 8).reverse().map(categoryCard)}
            </div>
          </Card>
        </div>
      </div>
    );
    return (
      <div>
        <Helmet>
          <meta
            charSet="utf-8"
            name="description"
            content="Your source for movie reviews on the top streaming platforms - The Stream Source"
          />
          <title>
            Movie reviews from the top streaming platforms - The Stream Source
          </title>
        </Helmet>
        {loadingIcon}
      </div>
    );
  }
}
