export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'image',
      description: 'An array of image for the project',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The name of the category',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'category',
    },
  },
}
