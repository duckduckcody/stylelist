import NextHead from 'next/head';
import { FC, useEffect, useState } from 'react';

interface HeadProps {
  title: string;
}

export const Head: FC<HeadProps> = ({ title }) => {
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development');
  }, []);

  return (
    <NextHead>
      <title>
        {isDev ? 'Dev | ' : ''}
        {title} | Australia&apos;s fashion in one place
      </title>

      <meta
        name='description'
        content='Shop and discover Australia’s most stylish brands. With more than 10,000 products in one place, Stylelist is the definitive fashion destination.'
      ></meta>
    </NextHead>
  );
};
