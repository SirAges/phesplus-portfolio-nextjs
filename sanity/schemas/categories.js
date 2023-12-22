export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
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
