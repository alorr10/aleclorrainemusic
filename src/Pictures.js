import React from 'react';
import Slider from 'react-slick';
import One from './images/One.png';
import Two from './images/Two.jpeg';
import Three from './images/Three.png';
import Four from './images/Four.png';
class Pictures extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={One} />
        </div>
        <div>
          <img src={Two} />
        </div>
        <div>
          <img src={Three} />
        </div>
        <div>
          <img src={Four} />
        </div>
      </Slider>
    );
  }
}
export default Pictures;
