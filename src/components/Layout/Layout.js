import Head from 'next/head';

import Header from '@components/Header';
import Footer from '@components/Footer';

import styles from './Layout.module.scss';

const Layout = ({ children, className, center, ...rest }) => {
  const mainClassName = center ? styles.mainCenter : styles.main;

  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
