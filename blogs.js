const express = require('express');
const { Blog, BlogCategory, User } = require('../models');


// Create blog (doctor only)
router.post('/', isAuthenticated, isDoctor, upload.single('image'), async (req, res) => {
try {
const { title, categoryId, summary, content, isDraft } = req.body;
const image_url = req.file ? `/uploads/${req.file.filename}` : null;
const blog = await Blog.create({
title,
image_url,
categoryId: categoryId,
authorId: req.user.id,
summary,
content,
is_draft: isDraft === 'true' || isDraft === true
});
return res.json(blog);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


// Get published blogs grouped by category (patient view)
router.get('/by-category', async (req, res) => {
try {
const categories = await BlogCategory.findAll({
include: [{
model: Blog,
as: 'blogs',
where: { is_draft: false },
required: false,
attributes: ['id','title','image_url','summary','created_at']
}]
});
return res.json(categories);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


// Get single blog (public if not draft; doctor can see own draft)
router.get('/:id', async (req, res) => {
try {
const blog = await Blog.findByPk(req.params.id, { include: [{ model: User, as: 'author', attributes: ['id','name'] }, { model: BlogCategory, as: 'category', attributes: ['id','name','slug'] }]});
if (!blog) return res.status(404).json({ error: 'Not found' });
if (blog.is_draft) {
// if draft, only author can access (simple check; adapt to your auth)
if (!req.user || req.user.id !== blog.authorId) return res.status(403).json({ error: 'Forbidden' });
}
return res.json(blog);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


// Get posts by a doctor (include drafts)
router.get('/author/:authorId', isAuthenticated, async (req, res) => {
try {
// Only the author or admin/doctor in your app should see this. Adjust as needed.
if (req.user.id !== parseInt(req.params.authorId) && req.user.role !== 'doctor') {
return res.status(403).json({ error: 'Forbidden' });
}
const blogs = await Blog.findAll({ where: { authorId: req.params.authorId }, order: [['created_at','DESC']] });
return res.json(blogs);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;