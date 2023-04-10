const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },
    {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: false
    });

  BlogPostTable.associate = (model) => {
    BlogPostTable.belongsTo(model.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }

  return BlogPostTable;
};

module.exports = BlogPostSchema;

