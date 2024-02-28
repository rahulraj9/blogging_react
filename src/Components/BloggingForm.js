import { useState, useRef, useEffect, useReducer } from "react";
import BlogCard from "./BlogCard";
// import { type } from "@testing-library/user-event/dist/type";

function blogReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.blog, ...state];
      // break;
    case "REMOVE":
      return state.filter((blog,index)=> index !== action.index)
    default:
      break;
  }
}
export default function BloggingForm() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [formdata, setFormData] = useState({
    title: "",
    content: "",
  });
  // const [blog, setBlog] = useState([]);
  const [blog, dispatch] = useReducer(blogReducer, []);

  const titleref = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    // setBlog([{ title: formdata.title, content: formdata.content }, ...blog]);
    dispatch({
      type: "ADD",
      blog: { title: formdata.title, content: formdata.content },
    });
    setFormData({
      content: "",
      title: "",
    });
    console.log("blog", formdata.title);

    titleref.current.focus();
    // setContent("")
    // setTitle("")
  }
  /**this use Effect is used for focing the title button when the component  is mounting */
  useEffect(() => {
    console.log("hello");
    titleref.current.focus();
  }, []);

  /**this useEffect is use to change the title name based on component update */
  useEffect(() => {
    if (blog.length > 0 && blog[0].title) {
      document.title = blog[0].title;
    } else {
      document.title = "No Blog";
    }
  }, [blog]);

  function removeBlog(indexToRemove) {
    // setBlog(blog.filter((blog, index) => index !== indexToRemove));
    dispatch({ type: "REMOVE", index: indexToRemove });
  }

  return (
    <>
      <form style={style.form} onSubmit={handleSubmit}>
        <span>Title</span>
        <input
          style={style.inputTitle}
          placeholder="Title"
          value={formdata.title}
          ref={titleref}
          onChange={(e) =>
            setFormData({ title: e.target.value, content: formdata.content })
          }
        />

        <span>Content</span>

        <textarea
          style={style.inputContent}
          value={formdata.content}
          required
          onChange={(e) =>
            setFormData({ title: formdata.title, content: e.target.value })
          }
          placeholder="Write something.."
        ></textarea>

        <button style={style.btnInc}>Submit</button>
      </form>
      <h1>Blogs!</h1>
      {blog.length > 0 ? (
        <BlogCard blog={blog} removeBlog={removeBlog} />
      ) : (
        <h1>No blogs</h1>
      )}
      {/* <BlogCard blog={blog}/> */}
    </>
  );
}
const style = {
  form: {
    borderRadius: " 5px",
    backgroundColor: "#f2f2f2",
    padding: "20px",
  },
  span: {},
  inputTitle: {
    width: "100%",
    padding: "12px 20px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: " border-box",
  },
  inputContent: {
    width: "100%",
    padding: "12px 20px",

    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: " border-box",
    height: "120px",
  },
  btnInc: {
    // width: " 10%",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "14px 20px",
    border: "none",
    borderRadius: " 4px",
    cursor: "pointer",
  },
};
