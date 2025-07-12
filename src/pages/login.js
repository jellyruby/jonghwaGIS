import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';

const LoginPage = () => {
  return (
    <Layout center>
      <LoginForm />
    </Layout>
  );
};


export async function getServerSideProps(context) {
  const { req } = context;
  const { cookie } = req.headers;

  // 쿠키가 없는 경우 종료
  if (!cookie) {
    return {
      props: {
      },
    };
  }

  try {
    const response = await fetch('http://localhost:8888/auth/profile', {
      headers: {
        cookie,
      },
    });

    // 인증 성공 시 로그인 페이지로 리디렉션
    if (response.ok) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const user = await response.json();

    // 인증 성공 시 user 정보를 props로 전달
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error('Failed to fetch auth profile:', error);
  }
}


export default LoginPage;
