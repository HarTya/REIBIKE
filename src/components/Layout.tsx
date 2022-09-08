import Head from 'next/head';
import React, { ReactElement } from 'react';
import Footer from './Footer';
import Header from './Header';

function Layout({ children, title }): ReactElement {
    const headTitle = `${title} | REIBIKE`;

    return (
        <>
            <Head>
                <title>{headTitle}</title>
            </Head>
            <div className='wrapper'>
                <Header />
                <main className='main'>{children}</main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;