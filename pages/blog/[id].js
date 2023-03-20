import Link from "next/link";
import DefaultLayout from "../../layouts";
import { useState } from "react";
import { getData } from "../../utils/fetchData";
const BlogsDetail = (props) => {
  const [blog, setBlog] = useState(props.blog);
  const [blogs, setBlogs] = useState(props.blogs);
  const [category, setCategory] = useState(props.category);
  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-blogs-detail">
          <div className="nls-container">
            <div className="nls-b-left">
              <div className="nls-b-item">
                <h2 className="nls-txt-title">Search</h2>
                <form action="">
                  <div className="nls-form-group">
                    <input type="text" />
                    <button>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="nls-b-item">
                <h2 className="nls-txt-title">RECENT POSTS</h2>

                {blogs.slice(0, 4).map((item) => (
                  <div className="nls-b-post" key={item._id}>
                    <div className="nls-img">
                      <a href="">
                        <img src={item.images} alt="" />
                      </a>
                    </div>
                    <div className="nls-b-content">
                      <div className="nls-b-header">
                        <a href="">{item.title}</a>
                      </div>
                      <div className="nls-b-body">
                        <span>{item.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="nls-b-item">
                <h2 className="nls-txt-title">PRODUCT CATEGORIES</h2>
                <ul className="nls-b-todo">
                  {category.map((item) => (
                    <li key={item._id}>
                      <a href="">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="nls-b-item">
                <h2 className="nls-txt-title">FILTER BY PRICE</h2>
                <ul className="nls-b-tags">
                  <li>
                    <a href="">Blouse</a>
                  </li>
                  <li>
                    <a href="">Blouse</a>
                  </li>
                  <li>
                    <a href="">Blouse</a>
                  </li>
                  <li>
                    <a href="">Blouse</a>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="nls-b-right">
              <div className="nls-b-header">
                <div className="nls-b-banner">
                  <img src={blog.images} alt="" />
                </div>
                <div className="nls-b-meta">
                  <ul>
                    <li>{blog.createdAt}</li>
                  </ul>
                </div>
                <div className="nls-b-content">
                  <h2 className="nls-txt-title">{blog.title}</h2>
                  <div className="nls-b-describer">
                    {blog.description}
                    <br />
                    {blog.content}
                  </div>
                </div>
                {/* <div className="nls-b-tags">
                  <ul>
                    <li>
                      <i className="fa-solid fa-tags"></i>
                    </li>
                    <li>
                      <a href=""> Furniture</a>
                    </li>
                    <li>
                      <a href=""> Furniture</a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="nls-b-body">
                <h2 className="nls-txt-title">3 Comments</h2>
                <div className="nls-b-comments">
                  <div className="nls-b-item">
                    <div className="nls-b-avatar">
                      <img
                        src="https://htmldemo.net/nelson/nelson/assets/images/author/author2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="nls-b-content">
                      <div className="nls-b-info">
                        <h2 className="nls-txt-titleText">Fatema Asrafi</h2>
                        <button>Reply</button>
                      </div>
                      <div className="nls-b-time">
                        <span>May 17, 2018 at 1:59 am</span>
                      </div>
                      <div className="nls-b-describer">
                        <p>
                          To link your Facebook and Twitter accounts, open the
                          Instagram app on your phone or tablet, and select the
                          Profile tab in the bottom-right corner of the screen.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="nls-b-item">
                    <div className="nls-b-avatar">
                      <img
                        src="https://htmldemo.net/nelson/nelson/assets/images/author/author2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="nls-b-content">
                      <div className="nls-b-info">
                        <h2 className="nls-txt-titleText">Fatema Asrafi</h2>
                        <button>Reply</button>
                      </div>
                      <div className="nls-b-time">
                        <span>May 17, 2018 at 1:59 am</span>
                      </div>
                      <div className="nls-b-describer">
                        <p>
                          To link your Facebook and Twitter accounts, open the
                          Instagram app on your phone or tablet, and select the
                          Profile tab in the bottom-right corner of the screen.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="nls-b-item">
                    <div className="nls-b-avatar">
                      <img
                        src="https://htmldemo.net/nelson/nelson/assets/images/author/author2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="nls-b-content">
                      <div className="nls-b-info">
                        <h2 className="nls-txt-titleText">Fatema Asrafi</h2>
                        <button>Reply</button>
                      </div>
                      <div className="nls-b-time">
                        <span>May 17, 2018 at 1:59 am</span>
                      </div>
                      <div className="nls-b-describer">
                        <p>
                          To link your Facebook and Twitter accounts, open the
                          Instagram app on your phone or tablet, and select the
                          Profile tab in the bottom-right corner of the screen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nls-b-post">
                  <h2 className="nls-txt-title">Leave Your Comment</h2>
                  <form action="">
                    <div className="nls-form-group nls-input-50">
                      <input type="text" />
                      <span className="message"></span>
                    </div>
                    <div className="nls-form-group nls-input-50">
                      <input type="text" />
                      <span className="message"></span>
                    </div>
                    <div className="nls-form-group">
                      <textarea name="" id="" cols="30" rows="10"></textarea>
                      <span className="message"></span>
                    </div>
                    <div className="nls-form-group">
                      <button>Sent comment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
};
export default BlogsDetail;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`blog/${id}`);
  const resFull = await getData("blog");
  const resCate = await getData("category");
  return {
    props: {
      blog: res.blog,
      blogs: resFull.blog,
      category: resCate.category,
      seo: {
        title: "Nelson - Blog Detai",
      },
      breakcrumb: {
        title: "Blog Detai",
        href: "/blog/" + res.blog._id,
      },
    },
  };
}
