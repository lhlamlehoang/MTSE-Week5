class Post {
    constructor(id, name, content) {
      this.id = id;
      this.name = name;
      this.content = content;

      this.comments = [];
    }
  }
  
  
  module.exports = Post;