import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('http://localhost:8888/auth/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };
    checkStatus();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8888/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);

      router.push('/login');
    }
  };

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            GIS 기반 날씨 추적기
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          {isLoggedIn && (
            <li>
              <Link href="#" onClick={logout} >
                Logout
              </Link>
            </li>
          )}
          <li>
            <a href="https://github.com/jellyruby/jonghwaGIS" rel="noreferrer">
              <FaGithub />
            </a>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
