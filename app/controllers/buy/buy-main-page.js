exports.index = function(req, res){
  res.render('buy/buy-main-page', {
    title: 'Park Ave',
    // csrfToken: req.csrfToken()
  });
};
