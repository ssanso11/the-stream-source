import React from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
import netflix from "../images/netflix-logo-clear.png";
import hulu from "../images/hulu-logo-clear.png";
import prime from "../images/prime-logo-clear.svg";
import { List } from "semantic-ui-react";

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      subtitle: "",
      author: "",
      timestamp: Date.now(),
      content: "",
      rating: 0,
      image: "",
      tags: [],
      comments: [],
      isAuth: false,
      password: "",
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.trim(),
    });
  };
  onChangeRating = (e) => {
    const { name, value } = e.target;

    this.setState({
      rating: Number(value),
    });
    console.log(this.state.rating);
  };
  onChangeTags = (e, { value }) => {
    this.setState({
      tags: value,
    });
  };
  onSubmit = () => {
    console.log(this.state);
    axios
      .post(
        "https://moviereviewbolg.herokuapp.com/api/admin/create",
        this.state,
        {
          headers: {
            "Content-Type": "application/json",
          },
          //change the response so it sends json, then its working
        }
      )
      .then((response) => {
        alert("review created");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onSubmitPassword = () => {
    if (this.state.password === "thestreamsource") {
      this.setState({
        isAuth: true,
      });
    }
  };

  render() {
    const isAuth = this.state.isAuth ? (
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="title"
            label="Title"
            placeholder="Title"
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            name="subtitle"
            label="Subtitle"
            placeholder="Subtitle"
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            name="image"
            label="Title image Url"
            placeholder="Image Url"
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            name="author"
            label="Author"
            placeholder="Author"
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            name="rating"
            label="Rating"
            placeholder="Rating (as a decimal 0-1)"
            onChange={this.onChangeRating}
          />
        </Form.Group>
        <Dropdown
          placeholder="Filter..."
          fluid
          closeOnChange
          search
          selection
          multiple
          options={streamingOptions}
          onChange={this.onChangeTags}
        />
        <Form.TextArea
          name="content"
          label="Your Review"
          placeholder="Write your review here..."
          onChange={this.onChange}
        />
        <Form.Button onClick={this.onSubmit}>Upload</Form.Button>
      </Form>
    ) : (
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Button onClick={this.onSubmitPassword}>Enter</Form.Button>
      </Form>
    );
    return <div className="main-div">{isAuth}</div>;
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
