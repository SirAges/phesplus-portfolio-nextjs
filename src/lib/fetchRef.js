import { client } from "../../sanity/lib/client";

export const fetchRef = async (id, ref) => {
  try {
    const query = `*[_type == '${ref}' && _id == '${id}']{${ref}}`;
    const data = await client.fetch(query);
    const res = data[0][ref];
    return res;
  } catch (error) {
    console.error("Error fetching Sanity data:", error.message);
    throw error;
  }
};
