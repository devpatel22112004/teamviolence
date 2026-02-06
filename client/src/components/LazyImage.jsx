import { memo } from 'react'

const LazyImage = memo(({
	src,
	alt,
	className = '',
	width,
	height,
	loading = 'lazy',
	decoding = 'async',
	fetchpriority = 'auto',
	onError,
	style
}) => (
	<img
		src={src}
		alt={alt}
		className={className}
		width={width}
		height={height}
		loading={loading}
		decoding={decoding}
		fetchpriority={fetchpriority}
		onError={onError}
		style={style}
	/>
))

LazyImage.displayName = 'LazyImage'

export default LazyImage
