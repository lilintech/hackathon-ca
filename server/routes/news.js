const NewsApi = require('newsapi');
const dotenv = require('dotenv')
dotenv.config();
const apikey = new NewsApi(process.env.NEWS_API_KEY);

