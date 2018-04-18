import * as React from 'react';
import PropTypes from 'prop-types';

import { MemberRow } from './memberRow';

export const MemberTable = props => (
  <table className="table">
    <thead>
      <tr>
        <th>Picture</th>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {
        props.memberList.map(
          (member) => <MemberRow
            key={member.id}
            member={member}
          />
        )
      }
    </tbody>
  </table>
);

MemberTable.PropTypes = {
  memberList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};