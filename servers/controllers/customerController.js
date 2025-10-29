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

    let perPage = 5;
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
 * GET
   Register page
**/
exports.register = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    try {
        
        //These two below display the contents or display the about.ejs contents.
        res.render('register', { locals });


    } catch(error) {
        console.log(error); 
    }   
}


/** 
 * GET
   Login page
**/
exports.login = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    try {
        
        //These two below display the contents or display the about.ejs contents.
        res.render('login', { locals });


    } catch(error) {
        console.log(error); 
    }   
}
/** 
 * GET
   About page
**/
exports.about = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    try {
        
        //These two below display the contents or display the about.ejs contents.
        res.render('about', { locals });


    } catch(error) {
        console.log(error); 
    }   
}


/** 
 * GET
   blog page
**/
exports.blog = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    try {
        
        //These two below display the contents or display the about.ejs contents.
        res.render('blog', { locals });


    } catch(error) {
        console.log(error); 
    }   
}


/** 
 * GET
   Contact page
**/
exports.contact = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    try {
        
        //These two below display the contents or display the about.ejs contents.
        res.render('contact', { locals });


    } catch(error) {
        console.log(error); 
    }   
}


/** 
 * GET
   Contact page
**/
exports.settings = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    try {
        
        //These two below display the contents or display the about.ejs contents.
        res.render('settings', { locals });


    } catch(error) {
        console.log(error); 
    }   
}




/** 
 * GET
   404 page
**/
exports.pageNotFound = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };

    try {
        
        //These two below display the contents or display the about.ejs contents.
        res.render('404', { locals });


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
   GET /
   Customer Data
**/
exports.viewCustomer = async (req, res) => {

    try {                               // we can still use findOne({_id:req.params.id})
        const customer = await Customer.findById({_id:req.params.id});

        const locals = {
           title: 'View Customer Data',
           message: 'This is an ejs app.'
        };

        res.render('customer/view', { locals, customer });


    } catch (error) {
        console.log(error);
    }

}

/** 
   GET /
   Edit Customer's Data
**/
exports.editCustomer = async (req, res) => {

    try {
        const customer = await Customer.findById({_id:req.params.id});

        const locals = {
           title: 'Edit Customer Data',
           message: 'This is an ejs app.'
        };

        res.render('customer/edit', { locals, customer });


    } catch (error) {
        console.log(error);
    }
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

/** 
 * 
   POST /
   Register customer 
**/
exports.registerPost = async (req, res) => {

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

    res.redirect('login')

   } catch (error) {
       console.log('', error);
   }   
}


/** 
 * 
   POST /
   Login customer 
**/
exports.loginPost = async (req, res) => {

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



/** 
   PuT /
   Update (Edit) Customer's Data
**/
exports.editPost = async (req, res) => {

    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            message: req.body.message,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            country: req.body.country,
            updatedAt: Date.now()
        });
        
        res.redirect(`/edit/${req.params.id}`)
    } catch (error) {
        console.log(error);
    }
}


/** 
   GET /
   Search Customer's Data
**/
exports.searchCustomer = async (req, res) => {

    try {               // we can still use search
       
        let searchTerm = req.query.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[a-zA-Z0-9]/g, '');

        let customers = await Customer.find({
            $or: [
                { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i'), $options: 'i' } },
                { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i'), $options: 'i' } },
                { tel: { $regex: new RegExp(searchNoSpecialChar, 'i'), $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { message: { $regex: searchTerm, $options: 'i' } },
                { city: { $regex: searchTerm, $options: 'i' } },
                { state: { $regex: searchTerm, $options: 'i' } },
                { zipCode: { $regex: new RegExp(searchNoSpecialChar, 'i'), $options: 'i' } },
            ]
        });

        const locals = {
            title: 'Search Customer Data',
            message: 'This is an ejs app.'
        };

        res.render('search', { 
            locals, 
            customers, 
            searchTerm 
        });

    } catch (error) {
        console.log(error);
    }
}





/** 
   DELETE /
   Remove Customer's Data
**/
exports.deleteCustomer = async (req, res) => {

    try {               // we can still use deleteOne({_id:req.params.id})
        await Customer.findByIdAndDelete(req.params.id);
        await req.flash('info', 'Customer has been deleted successfully!')
        res.redirect('/')

    } catch (error) {
        console.log(error);
    }
}


/** 
 * 
   POST /
   Login customer 
**/
exports.logout = async (req, res) => {

   try {
       req.logout();
       await req.flash('info', 'You have been logged out successfully!')

       res.redirect('login')

   } catch (error) {
       console.log('', error);
   }   
}