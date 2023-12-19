import { client } from "../../sanity/lib/client";
export const getOwner = async () => {
  try {
    const query = `*[_type == "owner"]{ 
       _id,
      name,
      work,
      email,
      facebook,
      github,
      youtube
      
    }`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

//PRODUCTS

export const getAllProjects = async (start, end) => {
  try {
    const projectQuery = `*[_type == "project"] | order(_createdAt desc){
      _id,
      title,
      description,
      price,
      'category': category->category,
      'images':images[]{
        asset->{ 
          url,
        }
      },
        _createdAt
    
    }[${start}...${end}]`;
    const data = await client.fetch(projectQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

export const getProject = (id) => {
  const query = `*[_type == "project" && _id == '${id}']{
    _id,
    title,
    description,
    price,
    'category': category->category,
    'images':images[]{
      asset->{ 
        url,
      }
    },
      _createdAt
  }`;
  return query;
};

export const updateProject = async (id) => {
  try {
    const query = `*[_type == "project" && _id == '${id}']`;
    const data = await client.delete(query);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

export const deleteProject = async (id) => {
  try {
    const query = `*[_type == "project" && _id == '${id}']`;
    const data = await client.delete(query);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

export const searchProject = async (searchTerm) => {
  try {
    const query = `*[_type == "project" && title match '${searchTerm}*' ||  description match '${searchTerm}*'
    ]{
      _id,
      title,
      description,
      price,
      'category': category->category,              
      'images':images[]{
        asset->{ 
          url,
        }
      }, 
            }`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};
//USER username email role
export const createUser = async (user) => {
  if (user) {
    try {
      // Use the Sanity client to perform a mutation
      const doc = {
        _type: "user",
        username: user.fullname,
        email,
        role: "user",
      };
      await client.create(doc);

      console.log("values submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
};

export const uploadImage = async (file, type, name) => {
  try {
    // Use the Sanity client to perform a mutation
    const document = await client.assets.upload("image", file, {
      contentType: type,
      filename: name,
    });
    console.log("image submitted successfully!");

    return document;
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};

//CATEGORIES
export const getAllCategory = async () => {
  try {
    const categoryQuery = `*[_type == "category"] | order(_createdAt desc){_id,category}`;
    const data = await client.fetch(categoryQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};
export const getAllSubCategory = async () => {
  try {
    const categoryQuery = `*[_type == "subCategory"] | order(_createdAt desc){_id,subCategory}`;
    const data = await client.fetch(categoryQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};
//SUBCATEGORIES
//QUOTES
export const getAllQuotes = async () => {
  try {
    const quotesQuery = `*[_type == "quote"] | order(_createdAt desc){
      _createdAt,
      budget,
      'category': category->category,

    }`;
    const data = await client.fetch(quotesQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

export const createQuote = async (values, user) => {
  const { country, category, subCategory, budget, images, notes } = values;
  if (country && category && subCategory && budget && images && notes) {
    try {
      // Use the Sanity client to perform a mutation

      const doc = {
        _type: "quote",
        senderId: user.id,
        fullname: `${user.family_name} ${user.given_name}`,
        country,
        category: {
          _type: "reference",
          _ref: category,
        },
        subCategory: {
          _type: "reference",
          _ref: subCategory,
        },
        budget: Number(budget),
        notes,
        images: images.map((url, i) => ({
          _key: `imageNo${i}`,
          _type: "image",
          url,
        })),
      };
      await client.create(doc);

      console.log("values submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
};
