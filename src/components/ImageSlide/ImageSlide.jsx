import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const ImageSlide = ({ image }) => {
  return (
    <SliderBox
      images={image}
      //   onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
      dotColor="#FFEE58"
      inactiveDotColor="#90A4AE"
      paginationBoxVerticalPadding={20}
      ImageComponentStyle={{
        borderRadius: 6,
        width: "97%",
        marginTop: 15,
        marginLeft: -15,
      }}
      autoplay
      circleLoop
    />
  );
};

export default ImageSlide;
