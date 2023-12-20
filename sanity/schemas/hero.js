// categorySchema.js

// heroSchema.js

export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'btnTex',
      title: 'Button Text',
      type: 'string',
      description: 'The title of the hero',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'The title of the hero',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bigText',
      title: 'Big Text',
      type: 'string',
      description: 'The title of the hero',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'smallText',
      title: 'Small Text',
      type: 'text',
      description: 'A brief description of the hero',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'number',
      description: 'The discount of the hero',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'images',
      title: 'Images',
      type: 'image',
      description: 'An array of image for the hero',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'bigText',
    },
  },
}
