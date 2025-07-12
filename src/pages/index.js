import Head from 'next/head';

import Layout from '@components/Layout';
// 새로 만든 페이지 컴포넌트들을 import 합니다.
import WorldMap from '@components/WorldMap';
import MyLocationInfo from '@components/MyLocationInfo';

// useGeolocation 훅을 여기서 직접 사용합니다.
import useGeolocation from '@hooks/useGeolocation';


const DEFAULT_CENTER = [37.507132, 127.01]


export default function Home({ user }) {

    // 1. 상태(위치 정보)를 부모 컴포넌트에서 관리합니다.
    const { loading, error, data: locationData } = useGeolocation();

    // 2. 현재 위치가 있으면 사용하고, 없으면 기본 위치를 사용합니다.
    const mapCenter = locationData.latitude && locationData.longitude 
      ? [locationData.latitude, locationData.longitude] 
      : DEFAULT_CENTER;

  return (
    <Layout>
      <Head>
        <title>GIS Tracer</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 지도 섹션 컴포넌트 */}
      <WorldMap center={mapCenter} myLocation={locationData} />

      {/* 위치 정보 섹션 컴포넌트 */}
      <MyLocationInfo loading={loading} error={error} locationData={locationData} />
      
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { cookie } = req.headers;

  // 쿠키가 없는 경우 로그인 페이지로 리디렉션
  if (!cookie) {
    
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch('http://localhost:8888/auth/profile', {
      headers: {
        cookie,
      },
    });

    // 인증 실패 시 로그인 페이지로 리디렉션
    if (!response.ok) {
      return {
        redirect: {
          destination: '/login',
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
    // 백엔드 서버와 통신 불가 등 에러 발생 시 로그인 페이지로 리디렉션
    console.error('Failed to fetch auth profile:', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
