import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getNote } from '../store/actions';
import NoteDetails from '../components/NoteDetails';
import DeleteModel from '../components/DeleteModel';

const NoteNavItems = {
  edit: 'edit',
  delete: 'remove'
};

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivPageWrapper = styled.div`
  width: 85%;
  margin-left: 250px;
`;

const H2LoadingMessage = styled.h2`
  margin: 85px 0 0 0;
`;

const DivNotePageDisplay = styled.div`
  opacity: ${props => (props.showdeletemodel ? 0.4 : 1)};
`;

const HeaderNote = styled.header`
  display: flex;
  justify-content: flex-end;
`;

const NavNoteLinks = styled.nav`
  margin: 20px;
`;

const ButtonLink = styled.button`
  border: none;
  background-color: inherit;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  text-decoration: none;
  color: black;
  user-select: none;
  outline: none;

  &:not(:first-child) {
    margin-left: 40px;
  }

  &:hover {
    text-decoration: ${props => !props.showdeletemodel && 'underline'};
    cursor: ${props => !props.showdeletemodel && 'pointer'};

    /* Edit Note Button */
    color: ${props =>
      props.notenavitem === NoteNavItems.edit &&
      !props.showdeletemodel &&
      'rgb(43, 193, 196)'};

    /* Delete Note Button */
    color: ${props =>
      props.notenavitem === NoteNavItems.delete &&
      !props.showdeletemodel &&
      'red'};
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class NoteView extends Component {
  constructor(props) {
    super(props);
    this.state = { showDeleteModel: false };
  }
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }

  showDeleteModel = e => {
    e.preventDefault();
    this.setState({ showDeleteModel: true });
  };

  hideDeleteModel = e => {
    e.preventDefault();
    this.setState({ showDeleteModel: false });
  };

  render() {
    return (
      <DivPageWrapper>
        {this.props.fetchingNote ? (
          <H2LoadingMessage>Loading Note...</H2LoadingMessage>
        ) : (
          <div>
            <DeleteModel
              {...this.props}
              hideDeleteModel={this.hideDeleteModel}
              visible={this.state.showDeleteModel}
            />
            <DivNotePageDisplay showdeletemodel={this.state.showDeleteModel}>
              <HeaderNote>
                <NavNoteLinks>
                  <ButtonLink
                    notenavitem={NoteNavItems.edit}
                    showdeletemodel={this.state.showDeleteModel}
                  >
                    {NoteNavItems.edit}
                  </ButtonLink>
                  <ButtonLink
                    notenavitem={NoteNavItems.delete}
                    showdeletemodel={this.state.showDeleteModel}
                    onClick={e => this.showDeleteModel(e)}
                  >
                    {NoteNavItems.delete}
                  </ButtonLink>
                </NavNoteLinks>
              </HeaderNote>
              <NoteDetails
                {...this.props}
                showDeleteModel={this.state.showDeleteModel}
              />
            </DivNotePageDisplay>
          </div>
        )}
      </DivPageWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    note: state.note,
    fetchingNote: state.fetchingNote,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getNote }
)(NoteView);
