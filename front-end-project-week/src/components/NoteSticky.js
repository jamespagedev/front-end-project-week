import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/***************************************************************************************************
 ********************************************* Variables *******************************************
 **************************************************************************************************/
const maxTitleLimit = 20;
const maxTextBodyLimit = 180;

/***************************************************************************************************
 ********************************************** Methods ********************************************
 **************************************************************************************************/
const shortenText = (text, limitCharsDisplayed) => {
  let modifiedText = text;
  if (modifiedText.length > limitCharsDisplayed) {
    modifiedText = modifiedText.slice(0, limitCharsDisplayed);
    if (modifiedText.indexOf(' ') >= 0) {
      modifiedText = modifiedText.slice(0, modifiedText.lastIndexOf(' '));
      modifiedText = modifiedText.trim() + ' ';
    }
  }
  return modifiedText;
};

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const LinkNoteSticky = styled(Link)`
  color: black;
  text-decoration: none;
`;

const DivNoteSticky = styled.div`
  width: 300px;
  height: 200px;
  margin: 10px;
  background-color: white;
  padding: 0 20px;
  border: 1px solid rgb(151, 151, 151);
  text-shadow: none;

  &:hover {
    background-color: rgb(43, 193, 196);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
    color: white;
  }
`;
const H3NoteTitle = styled.h3`
  border-bottom: 1px solid rgb(151, 151, 151);
  padding-bottom: 10px;
  margin: 10px 0;
`;
const NoteText = styled.p`
  margin: 10px 0;
`;
const SpanEllipsis = styled.span`
  color: gray;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const NoteSticky = props => {
  return (
    <LinkNoteSticky to={props.noteDetailsLink}>
      <DivNoteSticky>
        <H3NoteTitle>
          {shortenText(props.title, maxTitleLimit)}{' '}
          {props.title.length > maxTitleLimit && (
            <SpanEllipsis>. . .</SpanEllipsis>
          )}
        </H3NoteTitle>
        <NoteText>
          {shortenText(props.textBody, maxTextBodyLimit)}{' '}
          {props.textBody.length > maxTextBodyLimit && (
            <SpanEllipsis>. . .</SpanEllipsis>
          )}
        </NoteText>
      </DivNoteSticky>
    </LinkNoteSticky>
  );
};

// NoteSticky.defaultProps = {
//   name: '',
// };

export default NoteSticky;
