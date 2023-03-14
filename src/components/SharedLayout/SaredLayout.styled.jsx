import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const NavigateLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    text-decoration: underline;
    font-weight: bold;
  }
`;
