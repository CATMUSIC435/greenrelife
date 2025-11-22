import type { MarkerItem } from '../_components/mapbox-map';
import MapboxMap from '../_components/mapbox-map';

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '<YOUR_MAPBOX_TOKEN>';
const SAMPLE_MARKERS: MarkerItem[] = [
  { id: 1, lng: 106.7002, lat: 10.7626, title: 'Ho Chi Minh', description: 'Center of city' },
  { id: 2, lng: 106.6870, lat: 10.7800, title: 'Office', description: 'Our office' },
];

export default function Index() {
  return (
    <MapboxMap
      accessToken={token}
      center={[106.69, 10.77]}
      zoom={12}
      markers={SAMPLE_MARKERS}
      height="h-screen"
      className="h-screen w-screen"
      defaultIconUrl="/assets/images/placeholder.png"
    />
  );
}
