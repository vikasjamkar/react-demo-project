import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllProduct,
  updateProductTitle,
  deleteProductTitle,
  addProductTitle,
} from "../Services/productServices";
import { useCaptcha } from "../hooks/UseCaptcha";
import { useUppercase } from "../hooks/UserUppercase";

const TemplatePage = () => {
  const [postMock, setPostMock] = useState([]); // all data
  const [post, setPost] = useState([]); //single data
  const [inputId, setInputId] = useState(""); // use for id
  const [title, setTitle] = useState(""); //use for title input
  const [comment, setComment] = useState("");
  const [id, setId] = useState();
  const [error, setError] = useState("");
  const [cmt, setCmt] = useState("");
  const [color, setColor] = useState();
  const [isEdit, setIsEdit] = useState(false); //form is edit or not
  const [filterByTitle, setFilterByTitle] = useState(""); //filtering a data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProduct();
        setPostMock(result.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title !== "" && comment !== "") {
      if (!isEdit) {
        // setId(id + 1);
        // setPostMock((prev) => {
        //   return [...prev, { id: id, title: title, description: comment }];
        // });
        const result = addProductTitle(title, comment);
        console.log(result);
        setTitle("");
        setComment("");
        setError("");
        setCmt("");
        toast.success("Product Details submit Successfully...");
      } else {
        // const updatePost = postMock.filter((item) => {
        //   if (item.id === inputId) {
        //     item.title = title;
        //     item.description = comment;
        //   }
        //   return [...postMock, item];
        // });
        const result = updateProductTitle(inputId, title);
        console.log("result", result);
        // setPostMock(updatePost);
        setIsEdit(false);
        setTitle("");
        setComment("");
        setInputId("");
        toast.success("Update Successfully...");
      }
    } else {
      setError("Title is required");
      setCmt("Description is required");
      setColor("text-danger");
    }
  };

  const viewPostDetail = (id) => {
    const viewDetails = postMock.filter((item) => item.id === id);
    setPost(viewDetails);
  };

  const editClick = (id) => {
    const editPost = postMock.filter((item) => item.id === id);
    setInputId(editPost[0]?.id);
    setTitle(editPost[0]?.title);
    setComment(editPost[0]?.description);
    setIsEdit(true);
    setError("");
    setCmt("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setInputId(id);
  };

  const deleteClick = (id) => {
    // const deletePost = postMock.filter((item) => item.id !== id);
    // setPostMock(deletePost);
    const result = deleteProductTitle(id);
    toast.error("Post Delete Successfully");
  };

  const filteredData = postMock.filter((item) =>
    item.title.toLowerCase().includes(filterByTitle.toLowerCase())
  );

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "500px" }}
      >
        <form action="post" style={{ width: "350px" }} className="border p-3">
          <h4 className="text-center">{!isEdit ? "Add" : "Edit"} Product</h4>
          <hr />
          <dl>
            <dt>Title</dt>
            <dd>
              <input type="hidden" value={inputId} name="inputId" />
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                // onKeyUp={handleKey(e)}
                onChange={(e) => setTitle(e.target.value)}
                style={{ borderColor: error === "" ? "" : "red" }}
              />
            </dd>
            <dd className={color}>{error}</dd>
            <dt>Description</dt>
            <dd>
              <textarea
                cols="20"
                rows="5"
                name="comment"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ borderColor: cmt === "" ? "" : "red" }}
              ></textarea>
            </dd>
            <dd className={color}>{cmt}</dd>
            <dd>
              <button
                className="btn btn-primary w-100"
                type="button"
                onClick={(e) => handleSubmit(e)}
              >
                {!isEdit ? "Submit" : "Update"}
              </button>
            </dd>
          </dl>
        </form>
      </div>

      <div className="d-flex justify-content-end">
        <div className="me-4">
          <input
            placeholder="Filter by title"
            type="text"
            name="search"
            className="form-control mb-2"
            value={filterByTitle}
            onChange={(e) => setFilterByTitle(e.target.value)}
            aria-autocomplete="off"
          />
        </div>
      </div>
      <ToastContainer></ToastContainer>
      <div className="table-responsive container-fluid">
        <table className="table table-hover">
          <thead style={{ borderTop: "1px solid lightgrey" }}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Preview</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData?.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.thumbnail} alt="" height="100" width="100" />
                  </td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td className="text-center">
                    <div className="btn-group">
                      <i
                        type="button"
                        className="bi bi-three-dots"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ fontSize: "1.5em" }}
                      ></i>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                          <span
                            className="bi bi-eye dropdown-item btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#post"
                            onClick={() => viewPostDetail(item.id)}
                          >
                            {" View "}
                          </span>
                        </li>
                        <li>
                          <span
                            className="bi bi-pencil dropdown-item btn btn-primary"
                            onClick={() => editClick(item.id)}
                          >
                            {" Edit"}
                          </span>
                        </li>
                        <li>
                          <span
                            className="bi bi-trash dropdown-item btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            {" Delete"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan="4" className="text-center">
                No Data found
              </td>
            )}
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="post">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>View Product Details</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {post?.map((item) => (
                <table className="table" key={item.id}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Preview</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={`${item.id}_modal`}>
                      {/* <td>{item.id}</td> */}
                      <td>{item.title}</td>
                      <td>
                        <img
                          src={item.thumbnail}
                          alt=""
                          height="100"
                          width="100"
                        />
                      </td>
                      <td>{item.description}</td>
                      <td>
                        <button
                          className="bi bi-pen btn btn-warning"
                          data-bs-dismiss="modal"
                          onClick={() => editClick(item.id)}
                        ></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="delete">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h6>Are you sure want to Delete?</h6>
            </div>
            <div className="modal-body text-center">
              <i
                className="bi bi-x-circle"
                style={{ fontSize: "5em", color: "red" }}
              ></i>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary me-2"
                onClick={() => deleteClick(inputId)}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
              <button className="btn btn-warning" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TemplatePage;
