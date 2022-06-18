import Video from "../models/Video";

export const home = async(req, res) => {
    try{
        const videos = await Video.find({}).sort({createdAt:"desc"});
        return res.render("home", {pageTitle: "Home", videos});
    } catch(error){
        console.log(error);
    }
}

export const watch = async(req, res) => {
    try{
        const {id}=req.params;
        const video = await Video.findById(id);
        return res.render("watch", {pageTitle:video.title, video});
    } catch(error){
        console.log(error);
        return res.render("404", {pageTitle:"404"});
    }
}

export const getEdit = async(req, res) => {
    try{
        const {id}=req.params;
        const video = await Video.findById(id);
        return res.render("edit", {pageTitle: `Editing : ${video.title}`, video});
    } catch(error){
        console.log(error);
        return res.redirect(`/videos/${id}`);
    }
}

export const postEdit = async(req, res) => {
    try{
        const {
            params:{id},
            body:{title, description, hashtags},
        } = req;
        const video = await Video.exists({_id:id});
        if(!video){
            return res.render("404",{pageTitle:"Not Found"})
        } else{
            await Video.findByIdAndUpdate(id,{
                title,
                description,
                hashtags:Video.hashtagsFormat(hashtags),
            }) 
            return res.redirect(`/video/${id}`);
        }
    } catch(error){
        console.log(error);
        return res.redirect(`/video/${id}/edit`);
    }
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle:"Upload Video"});
}

export const postUpload = async(req, res) => {
    try{
        const {title, description, hashtags} = req.body;
        console.log(hashtags);
        const newVideo = {
            title,
            description,
            hashtags:Video.hashtagsFormat(hashtags),
        }
        await Video.create(newVideo);
        return res.redirect("/");
    } catch(error){
        console.log(error);
        return res.render("upload", {pageTitle:"Upload Video"});
    }
}

export const deleteVideo = async(req, res) => {
    try{
        const {id} = req.params;
        await Video.findByIdAndDelete(id);
        return res.redirect("/");
    } catch(error){
        console.log(error);
        return res.redirect(`/video/${id}`);
    }
}

export const search = async(req, res) => {
    const {title, hashtag} = req.query;
    let videos = [];
    if(title){
        videos = await Video.find({
            title:{
               $regex: new RegExp(title, "i")
            }});
    } else if(hashtag){
        videos = await Video.find({
            hashtags:{
                $regex: new RegExp(hashtag)
            }});
    }
    return res.render("search", {pageTitle:"Search",title, hashtag,videos});
}