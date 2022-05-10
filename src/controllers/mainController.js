const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visitedProducts = products.filter( element => {return element.category === 'visited'} )
		let inSaleProducts = products.filter( element => {return element.category === 'in-sale'} )
		res.render('index', {
			visitedProducts: visitedProducts,
			inSaleProducts: inSaleProducts,
		})
	},
	search: (req, res) => {
		let searchResults = products.filter (element => {
			return element.name.toLowerCase().includes(req.query.keywords.toLowerCase()) === true
		})
		res.render('results', {
			results: searchResults,
			userSearch: req.query.keywords
		})
	},
};

module.exports = controller;
