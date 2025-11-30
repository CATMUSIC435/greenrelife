export function convertForWoo(items: Array<{
  id: number;
  quantity: number;
}>) {
  return items.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
  }));
}
