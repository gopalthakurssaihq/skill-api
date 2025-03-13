module.exports = async (req, res, next) => {
    // if (req.session.profile) {
    //     res.locals.profile = req.session.profile
    //     next();
    // } else {
    //     res.render('login');
    // }
    next();
};


// const sessionChecker = async (req, res, next) => {
//     const accessToken = req.headers['x-access-token'];
//     if (!accessToken) {
//       return res.status(401).send('Unauthorized');
//     }
  
//     try {
//       const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
//       if (decoded.exp < Date.now() / 1000) {
//         return res.status(401).send('Access token expired');
//       }
//     } catch (err) {
//       return res.status(401).send('Invalid access token');
//     }
  
//     if (!req.session.profile) {
//       return res.status(401).send('Unauthorized');
//     }
  
//     const profile = req.session.profile;
//     const allowedModules = profile.allowedModules;
//     const currentRoute = req.route.path;
//     const currentMethod = req.method.toLowerCase();
  
//     // Extract the module name from the route path
//     const moduleName = currentRoute.split('/')[1];
  
//     const isAccessible = allowedModules.some((module) => {
//       return module.value === moduleName && module.operations.includes(currentMethod);
//     });
  
//     if (!isAccessible) {
//       return res.status(403).send('Forbidden');
//     }
  
//     next();
//   };