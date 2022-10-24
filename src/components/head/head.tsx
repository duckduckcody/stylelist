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
        {isDev && 'Dev | '}
        {title}
      </title>
    </NextHead>
  );
};
