import type { MarkerItem } from '../_components/mapbox-map';
import MapboxMap from '../_components/mapbox-map';

async function fetchMarkers() {
  const res = await fetch(
    `https://greenrelife.dxmd.vn/wp-json/wc/v3/products`,
    {
      headers: {
        Authorization:
              `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
      },
      cache: 'no-store',
    },
  );

  const products = await res.json();

  return products
    .map((p: any) => {
      const locationUrl = p.meta_data?.find((m: any) => m.key === '_product_location')?.value;

      if (!locationUrl) {
        return null;
      }

      // Parse lat/lng từ URL (ví dụ ?q=lat,lng)
      const match = locationUrl.match(/([-\d.]+),([-\d.]+)/);

      if (!match) {
        return null;
      }

      const lat = Number(match[1]);
      const lng = Number(match[2]);
      return {
        id: p.id,
        lng: Number(lng),
        lat: Number(lat),
        title: p.name,
        description: p.short_description?.replace(/<[^>]+>/g, '') ?? '',
        iconUrl: p.images?.[0]?.src ?? undefined,
      };
    })
    .filter(Boolean);
}

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '<YOUR_MAPBOX_TOKEN>';

export default async function Index() {
  const markers: MarkerItem[] = await fetchMarkers();

  return (
    <MapboxMap
      accessToken={token}
      center={[106.69, 10.77]}
      zoom={12}
      markers={markers}
      height="h-screen"
      className="h-screen w-screen"
      defaultIconUrl="/assets/images/placeholder.png"
    />
  );
}
