// categorySchema.js

// projectSchema.js

export default {
  name: 'owner',
  title: 'Owner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the project',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'work',
      title: 'Work',
      type: 'text',
      description: 'A brief description of the work',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'The email of the project',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
      description: 'The facebook of the project',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'github',
      title: 'Github',
      type: 'string',
      description: 'The github of the project',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'youtube',
      title: 'YoUtube',
      type: 'string',
      description: 'The youtube of the project',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.category',
    },
  },
}
