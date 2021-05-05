const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth')
const Post = require('../models/Post');

// @route GET  api/posts/
// @desc Get post
// @access private(have to log in)
router.get('/', verifyToken, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.userId }).populate('user', [
			'username'
		])
		res.json({ success: true, posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})






// @route POST  api/posts/
// @desc create post
// @access private(have to log in)
router.post('/',verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body;
    // Validation
    if(!title) return res.status(400).json({success: false, message: 'Title is required!'});

    try {
        const newPost = new Post (
            {
                title, 
                description, 
                url: (url.startsWith('https://')) ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            }
        );

        await newPost.save();
        res.json({success: true, message: 'Happy Learning!', post: newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})


// @route PUT  api/posts/:id
// @desc update post
// @access private(have to log in)
router.put('/:id', verifyToken, async (req, res ) => {
    const {title, description, url, status} = req.body;
    if(!title) return res.status(400).json({success: false, message: 'Title is required!'});

    try {
        let updatedPost = {
			title,
			description: description || '',
			url: (url.startsWith('https://') ? url : `https://${url}`) || '',
			status: status || 'TO LEARN'
		}
        const postUpdateCondition = {_id: req.params.id, user: req.userId};

        updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		)

        // check if user authorized to update or not
        if(!updatedPost) return res.status(401).json({success: false, message: 'Post not found or user are not authorized'})

        res.json({success: true, message:"Updated progress", post: updatedPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route DELETE  api/posts/:id
// @desc delete post
// @access private(have to log in)

router.delete('/:id',verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId};
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        if(!deletedPost) return res.status(401).json({success: false, message: 'Post not found or user are not authorized'})
        res.json({success: true, message:"Deleted successfully", post: deletedPost})



    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})
module.exports = router;