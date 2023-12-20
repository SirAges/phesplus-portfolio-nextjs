// quoteSchema.js

export default {
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    {
      name: 'senderId',
      title: 'Sender Id',
      type: 'string',
      description: 'The sender associated with the quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'The sender associated with the quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'fullname',
      title: 'Full Name',
      type: 'string',
      description: 'The name of the person or entity requesting the quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'The country associated with the quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'The main design category of the project',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'Paid',
      title: 'Paid',
      type: 'boolean',
      description: 'The sender associated with the quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'amount',
      title: 'Amount',
      type: 'number',
      description: 'The sender associated with the quote',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subCategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{type: 'subCategory'}],
      description: 'The subcategory of the design',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'budget',
      title: 'Budget',
      type: 'number',
      description: 'The budget allocated for the project',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Any additional notes or comments related to the quote',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Allows selecting a hotspot on the image
          },
        },
      ],
      description: 'An array of image for the project',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'fullname',
      category: 'category.category',
    },
  },
}
