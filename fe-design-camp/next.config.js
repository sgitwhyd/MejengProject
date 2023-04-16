/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	nextConfig,
	images: {
		domains: ['loremflickr.com', 'localhost'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
				port: '',
				pathname: '/api/**',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/seed/**',
			},
		],
	},
};
