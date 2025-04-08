import { Container, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import CarouselItemImage from './CarouselItemImage';
function HomeCarousel() {
  return (
    <Container className='my-3 px-0' fluid>
      <Carousel fade>
        <Carousel.Item>
          <CarouselItemImage src="https://picsum.photos/id/1000/1920/400" text="picsum" />
          <Carousel.Caption>
            <h3>Nexcent</h3>
            <p>ERP 전문가 그룹이 아름다운 세상을 만들어갑니다!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <CarouselItemImage src="https://picsum.photos/id/1001/1920/400" text="picsum" />
          <Carousel.Caption>
            <h3>Nex ERP</h3>
            <p>Nex ERP 새로운 버전이 출시되었습니다!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <CarouselItemImage src="https://picsum.photos/id/1002/1920/400" text="picsum" />
          <Carousel.Caption>
            <h3>Nex CRM</h3>
            <p>
              새로운 CRM 도입으로 당신의 기업가치를 향상시키세요!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default HomeCarousel;