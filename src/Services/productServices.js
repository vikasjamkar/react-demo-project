const baseUrl = "https://dummyjson.com";

const getAllProduct = async () => {
  try {
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateProductTitle = async (id, title) => {
  try {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
      }),
    };
    const response = await fetch(`${baseUrl}/products/${id}`, option);
    const data = await response.json();
    getAllProduct();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const deleteProductTitle = async (id) => {
  try {
    const option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${baseUrl}/products/${id}`, option);
    const data = await response.json();
    getAllProduct();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const addProductTitle = async (title, comment) => {
  try {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: comment,
      }),
    };
    const response = await fetch(`${baseUrl}/products/add`, option);
    const data = await response.json();
    getAllProduct();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export {
  getAllProduct,
  updateProductTitle,
  deleteProductTitle,
  addProductTitle,
};
