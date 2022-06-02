const videos = [
    {title: "One",
    rating: 5,
    comments: "lala"},
    {title: "Two",
    rating: 5,
    comments: "lala"},
    {title: "Three",
    rating: 5,
    comments: "lala"}
]

export const home = (req, res) => {
    return res.render("home", {pageTitle: "Home", videos});
}

export const editVideo = (req, res) => {
    return res.send("editVideo");
}

export const upload = (req, res) => {
    return res.send("upload");
}

export const deleteVideo = (req, res) => {
    return res.send("deleteVideo");
}