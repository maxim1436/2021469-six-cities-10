import { ReviewType } from '../types/types';


export const reviews: ReviewType[] = [
  {
    avatar: 'img/avatar-max.jpg',
    userName: 'Alex',
    reviewsRating: +(Math.random() * 5).toFixed(1),
    date: 'April 2019',
    textReview: 'Great!'
  }, {
    avatar: 'img/avatar-max.jpg',
    userName: 'Sergey',
    reviewsRating: +(Math.random() * 5).toFixed(1),
    date: 'May 2020',
    textReview: 'Nice room!'
  }, {
    avatar: 'img/avatar-max.jpg',
    userName: 'Max',
    reviewsRating: +(Math.random() * 5).toFixed(1),
    date: 'September 2021',
    textReview: 'Cozy little armchairs!'
  }, {
    avatar: 'img/avatar-max.jpg',
    userName: 'Nicolay',
    reviewsRating: +(Math.random() * 5).toFixed(1),
    date: 'October 2022',
    textReview: 'Nice hotel!'
  },
];
