// subCategorySchema.js

export default {
  name: 'subCategory',
  title: 'Sub Category',
  type: 'document',
  fields: [
    {
      name: 'subCategory',
      title: 'Sub Category',
      type: 'string',
      description: 'The name of the subCategory',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'The category of the project',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'subCategory',
    },
  },
}
