module.exports = ({ env }) => ({
	plugins: [
		require('postcss-import'),
		require('tailwindcss'),
		require('postcss-nested'),
		require('autoprefixer'),
		env === 'production'
			? require('@fullhuman/postcss-purgecss')({
					content: ['./src/**/*.html', './src/**/*.js'],
					defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
			  })
			: false,
		env === 'production' ? require('cssnano')() : false,
	],
	inject: false,
	minimize: false,
	sourceMap: true,
});
