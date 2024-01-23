import { client } from "../../sanity/lib/client";

//OWNER
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

//HERO
export const getHero = async () => {
  try {
    const heroQuery = `*[_type == "hero"] | order(_createdAt desc){
      _id,
      btnText,
      link,
      bigText,
      smallText,
      discount,
      'images':images{
        asset->{ 
          url,
        }
      },
        _createdAt
    
    }`;
    const data = await client.fetch(heroQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};
//PRODUCTS

export const createProject = async (values) => {
  const { title, description, link, price, images, category } = values;
  if (title && description && link && price && images && category) {
    try {
      // Use the Sanity client to perform a mutation

      const doc = {
        _type: "quote",
        title,
        description,
        link,
        price: Number(price),
        category: {
          _type: "reference",
          _ref: category,
        },
        images: images.map((url, i) => ({
          _key: `imageNo${i}`,
          _type: "image",
          url,
        })),
      };
      await client.create(doc);

      console.log("Projects submitted successfully!");
    } catch (error) {
      console.error("Error submitting project:", error.message);
    }
  }
};

export const updateProject = async (values) => {
  const { title, description, link, price, images, category } = values;

  try {
    const doc = {
      _type: "project",
      title,
      description,
      link,
      price: Number(price),
      category: {
        _type: "reference",
        _ref: category,
      },
      images: images.map((url, i) => ({
        _key: `imageNo${i}`,
        _type: "image",
        url,
      })),
    };
    const data = await client
      .patch(id)
      .insert({
        doc,
      })
      .commit();
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

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
    
    }[${start ? start : 0}...${end ? end : null}]`;
    const data = await client.fetch(projectQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

export const getProject = async (id) => {
  try {
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

    const data = await client.fetch(query);
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
        _id: user.id,
        username: `${user.family_name} ${user.given_name}`,
        email: user.email,
        role: "user",
      };

      const data = await client.createIfNotExists(doc, user.id);
      console.log("values submitted successfully!");

      return data;
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
};

export const getUser = async (id) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  try {
    const categoryQuery = `*[_type == "user && _id == '${id}"] | order(_createdAt desc){
      _id,
      role,
      username,
      email
    }`;
    const data = await client.fetch(categoryQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};
export const getAllUser = async () => {
  try {
    const categoryQuery = `*[_type == "user"] | order(_createdAt desc){
      _id,
      role,
      username,
      email
    }`;
    const data = await client.fetch(categoryQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
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
    const categoryQuery = `*[_type == "category"] | order(_createdAt desc){
      _id,category}`;
    const data = await client.fetch(categoryQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};
export const getAllSubCategory = async () => {
  try {
    const categoryQuery = `*[_type == "subCategory"] | order(_createdAt desc){
      _id,
      subCategory,
      'category': category->category,
    }`;
    const data = await client.fetch(categoryQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};

export const createCategory = async (value) => {
  if (value) {
    try {
      // Use the Sanity client to perform a mutation

      const doc = {
        _type: "category",
        category: value,
      };
      const data = await client.create(doc);
      console.log("Category submitted successfully!");
      if (!data || data === null || data === undefined) {
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  } else {
    return null;
  }
};

export const deleteDoc = async (id) => {
  try {
    const data = await client.delete(id);
    return "deleted";
  } catch (error) {
    console.error("Error deleting Sanity data:", error.message);
  }
};

export const createSubCategory = async (value, mainCat) => {
  if (value) {
    try {
      // Use the Sanity client to perform a mutation

      const doc = {
        _type: "subCategory",
        subCategory: value,
        category: {
          _type: "reference",
          _ref: mainCat,
        },
      };
      const data = await client.create(doc);
      console.log("Category submitted successfully!");
      if (!data || data === null || data === undefined) {
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  } else {
    return null;
  }
};
//SUBCATEGORIES
//QUOTES
export const getAllQuotes = async () => {
  try {
    const quotesQuery = `
    *[_type == "quote" ] | order(_createdAt desc){
      _id,
      senderId,
      status,
      title,
      fullname,
      country,
      paid,
      amount,
      budget,notes,
      'subCategory':subCategory->subCategory,
      _createdAt,
      budget,
      'category': category->category,
      'images':images[]{
        asset->{ 
          url,
        }
      },

    }`;

    const data = await client.fetch(quotesQuery);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
  }
};
export const getAllUserQuotes = async (id) => {
  try {
    const quotesQuery = `
    *[_type == "quote" && senderId == '${id}'] | order(_createdAt desc){
      _id,
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

export const createQuote = async (values) => {
  const { country, category, subCategory, budget, images, notes } = values;
  if (country && category && subCategory && budget && images && notes) {
    try {
      // Use the Sanity client to perform a mutation

      const doc = {
        _type: "quote",
        senderId: user.id,
        status: "pending",
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
export const updateQuote = async (values, others) => {
  const { _id, country, category, subCategory, budget, images, notes } = values;
  if (country && category && subCategory && budget && images && notes) {
    try {
      // Use the Sanity client to perform a mutation

      const doc = {
        _type: "quote",
        status: others.status,
        paid: others.paid,
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
      await client.patch(_id).insert(doc).commit();

      console.log("values submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
};
