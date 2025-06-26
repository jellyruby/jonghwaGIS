import Head from 'next/head';

import Layout from '@components/Layout';
// 새로 만든 페이지 컴포넌트들을 import 합니다.
import WorldMap from './WorldMap';
import MyLocationInfo  from './MyLocationInfo'

// useGeolocation 훅을 여기서 직접 사용합니다.
import useGeolocation from '@hooks/useGeolocation';


const DEFAULT_CENTER = [37.507132, 127.01]


export default function Home() {

    // 1. 상태(위치 정보)를 부모 컴포넌트에서 관리합니다.
    const { loading, error, data: locationData } = useGeolocation();

    // 2. 현재 위치가 있으면 사용하고, 없으면 기본 위치를 사용합니다.
    const mapCenter = locationData.latitude && locationData.longitude 
      ? [locationData.latitude, locationData.longitude] 
      : DEFAULT_CENTER;

  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
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