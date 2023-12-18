// schema.js

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      description: 'The username of the user',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'The email address of the user',
      validation: (Rule) => Rule.required().email().unique(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'The role of the user (e.g., admin, member)',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'username',
      subtitle: 'email',
    },
  },
}
