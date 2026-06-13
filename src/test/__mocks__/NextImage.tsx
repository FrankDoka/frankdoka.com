import React from 'react'

type MockImageProps = {
  src: string | { src: string; width?: number; height?: number }
  alt?: string
  width?: number
  height?: number
  className?: string
  [key: string]: unknown
}

function NextImage({ src, alt, width, height, className, ...rest }: MockImageProps) {
  const srcStr = typeof src === 'object' && src !== null ? (src as { src: string }).src : String(src ?? '')
  // Strip props that don't belong on <img>
  const { unoptimized, priority, quality, fill, sizes, loader, blurDataURL, placeholder, onLoad, onError, ...htmlProps } = rest as Record<string, unknown>
  void unoptimized; void priority; void quality; void fill; void sizes; void loader; void blurDataURL; void placeholder; void onLoad; void onError
  return React.createElement('img', { src: srcStr, alt: alt ?? '', width, height, className, ...htmlProps })
}

export default NextImage
