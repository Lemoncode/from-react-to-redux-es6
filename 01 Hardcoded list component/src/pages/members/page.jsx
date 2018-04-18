import * as React from 'react';
import PropTypes from 'prop-types';

import { MemberTable } from './components/memberTable';

export class MemberListPage extends React.Component {

  componentDidMount() {
    this.props.fetchMemberList();
  }

  render() {
    return (
      <MemberTable
        memberList={this.props.memberList} />
    );
  }
}

MemberListPage.PropTypes = {
  memberList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchMemberList: PropTypes.func.isRequired,
};