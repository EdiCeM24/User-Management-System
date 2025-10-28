const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/** 
 * Customer Routes
   GET Homepage
**/
exports.homepage = async (req, res) => {
    const messages = await req.flash('info')
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    let perPage = 10;
    let page = req.query.page || 1;

    // Fitten Code for pagination:
    //let skip = (page - 1) * perPage;
    //let total = await Customer.countDocuments();
    //let custome = await Customer.find({}).limit(perPage).skip(skip);
    try {
        // This one below is for the pagination.
        //res.render('index', { locals, messages, customers, total, custome, page, perPage });
        
        //These two below display the contents or display the index.ejs contents.
        //const customers = await Customer.find({}).limit(22);
        //res.render('index', { locals, messages, customers });


        const customers = await Customer.aggregate([{$sort: { updatedAt: -1 }}])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();
        const count = await Customer.countDocuments();
        const totalPages = Math.ceil(count / perPage);
        res.render('index', { 
            locals, 
            messages, 
            customers, 
            currentPage: page, 
            totalPages: totalPages });

    } catch(error) {
        console.log(error); 
    }
      
    
}

/** 
 * 
   GET /
   customer Form
**/
exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer',
        message: 'This is an ejs app.'
    };

    res.render('customer/add')
}

/** 
 * 
   POST /
   Create New customer 
**/
exports.postCustomer = async (req, res) => {

    const newCustomer = new Customer({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       tel: req.body.tel,
       email: req.body.email,
       message: req.body.message,
       city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country,
    });

   try {
    
       await Customer.create(newCustomer);
       await req.flash('info',  newCustomer.firstName, 'has been added as a new customer!')

    res.redirect('/')

   } catch (error) {
       console.log('', error);
   }

    
}