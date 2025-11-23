import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

export const woo = new WooCommerceRestApi({
  url: 'https://greenrelife.io.vn',
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!, // trong .env
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!, // trong .env
  version: 'wc/v3',
});
