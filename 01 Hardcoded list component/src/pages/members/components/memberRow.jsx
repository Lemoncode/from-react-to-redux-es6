import * as React from 'react';

export const MemberRow = props => (
  <tr>
    <td><img src={props.member.avatarUrl} style={{ width: '200px' }} /></td>
    <td>{props.member.id}</td>
    <td>{props.member.name}</td>
  </tr>
);