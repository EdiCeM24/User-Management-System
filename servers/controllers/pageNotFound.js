


exports.pageNotFound = async (req, res) => {
    
    const locals = {
        title: '404',
        message: 'Page not found.'
    };
    
    res.render('404', {locals});
}