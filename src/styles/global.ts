import { createGlobalStyle } from 'styled-components';

export const MOBILE_PX = 868;
export const MOBILE_BREAKPOINT = `${MOBILE_PX}px`;

export const COLOURS = {
  hover: '#CDCDCD',
  clicked: '#BFBFBF',
};

export enum ZIndexes {
  menu = 1,
  modalBackground = 2,
  modal = 3,
}

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 16px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    html, body {
      font-size: 18px;
    }
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;
