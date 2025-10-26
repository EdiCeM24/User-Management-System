

/** 
 * Customer Routes
   GET Homepage
**/
exports.homepage = async (req, res) => {
    
    const locals = {
        title: 'Nodejs Program.',
        message: 'This is an ejs app.'
    };
    
    res.render('index', {locals});
}

/** 
 * 
   GET customer Form
**/
exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer',
        message: 'This is an ejs app.'
    };

    res.render('customer/add')
}