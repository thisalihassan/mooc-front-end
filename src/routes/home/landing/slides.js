import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import "../landing.css";

const items = [
  {
    src: 'https://res.cloudinary.com/mooc/image/upload/v1592238505/assests/1_konx8h.png',
    altText: 'Slide 1',
    
    key: '1'
  },
  {
    src: "https://res.cloudinary.com/mooc/image/upload/v1592238505/assests/4_i2zz5j.png",
    altText: 'Slide 2',
    
    key: '2'
  },
  {
    src: 'https://res.cloudinary.com/mooc/image/upload/v1592238508/assests/2_zgzdab.png',
    altText: 'Slide 3',
    
    key: '3'
  },
  {
    src: "https://res.cloudinary.com/mooc/image/upload/v1592238508/assests/3_rnk4d3.png",
    altText: 'Slide 4',
    
    key: '4'
  },
  {
    src: "https://res.cloudinary.com/mooc/image/upload/v1592238504/assests/5_ezysxw.png",
    altText: 'Slide 5',
   
    key: '5'
  }
];

const Slides = () => <UncontrolledCarousel id="slide" items={items} />;

export default Slides;