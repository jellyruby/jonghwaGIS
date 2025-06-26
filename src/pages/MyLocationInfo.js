import Section from '@components/Section';
import Container from '@components/Container';


// props로 loading, error, locationData를 받습니다.
const MyLocationInfo = ({ loading, error, locationData }) => {
  const { latitude, longitude } = locationData;

  return (
    <Section>
      <Container>
        <h2>내 위치 정보</h2>
        {loading && <p>위치 정보를 불러오는 중...</p>}
        {error && (
          <p>
            에러: {error.message} (코드: {error.code})
            <br />
            <small>위치 정보 접근 권한을 허용했는지 확인해주세요.</small>
          </p>
        )}
        {!loading && !error && latitude && (
          <p>
            위도: {latitude}
            <br />
            경도: {longitude}
          </p>
        )}
      </Container>
    </Section>
  );
};

export default MyLocationInfo;