import React, { useState } from 'react'

// A high-quality football placeholder image
const FOOTBALL_PLACEHOLDER = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=500&h=500&fit=crop";

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  // If the source is missing or empty, treat it as an error immediately
  const imageSrc = (!src || didError) ? FOOTBALL_PLACEHOLDER : src;

  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError} 
    />
  )
}
