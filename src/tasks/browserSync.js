import browserSyncModule from 'browser-sync';
const browserSyncInstance = browserSyncModule.create();

const browserSync = (options) => {
	return () => {
		browserSyncInstance.init({
			ui: { port: parseInt(process.env.BROWSER_SYNC_UI_PORT, 10) || 3000 },
			host: process.env.BROWSER_SYNC_HOST || 'localhost',
			port: parseInt(process.env.BROWSER_SYNC_PORT, 10) || 3002,
			proxy: process.env.BROWSER_SYNC_PROXY || 'http://localhost:3001/',
			open: false,
			...options,
		});
	};
};

export default browserSync;
