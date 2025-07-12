import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';
import styles from '@styles/Home.module.scss';
import { getWindowSize } from "@hooks/getWindowSize";


// 상수는 컴포넌트 밖이나 별도 파일로 관리하는 것이 좋습니다.


const WorldMap = ({ center, myLocation }) => {
  const hasMyLocation = myLocation.latitude && myLocation.longitude;

  const { height, width } = getWindowSize();
  
  return (
    <Section>
      <Container>
        <h1 className={styles.title}>
          GIS 날씨 추적기
        </h1>

        {/* props로 받은 center를 사용 */}
        <Map className={styles.homeMap} width={width} height={height} center={center} zoom={12}>
          {({ TileLayer, Marker, Popup }) => (
            <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
              {/* 내 위치 정보가 있으면 추가 마커를 표시 */}
              {hasMyLocation && (
                <Marker position={[myLocation.latitude, myLocation.longitude]}>
                  <Popup>
                    여기가 내 위치에요!
                  </Popup>
                </Marker>
              )}
            </>
          )}
        </Map>

        {/* 나머지 UI는 그대로 유지 */}
        <p className={styles.description}>
          <code className={styles.code}>https://github.com/jellyruby/jonghwaGIS</code>
        </p>
        <p className={styles.view}>
          <Button href="https://github.com/jellyruby/jonghwaGIS">View on GitHub</Button>
        </p>
      </Container>
    </Section>
  );
};

export default WorldMap;