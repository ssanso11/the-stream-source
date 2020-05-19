import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import axios from 'axios';
import moment from 'moment';

const commentMap = ({image, username, content, timestamp, id}) => (
    <Comment >
      <Comment.Avatar src={image} />
      <Comment.Content>
        <Comment.Author as='a'>{username}</Comment.Author>
        <Comment.Metadata>
          <div>{`${moment(timestamp).fromNow()}`}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
);


export default ({comments}) => (
    <div>
        {comments.map(commentMap)}
    </div>
    
)

