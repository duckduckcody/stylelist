import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { GlobalStyles } from '../src/styles/global';

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-left: auto;
  margin-right: auto;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageContainer>
      <GlobalStyles />

      <Component {...pageProps} />
    </PageContainer>
  );
}

export default MyApp;
