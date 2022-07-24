export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "MYANDUBE";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser=req.session.loggedInUser;
    next();
}