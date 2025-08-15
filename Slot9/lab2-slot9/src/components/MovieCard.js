import { Card, Button, Badge, Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function MovieCard({ movie, onView, onFav, isFaved }) {
  const { poster, title, description, genre, year, country, duration } = movie;
  return (
    <Card className="movie-card h-100">
      {poster && (
        <Card.Img variant="top" src={poster} alt={`${title} poster`} />
      )}
      <Card.Body className="d-flex flex-column">
        <Stack direction="horizontal" gap={2} className="mb-2">
          <Badge bg="success">{genre}</Badge>
          <small className="text-muted ms-auto">{year} · {country} · {duration}m</small>
        </Stack>
        <Card.Title className="h6">{title}</Card.Title>
        <Card.Text className="text-muted" style={{ flex: 1 }}>
          {description.length > 100 ? description.slice(0, 97) + '…' : description}
        </Card.Text>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" size="sm" onClick={onView}>Details</Button>
          <Button
            variant={isFaved ? 'outline-success' : 'success'}
            size="sm"
            onClick={onFav}
          >
            {isFaved ? 'Added' : 'Add to Favourites'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  onFav: PropTypes.func.isRequired,
  isFaved: PropTypes.bool.isRequired
};
