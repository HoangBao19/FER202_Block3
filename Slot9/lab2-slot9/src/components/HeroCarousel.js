import { Carousel, Ratio } from 'react-bootstrap';

const slides = [
  { img: '/images/movie3.jpg', title: 'Explore Movies', sub: 'Browse top picks and trending films' },
  { img: '/images/movie6.jpg', title: 'Weekly Updates', sub: 'Fresh recommendations every week' },
  { img: '/images/movie1.jpg', title: 'Find Your Genre', sub: 'Search, filter, and enjoy' }
];

export default function HeroCarousel() {
  return (
    <Carousel>
      {slides.map((s, i) => (
        <Carousel.Item key={i}>
          <Ratio aspectRatio="21x9">
            <img src={s.img} alt={s.title} style={{ objectFit: 'cover', width: '100%' }} />
          </Ratio>
          <Carousel.Caption>
            <h5>{s.title}</h5>
            <p>{s.sub}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
