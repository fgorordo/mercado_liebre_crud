const res = require('express/lib/response');
const fs = require('fs');
const { parse } = require('path');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products: products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find (element => {return element.id === parseInt(req.params.id)})
		let totalDiscount = product.discount / 100
		let finalDiscount = product.price * totalDiscount
		let finalPrice = product.price - finalDiscount
		res.render('detail', {
			product:product,
			finalPrice: finalPrice
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: products[products.length-1].id + 1,
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		}
		products.push(newProduct)
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null,'\t'));
		res.redirect('/products/details/'+ newProduct.id)
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productToEdit = products.find(element => {return element.id === parseInt(req.params.id)})
		res.render('product-edit-form', {
			product: productToEdit
		})
	},
	// Update - Method to update
	update: (req, res) => {
		products.forEach (element => {
			if(element.id === parseInt(req.params.id)) {
				element.name = req.body.name == "" ? element.name : req.body.name;
				element.price = req.body.price == "" ? element.price : parseInt(req.body.price);
				element.discount = req.body.discount == "" ? element.discount : parseInt(req.body.discount);
				element.description = req.body.description == ""? element.description: req.body.description;
				element.image = req.file.filename == ""? element.image: req.file.filename;
			};
		})
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, '\t'));
		res.redirect('/products/details/'+ req.params.id)
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsUpdate = products.filter(element => {
			return element.id != req.params.id
		})
		products = productsUpdate
		fs.writeFileSync(productsFilePath,JSON.stringify(productsUpdate, null, '\t'));
		res.redirect('/products');
	}
};

module.exports = controller;