import React from "react";
import axios from "axios";
import Comments from "./Comments";
import moment from "moment";
import { Button, Comment, Header, Form, Icon, Menu } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import GaugeChart from "react-gauge-chart";
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
export default class PostMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      author: "",
      timestamp: "",
      content: "",
      rating: 0,
      image: "",
      comments: [],
      commentReply: "",
      loading: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props.match.params.title);
    axios
      .get(
        `https://moviereviewbolg.herokuapp.com/api/reviews/${this.props.match.params.title}`,
        {}
      )
      .then((results) => {
        console.log(results.data);
        this.setState(results.data);
        this.setState({
          loading: false,
          comments: results.data,
        });
      });
    axios
      .get(
        `https://moviereviewbolg.herokuapp.com/api/comments/${this.props.match.params.id}`,
        {}
      )
      .then((results) => {
        console.log("hi");
        console.log(results);
      });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = () => {
    var commentData = {
      review_id: this.props.match.params.id,
      username: "Random User",
      content: this.state.commentReply,
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAclBMVEX///8AAADw8PDR0dFXV1d4eHi7u7vLy8v09PT39/efn5+WlpZ+fn7l5eVwcHDW1tYmJibc3Nypqam1tbVnZ2c3NzcWFhZdXV3CwsIxMTHo6Og6Ojqjo6N7e3tTU1OEhIRGRkYMDAyRkZFAQEAcHBwSEhKH+JlWAAAOGElEQVR4nM1dbWOqOgze8BUVFUF0TKe43f//F++U40zaFJK2QJ9vZ0dKU9q8PE3Tt7euEZWb7LRc5df9tqiq9/eqKrb7a75anrJNGXX++k4xylbj/Xsj9uNVNhq6nxaYp6dJ1SwaRDU5pfOh+8xHujgUfOGeKA6LdOieMxBNJ3LZXphMg16VcTZ2ka7GOIuHloNGPD24S1fjMA1PxvRssezMKM5Brcc4+/ApXY2PYKbq/Ob1471Q3EIwHcm5G+lqnJOhxVt3Kd4d6yFFZIlXfY/Xt+w42yTRv0UVR8lmdsxu6/F3FbKI8aWta9vJ4tjsT0flcTHZtrVzGUTdnBr79JHvBD70aJc36+FTd3IYMGsa9nxnMauSXd7Q5HbmX4YGlF/GnuwvDtHP6GKOrr5Kf/1vw8LYi5uzA5LejI0vfPSd0wXTKK89Ra4jk3Le9+K/GT7fdufR7ZjvDEu8+49YfpMvzr3rgBmtcr47XolT8q2TTqZOSofO0y7e9QT5yktnQXhEuhKTrl73FlHaZdKpI5VQQ7rvaESPxLvyzv3EhFqLxy7eRLhm/bgXlNPUgetGDGRfhpeyTLnnV8S6bzbukeCLdLbuy2uEEf1oL+hUW+vQ7dOPxwFONdLl0Ds/G2mkZOHN+m600dv5alqCndaNjZ+GR2q724E4hERTp168+5na6tmikWizu+WfzxY+89tuYzPJNQbPg53S5BNPz/l0TXro3+upOADRpqmzhNr8FK7scvGptgDxuRBGB6naguMsVfXLh2xiTc3Uxh++ZAYnUtkpJ02jjtdY1JVlu3Q1lqJhU42+g7WIFPsnCVTmrawpxEWyGpUIo7C2ybEi30XwKPvrPbEUuF7K2BW2XpuygJb8J4+6a9eKH0EMpAzfl1y2O5T4gR87EK4xCwL3XYkvrGILJf7jy0fzNizwFaoioUV8qMTv/PnplmXBfo0yS8UxfoSfZ+uXeaNdb8eerU4VTSNVpZhfYg+s5vg8cV2fjqPyoe7icnQ8ra+mX7JdEzxV9jL58MNs+07xUr/Rx3JEjG80WtL0NXu2YV0mYhOxnvjgPqZHbC3eJu2pst157LUJXL4Sv5A7vQn5xq3e/oywKVwJFUXB99txdMP19XT5ctajqU7YcSXEvvI38ynFxnBfpq2/D3asNtP2r7nrEA8q01bjYeHG75r+FLGmmuvK1aU4xudNNmQhtswXzZUOSnkbjW/h2kP0HMtW4AnK7aeiDS12gBQP6JP5WCKdNliDcheg0jtB4PGCMk25Y4SXYbsmRTHSgfkSxb+2ZL0tW0GMcGvkhEk0pgVU7FHG7JmG7N397W2qG61Z7hhiW+2wa4G/IddDRE+1aMWTzQuwBbRaf0/gdci1hmiAG0PD2GaKxIifcNxBR9rqh0m24Ena9BCKsbiWGo06124agdYIdzYg09YQuyY2XcVf3XlfBts1Ll+25fUBpVBxPUn01Z0WYA00IbhMAlL+a9Ov0OBxiSo0/9mRYxOQ580N1VBEYvqEa86PVKAB95J1gb4Gd0qgj2P4hOg3bGVo89VbgL4G9yGkfumvc27/iQ5kZD1tmqN4jes2oM9Dxngo4GHThNB1Fe09NQEabjYtj5QdFWyhTFvu2kaxh7e8J7QKuUwL0nY3/f/RVhJ7BUILy43gGIDRJZsZgKuQ2HBCnjx7MVn1pB1W44aWrh7RQOvD1oZo3XrMxUUzn03mQ+2rWWQkPnsxQR3q7IVCQNeLHX6hpatOwrNVV6Fr4MFLewG6D0bPSwMcFsVSIBXDz4SBDLHX0/CQhGTzuYieUdQMstfsSY80s9f0PLuWkUrAMxsSN/wpAbNoruynWIC7a/xMGLhkEGGGYjr+XINTgj8s4q7ylwyi1+EcRUaQ3wvo/HjOoobkEOGWmADlgKZwbNccNDyeE+EhkSUIUuCQA9cYLWlBSAD9GM8lReBkE/iAyJy/lBPUoZK9btia5zNFKPoRPAd3jl56FLqpgnwtJKDnY7ZI7Qmeg0HTK2SAjUmmmmUnumx7RD2X2nY0QAHRc091AoMTEa0SooBQsz8DOOjGiDKyQxQQOh//nJk5dLRFzDTsRCBKBqnfovaq4RKUMbewE4GYCRy514sQekUyZjM8Q/+GF2HtP0IrKDsUEZ6r9oYXYW0JK+vvEJ6z/Ya/ffX4C/iDUBcGFy49oMoDJRYSR8EFvA9AZuY+I2EsKNx/Do2yqAF1yj0mXIF/S7nbwEinGtAxW73hYFeqCgOjDWtABXwPemEEJbXWYRG//wBp8T2e7ZV0HYVF3f9DVIGHI9SWdLaHtflCdqpEql6+gxnS9tkfoFbZICshN9YBbYC+AFVf5uATPRDOFvYL2IOECtkiDzKYJAQAOCmXyM7bRASwM0OmkQBAQ7hCrdksokASgUwN5C5e7QOBpHJB4BgAOjJWqYJBJOMhQLpjj5wiq4AgiHRKBDiptm+Fa3MhJMRiwCEv3irwL7suDZ/SrAI0UXkQcPikdBVIQNigbbcGPlagAcnkQ8BhD4boQDJVHgQc9miPDtBI5UfAIQ9nEUACupuJBwY7XkcAmwlnQ19jsAOSBLChd3bV/kE74iqaptZHXClgV83V2f7DIIeUSWBn2zVcemGAY+Y0cLjkGvAC9F4owAAc8DpSFgh9l3owAFMWjqQTRr/FOkzApJMbbaiiudxKUpdbSfyUWzEC04ZuxK8G14I5nx7KkWPi1426J9BTyaMGYOreafOFRC9FqxqgbL44bZ/RmFveMHXwUy1f2T5z2gClEWWtl5xQ2GZ+dsHVDVCXLWyyfYf7z8Y+RljdwnZIQtCRiko2Urg4b3CoSQgOaSQqZl6udzs4bgCoaSTekiKn3i5A+3DSppo8lSqxFTJHC4/xae8W66lc9sl4Lxyt9GYTtrb6Rk/Gs0+nfCL1cHGkjrGdutHTKe0TYmvM2+6vK66Hy+44S8vn3WdlOjvuLodr27V+ZxvLryfE2qc0P5Cp3cKfYXksjd2cl8dl88eXL0Uipdk+Kf0XpTHsef/JMx5lkeXmirlXqfdIJKXbHyugY/gat5GAZY1H5vuyhENOHSuwPhhiKua7tXFH0otBE8tu7oBPptQfJZfq0R36Oloy5PHRUFjdtk9/f7U7nEXPqovTJnZC+7J8sog+nGV1vI70O2VF3SnQBeS5FewMx+ssDkgmFSWeXB4KlIgVb2IYDkjKj7hqt1D8YuUtaztaEc2zYgzDEVfxIWXCuI+93pOSEPqZY/RNvxceMyfmkCsproEYw/YVYDxmLisUoGs63/dYPaDvybRqeGOhAFGpB5347OiSKZ1/bKFUGko9CIp1aPJ9dXf/oGb4myVsKNbBL7eixUZW+XJcaKuhsaZyQ7kVdsEc7Y2dXAX4grZf1TCejQVzmCWPtIvyOr84VruHyMzdNpY84hWtUnX3vodbuGP1Yk6TRWopWsUpO6aGD37vADRBu/vQYKhbyo4xCscpKWndWD8KqkVs7x3lb7aX/lOYz97k0yQks6BaS/+1Fm9U4qMe5dMkJKKn9uKNbeU3d63v6BLK6Oq+CKP8ZnMBVeWaNy+73RIoN/ypSVmcAqrNJXAxs/fj8epyHuZKB5T/ZpXAbSpirHigvd9xqulwvIZ4RYwbylArEXwvNyiraOoDswy1uZA4bnuQS1w1NQf+h1tI3FgKHnMkPSvQF7AqXf39nV8K3lDMH7toXo9bixBj7vvPZeMX8zdcx4D3pj1d72sDbKueEYPkOgbyQg08951TEl2A2fRaF8gu1CCuRIn/o4ZtIKDJ9N9jucmuRCEutcFBfOcRbjNw/HtXmNJLbbRrifCBAZt7or0Cc0Jz+bVE2sVSyETYHnjzB3yYb2VxsZQyC3KUKeCdwJYD0SYFjqOY60djlv4wsIapYU6oYucSkpeP3zGID6qC2tl6gB/ClYYWvNVycIMp80SQkGHISvZcHM4WhtwA0Q4JmVl+7aa/cpC5OcJcV5VtvSOIFXgHtQqF19RqHGhIH5D8hGKOQT+lE4ANfELf/rXYAzqpbfjvpz3UvllVVlTIVs/FC92wxn2zJKGVTQ+vleHcoGRBWJRFeiBWElY73cuVQNmFpbaSeIgUCb0cnXKHYqQLB5JW3V4NwldTPTWnEFzZkXj/GIDSxojUYMKRA9P8vqAoi3cP/rHmFg1Ea9fQUqg9uI+ahAPSMlqSjhf3WJul0joVvqDVu/AVv6maZqBpqmf4e+PYU+2IyqF3bRppKdSFR30X6Sc3OsowNEHnGH68jrGWjCM9zuAG4oCG9yQkPT3VZ83bZhA8ZgdJLFp8+KtOeyExZsSJGM+V9WtQlTjyzi1GQkydrnI4I4qJmnQqYkLRe/vuVj/JJl66S2kmD/p0GrTRjPCkEw88pct+dGyfSnrfIveubmbU2nt///Z8twwBw97Tducxu2u+M5wl7MUypZSuuWPtyfcdrQ0v2PcVjJo3EG/OXUjNh117cyx+V6LhqOZ9lC8O33F0Mc2OX9+s+9UHQbkXf8h3FsYx2dFqpUY/ThMC4boBfOQ7ycnbXd5c6aMT16wNcWvtmO1kcSwb3YCoPC4mrXUwLkPldiQmdQdRfY7Xt+w42yTRs9RDlGxmx+y2Hn9WjAbWAzEkfBGdMKh4DxHbSnU44Ty0eHfMb21VRSxR3HpPfTcgzrxVO3rhIxs8bQwiPXv9jMV54C0CAvHUS02uOw7ToD7eC3HmofbROKypqSKaulWnnA6+P8dAujhYLMjisAhv3RkxT0+Tii9cNTmloZgECUbZamyOfx7Yj1dZIDl+tojKTXZarvLrfltUv1+1qort/pqvlqds0+yJe8H/gVWi9xHgj/YAAAAASUVORK5CYII=",
      timestamp: Date.now(),
    };
    axios
      .post(
        `https://moviereviewbolg.herokuapp.com/api/addComment/${this.props.location.state.id}`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          //change the response so it sends json, then its working
        }
      )
      .then((response) => {
        this.setState({
          comments: this.state.comments.concat([commentData]),
          commentReply: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    console.log(this.state);
    const loadingIcon = this.state.loading ? (
      LoadingMessage()
    ) : (
      <div className="main-review-div">
        <Helmet>
          <meta
            charSet="utf-8"
            name="description"
            content={this.state.subtitle}
          />
          <title>{this.state.title} Movie review - The Stream Source</title>
        </Helmet>
        <div
          className="content-div"
          style={{
            marginLeft: "20%",
            marginRight: "20%",
            fontFamily: "goudy-old-style",
          }}
        >
          <div className="heading-div" style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: 47,
                fontFamily: "playfair-display",
                fontWeight: "bold",
              }}
            >
              {this.state.title}
            </h1>
            <h2 style={{ fontSize: 22, color: "grey" }}>
              {this.state.subtitle}
            </h2>
          </div>
          <div
            className="rating-chart"
            style={{
              width: "85%",
              textAlign: "center",
              display: "block",
              margin: "auto",
            }}
          >
            <GaugeChart
              id="rating-gauge"
              nrOfLevels={3}
              colors={["red", "#FEC925", "#06A10B"]}
              percent={this.state.rating}
              textColor={"#00000"}
            />
          </div>
          <div
            className="subheading-div"
            style={{ textAlign: "center", paddingTop: 20 }}
          >
            <p style={{ fontSize: 17 }}>{`${moment(this.state.timestamp).format(
              "lll"
            )} by ${this.state.author}`}</p>
            <Menu.Item
              href={`https://twitter.com/intent/tweet?text=Check+out+this+review+of+${this.state.title}!&url=https%3A%2F%2Fwww.thestreamsource.com%2Freviews%2F${this.state._id}`}
              position="right"
              target="_blank"
            >
              <Icon circular inverted name="twitter" />
            </Menu.Item>
            <Menu.Item
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.thestreamsource.com%2Freviews%2F${this.state._id}&title=${this.state.title}`}
              position="right"
              target="_blank"
            >
              <Icon circular inverted name="linkedin" />
            </Menu.Item>
            <Menu.Item
              href={`http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.thestreamsource.com%2Freviews%2F${this.state._id}&description=${this.state.title}`}
              position="right"
              target="_blank"
            >
              <Icon circular inverted name="pinterest" />
            </Menu.Item>
          </div>
          <div
            className="img-div"
            style={{ textAlign: "center", paddingTop: 10, paddingBottom: 100 }}
          >
            <img
              style={{
                width: "100%",
                height: 530,
                objectFit: "cover",
                display: "block",
              }}
              src={this.state.image}
            />
          </div>
          <hr width={150} />
          <div
            className="body-div"
            style={{
              textJustify: "distribute",
              textAlign: "justify",
              marginTop: 100,
              marginBottom: 100,
              marginRight: 20,
              marginLeft: 20,
            }}
          >
            <div style={{ whiteSpace: "pre-wrap", fontSize: 20 }}>
              {this.state.content}
            </div>
          </div>
          <div className="footer-div" style={{ textAlign: "center" }}>
            <Button>Subscribe to the Newsletter</Button>
          </div>
        </div>
        <div className="comments-div-main">
          <Comment.Group
            style={{ display: "block", margin: "auto", marginTop: "100px" }}
          >
            <Header as="h3" dividing>
              Comments
            </Header>
            {/* <Comments comments={this.state.comments} /> */}
            <Form reply>
              <Form.TextArea
                name="commentReply"
                onChange={this.onChange}
                value={this.state.commentReply}
                placeholder="Add a comment..."
              />
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
                onClick={this.onSubmit}
              />
            </Form>
          </Comment.Group>
        </div>
      </div>
    );
    return <div>{loadingIcon}</div>;
  }
}
