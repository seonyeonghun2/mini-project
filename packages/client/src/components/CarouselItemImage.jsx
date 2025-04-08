import React from 'react'

const CarouselItemImage = ({src, text}) => {
  return (
    <img src={src} alt={text} className="w-100 img-fluid" />
  )
}

export default CarouselItemImage