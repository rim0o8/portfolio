exports.replace_no_img = function (img_src) {
    if (!img_src) {
        return "./no-image.webp"
    }
    else{
        return img_src
    }
}