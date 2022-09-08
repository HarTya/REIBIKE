import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import NextNProgress from 'nextjs-progressbar';
import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/footer.scss';
import '../styles/UI.scss';
import '../styles/index.scss';
import '../styles/shop.scss';
import '../styles/admin.scss';
import '../styles/order.scss';
import '../styles/media-queries.scss';
import { wrapper } from 'src/store/store';

function MyApp({ Component, pageProps }): ReactElement<AppProps> {
  return (
    <>
      <NextNProgress
        color='#89CFF0'
        startPosition={0}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp);