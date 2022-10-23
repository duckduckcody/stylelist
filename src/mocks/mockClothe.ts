import { Clothe } from '../types/Clothe';

export const mockClothe: () => Clothe = () => ({
  name: 'Snoh White Knit Tank',
  price: 100,
  oldPrice: 120,
  link: 'https://google.com',
  brand: 'duck clothes',
  website: 'duckduckcody.com',
  images: [
    'https://cdn.shopify.com/s/files/1/1023/3455/products/02039079-YB012_womens_0010.jpg?v=1649374922',
    'https://cdn.shopify.com/s/files/1/1023/3455/products/02039079-YB012_womens_0020.jpg?v=1649374923',
    'https://cdn.shopify.com/s/files/1/1023/3455/products/02039079-YB012_womens_0030.jpg?v=1649374926',
    'https://cdn.shopify.com/s/files/1/1023/3455/products/02039079-YB012_womens_0040.jpg?v=1649374926',
    'https://cdn.shopify.com/s/files/1/1023/3455/products/02039079-YB012_womens_0050.jpg?v=1649374926',
    'https://cdn.shopify.com/s/files/1/1023/3455/products/02039079-YB012_womens_0060.jpg?v=1649374926',
    'https://cdn.shopify.com/s/files/1/1023/3455/products/02039079-YB012_womens_0070.jpg?v=1649374926',
  ],
  details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed quam porttitor, aliquam ipsum at, porta nisi. Pellentesque facilisis, diam non consequat placerat, nulla quam posuere odio, ornare accumsan ante sem id lectus. Morbi a pretium diam, sed rutrum orci. Vestibulum mollis mauris orci, at dignissim erat hendrerit ac. Duis ac tellus in velit auctor consequat in nec dolor. Quisque posuere, nulla at elementum lacinia, risus quam fermentum nisl, eget molestie ligula felis et nulla. Morbi rhoncus varius condimentum. Vivamus nec dui mollis, sagittis diam et, rhoncus arcu. Fusce id elit sed urna ultricies luctus. Cras volutpat turpis quis porta dictum. Cras est sapien, pharetra vel tellus at, sagittis dictum purus. Etiam eu sodales justo, eget auctor ipsum. Duis vitae porta tellus, in venenatis enim. Curabitur laoreet mauris ac est pretium imperdiet. Donec non tellus odio. Maecenas sollicitudin tempor dolor, non posuere sapien pulvinar posuere.`,
});
