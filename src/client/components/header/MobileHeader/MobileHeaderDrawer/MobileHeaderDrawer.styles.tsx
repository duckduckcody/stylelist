import styled from 'styled-components';
import { LogoText } from '../MobileHeader.styles';

export const Container = styled.div`
  padding: 12px 0 0 0;
  display: flex;
  flex-flow: column nowrap;
`;

export const StyledLogoText = styled(LogoText)`
  text-align: center;
  width: 100%;
  margin: 0 0 5px 0;
`;

export const LinkText = styled.a<{ selected?: boolean }>`
  width: 100%;
  padding: 15px 10px;
  margin: 5px 0;
  color: inherit;
  text-decoration: none;
  border-bottom: ${(p) =>
    p.selected ? `3px solid ${p.theme.highlight}` : 'none'};
  background-color: ${(p) =>
    p.selected ? p.theme.secondaryHeaderBackgroundColor : 'transparent'};

  &:active {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
