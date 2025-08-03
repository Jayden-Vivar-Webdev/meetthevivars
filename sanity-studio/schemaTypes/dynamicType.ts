import { defineType, defineField } from 'sanity';

// Image Document
export const imageAsset = defineType({
  name: 'imageAsset',
  title: 'Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Reception', value: 'reception' },
          { title: 'Ceremony', value: 'ceremony' },
          { title: 'Preparation', value: 'preparation' },
        ],
      },
    }),
    
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});



//Defined the post fields based on the data
export const postAsset = defineType({
  name: 'postAsset',
  title: "Post",
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'User Name',
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }
      ]
    }),
    defineField({
      name: 'timeStamp',
      title: 'Time Stamp',
      type: 'string'
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number'
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'commentText', title: 'Comment Text', type: 'text'},
            {name: 'author', title: 'User Name', type: 'string'},
            {name: 'timestamp', title: 'Time Stamp', type: 'string'}
          ]
        }
      ]
    })
  ]
})

// Video Document
export const videoAsset = defineType({
  name: 'videoAsset',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Reception', value: 'reception' },
          { title: 'Ceremony', value: 'ceremony' },
          { title: 'Preparation', value: 'preparation' },
        ],
      },
    }),
    
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
