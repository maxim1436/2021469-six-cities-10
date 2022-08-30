import { OfferType } from '../types/types';

export const offers: OfferType[] = [
  {
    photos: ['img/room.jpg'],
    isPremium: true,
    price: 15000,
    title: 'Beautiful & luxurious room at great location',
    typeOfPlace: 'room',
    isFavorite: true,
    rating: +(Math.random() * 5).toFixed(1),
    id: (Math.random() * 10000).toFixed(),
    lat: 52.3909553943508,
    lng: 4.85309666406198,
    city: 'Paris',
  }, {
    photos: ['img/room.jpg'],
    isPremium: false,
    price: 11000,
    title: 'Beautiful & luxurious hotel at great location',
    typeOfPlace: 'hotel',
    isFavorite: true,
    rating: +(Math.random() * 5).toFixed(1),
    id: (Math.random() * 10000).toFixed(),
    lat: 52.369553943508,
    lng: 4.85309666406198,
    city: 'Amsterdam',
  }, {
    photos: ['img/room.jpg'],
    isPremium: false,
    price: 50000,
    title: 'Beautiful & luxurious house at great location',
    typeOfPlace: 'house',
    isFavorite: false,
    rating: +(Math.random() * 5).toFixed(1),
    id: (Math.random() * 10000).toFixed(),
    lat: 52.3909553943508,
    lng: 4.929309666406198,
    city: 'Paris',
  }, {
    photos: ['img/room.jpg'],
    isPremium: true,
    price: 5000,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfPlace: 'apartment',
    isFavorite: false,
    rating: +(Math.random() * 5).toFixed(1),
    id: (Math.random() * 10000).toFixed(),
    lat: 52.3809553943508,
    lng: 4.939309666406198,
    city: 'Amsterdam',
  },
];
