
import path from 'path';

const config = {
    server: {
        port: process.env.PORT || 3000,
        host: 'localhost'
    },

    client: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    dist: path.resolve(__dirname, '../dist'),
    node_modules: path.resolve(__dirname, '../node_modules')
};

export default config;
