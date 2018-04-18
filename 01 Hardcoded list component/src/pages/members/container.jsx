import * as React from 'react';
import PropTypes from 'prop-types';

import { MemberListPage } from './page';

export class MemberListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      memberList: [],
    };
    this.fetchMembers = this.fetchMembers.bind(this);
  }

  fetchMembers() {
    setTimeout(() => {
      this.setState({
        memberList: [
          {
            id: 1,
            name: 'John',
            avatarUrl: 'https://avatars1.githubusercontent.com/u/1457912?v=4',
          },
          {
            id: 2,
            name: 'Martin',
            avatarUrl: 'https://avatars2.githubusercontent.com/u/4374977?v=4',
          },
        ]
      });
    }, 500);
  };

  render() {
    return (
      <MemberListPage
        memberList={this.state.memberList}
        fetchMemberList={this.fetchMembers}
      />
    );
  }
}

MemberListContainer.propTypes = {
    memberEntity: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
    })
};