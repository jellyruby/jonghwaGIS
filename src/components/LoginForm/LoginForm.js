import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/Button';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const response = await fetch('http://localhost:8888/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, password }),
        credentials: 'include', // 쿠키를 주고받기 위해 추가
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        router.push('/');
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <p className={styles.head}>로그인</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            id="userid"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
};

export default LoginForm;
