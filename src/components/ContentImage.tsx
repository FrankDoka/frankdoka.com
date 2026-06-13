import Image, { type ImageProps } from 'next/image'

// Thin wrapper around next/image for diagrams and content images. (Replaces the
// former framer-motion GrayscaleTransitionImage; the scroll-grayscale effect was
// dropped — it added a dependency and looked off on flat diagrams.)
export function ContentImage({
  alt = '',
  ...props
}: Pick<ImageProps, 'src' | 'quality' | 'className' | 'sizes' | 'priority' | 'style'> & { alt?: string }) {
  return <Image alt={alt} {...props} />
}
