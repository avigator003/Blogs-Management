const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const Blog = new Schema({
  blog_data: String,
  status: String,
}, schemaOptions)

module.exports = mongoose.model('Blog', Blog)