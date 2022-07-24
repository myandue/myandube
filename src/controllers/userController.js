import User from "../models/User";
import bcrypt from "bcrypt";
import { json, redirect } from "express/lib/response";
import fetch from "node-fetch";
import { token } from "morgan";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle : "JOIN"});
}

export const postJoin = async(req, res) => {
    const {email,name, username, birthday, password, password2} = req.body;
    const usernameExist = await User.exists({username});
    const emailExist = await User.exists({email});
    if(password!==password2){
        const errMsg = "Password confirmation doesn't match."
        return res.status(400).render("join", {pageTitle:"JOIN", errMsg});
    } else if(usernameExist){
        const errMsg = "This username is already taken."
        return res.status(400).render("join", {pageTitle:"JOIN", errMsg});
    } else if(emailExist){
        const errMsg = "This email is already taken."
        return res.status(400).render("join", {pageTitle:"JOIN", errMsg});
    }
    const user = await User.create({email, name, username, birthday, password});
    req.session.loggedIn=true,
    req.session.loggedInUser=user;
    return res.redirect("/");
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:"LOG-IN"});
}

export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        const errMsg = "This username doesn't exist."
        return res.render("login", {pageTitle:"LOG-IN", errMsg});
    }
    const passwordConfirmation = await bcrypt.compare(password, user.password);
    if(!passwordConfirmation){
        const errMsg="Password is not correct.";
        return res.render("login", {pageTitle:"LOG-IN", errMsg});
    }
    req.session.loggedIn=true;
    req.session.loggedInUser=user;
    return res.redirect("/");
}

export const startGithub = (req, res)=>{
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id:process.env.CLIENT_ID,
        scope : "read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithub = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.CLIENT_ID,
        client_secret:process.env.CLIENT_SECRET,
        code:req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenReq = await (await fetch(finalUrl,{
        method:"POST",
        headers:{
            Accept:"application/json"
        }
    })).json();
    if("access_token" in tokenReq){
        const {access_token}=tokenReq;
        const apiUrl="https://api.github.com";
        const userReq = await (await fetch(`${apiUrl}/user`,{
            headers:{
                Authorization : `token ${access_token}`
            }
        })).json();
        const emailReq = await (await fetch(`${apiUrl}/user/emails`,{
            headers:{
                Authorization : `token ${access_token}`
            }
        })).json();
        const email = emailReq.find(
            (emailData) => emailData.primary===true && emailData.verified===true,
        );
        if(!email){
            //notification
            return res.redirect("/join");
        };
        const existedUser = await User.findOne({email:email.email});
        if(existedUser){
            req.session.loggedIn=true,
            req.session.loggedInUser=existedUser;
            return res.redirect("/");
        }
        const user = await User.create({
            email: email.email,
            name:userReq.name,
            username:userReq.login,
            socialOnly:true,
        });
        req.session.loggedIn=true,
        req.session.loggedInUser=user;
        return res.redirect("/");
    }
    return res.redirect("/");
}

export const logout = (req, res) => {
    req.session.loggedIn=false;
    req.session.loggedInUser={};
    return res.redirect("/");
}

export const editUser = (req, res) => {
    return res.send("editUser");
}

export const deleteUser = (req, res) => {
    return res.send("deleteUser");
}

export const profile = (req, res) => {
    return res.send("profile");
}