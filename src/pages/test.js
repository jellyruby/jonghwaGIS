import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';
import useGeolocation from '@hooks/useGeolocation';


import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [37.507132, 127.01]



export default function Home() {
  
  const { loading, error, data: { latitude, longitude } } = useGeolocation();

  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>
            Next.js Leaflet Starter
          </h1>

          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            )}
          </Map>

          <p className={styles.description}>
            <code className={styles.code}>npx create-next-app -e https://github.com/colbyfayock/next-leaflet-starter</code>
          </p>

          <p className={styles.view}>
            <Button href="https://github.com/colbyfayock/next-leaflet-starter">Vew on GitHub</Button>
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div>
            <h1>내 위치 정보</h1>
            {loading && <p>위치 정보를 불러오는 중...</p>}
            {error && (
              <p>
                에러: {error.message} (코드: {error.code})
                <br />
                <small>위치 정보 접근 권한을 허용했는지 확인해주세요.</small>
              </p>
            )}
            {!loading && !error && (
              <p>
                위도: {latitude}
                <br />
                경도: {longitude}
              </p>
            )}
          </div>
        </Container>
      </Section>  

    </Layout>
  )
}
