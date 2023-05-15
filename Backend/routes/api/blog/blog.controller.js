const Blog = require('../../../Models/blog')
const multer = require('multer');

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/products');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

// Initialize multer
const upload = multer({ storage });


// Create New Blog
exports.create = (req, res) => {
    Blog.create(req.body)
        .then((data) => {
            res.status(200).json({ success: true, message: 'Blog Created', data });
        })
        .catch((err) => {
            res.status(400).json({ success: false, message: err });
        });
}

//Delete a Blog
exports.delete = (req, res) => {
    // console.log(req.params.id)
    Blog.findByIdAndRemove(req.params.id).
        then(data => {
            res.status(200).json({ status: true, message: "Blog Removed", data })
        }).catch(error => {
            res.status(400).json({ status: false, message: error })
        })
}

// Update Blog
exports.updateProduct = (req, res) => {
    Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then((data) => {
            res.status(200).json({ success: true, message: 'Blog Updated', data });
        })
        .catch((err) => {
            res.status(400).json({ success: false, message: err });
        });
};


exports.showAll = (req, res) => {
    Product.find(query)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({ status: false, message: err })
                return;
            }
            res.status(200).json({ status: true, message: "Blog list fetched", data })
        });
}


//View Blog By Id
exports.view = (req, res) => {
    Blog.findById(req.params.id)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({ status: false, message: error })
                return;
            }
            res.status(200).json({ status: true, message: "Blog fetched", data })
        });
}