import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './Slider/slider';
import  './index.css'


const IMAGE_DATA =[
    {
    src: require('./images/6.jpg'),
    alt: 'images-1',
  },
  {
    src: require('./images/7.jpg'),
    alt: 'images-2',
  },
  {
    src: require('./images/8.jpg'),
    alt: 'images-3',
  },
  {
    src: require('./images/7.jpg'),
    alt: 'images-2',
  },
  {
    src: require('./images/6.jpg'),
    alt: 'images-1',
  },
]

ReactDOM.render(
  <Slider
    items={IMAGE_DATA}
    autoPlay={true}
    delay={2}
    pause={true}
    arrows={true}
    dots={true}
   />,
  document.getElementById('root')
);
