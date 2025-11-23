import { useCallback, useEffect, useState } from 'react';

export function useOrders(customerId: number) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/wp-json/wc/v3/orders?customer=${customerId}`,
      {
        headers: {
          Authorization: `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
        },
      },
    );
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }, [customerId]);

  useEffect(() => {
    if (customerId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchOrders();
    }
  }, [customerId, fetchOrders]);

  return { orders, loading, refresh: fetchOrders };
}
