import Image, { type ImageProps } from 'next/image'

// Thin wrapper around next/image for diagrams and content images, rendered
// full-width and uncropped.
export function ContentImage({
  alt = '',
  ...props
}: Pick<ImageProps, 'src' | 'quality' | 'className' | 'sizes' | 'priority' | 'style'> & { alt?: string }) {
  return <Image alt={alt} {...props} />
}
