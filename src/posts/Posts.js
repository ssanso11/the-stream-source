import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import netflix from "../images/netflix-logo-dark.png";
import hulu from "../images/hulu-logo-dark.jpg";
import prime from "../images/prime-logo-dark.png";
import moment from "moment";

const tagMap = (tag) => {
  switch (tag.toLowerCase()) {
    case "netflix":
      return (
        <img
          width={50}
          height={25}
          style={{ borderRadius: 12 }}
          src={netflix}
        />
      );
    case "hulu":
      return (
        <img width={50} height={25} style={{ borderRadius: 12 }} src={hulu} />
      );
    case "prime":
      return (
        <img width={50} height={25} style={{ borderRadius: 12 }} src={prime} />
      );
    default:
      return <p>No tags</p>;
  }
};

const postsMap = ({
  title,
  rating,
  subtitle,
  author,
  image,
  content,
  timestamp,
  tags,
  _id,
}) => {
  return (
    <Card
      fluid
      style={{
        fontFamily: "goudy-old-style",
        width: "100vh",
        padding: "10px",
        margin: "0 auto",
        paddingBottom: "10px",
      }}
      key={_id}
    >
      <Link
        to={{
          pathname: `/reviews/${title
            .replace(/\s+/g, "-")
            .replace("(", "")
            .replace(")", "")
            .replace("/", "-")
            .replace(".", "")
            .replace("!", "")
            .toLowerCase()}-review`,
          state: {
            id: _id,
          },
        }}
      >
        <Card.Content style={{ textAlign: "center" }}>
          <Card.Header style={{ fontSize: 27 }}>{title}</Card.Header>
          <Card.Meta style={{ fontSize: 20, paddingBottom: 80 }}>{`${moment(
            timestamp
          ).format("ll")} by ${author}`}</Card.Meta>
          <img
            style={{ paddingBottom: 8, width: "55%", objectFit: "cover" }}
            src={image}
            height={300}
          />
          <Card.Description style={{ fontSize: 17 }}>
            {subtitle}
          </Card.Description>
          {tags.map(tagMap)}
        </Card.Content>
      </Link>
    </Card>
  );
};

export default ({ posts }) => (
  <div>
    <Card.Group style={{ paddingLeft: 50, paddingRight: 50 }}>
      {posts.reverse().map(postsMap)}
    </Card.Group>
  </div>
);
