import './map-details.module.scss';

export interface MapDetailsProps {
  id: string;
}

export function MapDetails({ id }: MapDetailsProps) {
  return (
    <div className="mapDetails">
      <h1>Welcome ddd</h1>

      <a href={'beatsaver://' + id}>
        <button>Install</button>
      </a>
    </div>
  );
}

export default MapDetails;
