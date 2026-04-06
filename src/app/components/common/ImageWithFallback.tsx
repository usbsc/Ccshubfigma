import React, { useState } from "react";
import { IMAGE_FALLBACKS } from "../../constants";

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    setErrorCount((prev) => prev + 1);
  };

  const { src, alt, style, className, ...rest } = props;

  let finalSrc = src;
  if (!src || errorCount === 1) {
    finalSrc = IMAGE_FALLBACKS.PRIMARY_PLACEHOLDER;
  } else if (errorCount >= 2) {
    finalSrc = IMAGE_FALLBACKS.ABSOLUTE_FALLBACK;
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}
