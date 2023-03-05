import React from 'react'

export function ImageGalleryItem({ webformatURL, largeImageURL}) {
  return (
    <li className="gallery-item">
    <img src={webformatURL} alt="" />
    </li>
  )
}
