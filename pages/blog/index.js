import Link from "next/link";
import DefaultLayout from "../../layouts";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../stores/GlobalState";
import ReactPaginate from "react-paginate";
import { getData } from "../../utils/fetchData";
const Blogs = (props) => {
  // paginate
  const [blog, setBlogs] = useState(props.blogs);
  // paginate
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = blog.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blog.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blog.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(currentItems.length);
  };
  console.log(blog);
  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-blogs">
          <div className="nls-container">
            <div className="nls-b-blogs">
              {currentItems.map((item) => (
                <div className="nls-b-item" key={item._id}>
                  <div className="nls-img">
                    <img src={item.images} alt="" />
                  </div>
                  <div className="nls-b-content">
                    <div className="nls-b-meta">
                      <ul>
                        <li>
                          <span>{item.createdAt}</span>
                        </li>
                        {/* <li>25 Likes</li>
                        <li>25 Views</li> */}
                      </ul>
                    </div>

                    <Link
                      href={"/blog/" + item._id}
                      className="nls-txt-title-ref"
                    >
                      {item.title}
                    </Link>
                    <Link href={"/blog/" + item._id} className="nls-href">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="nls-b-pagination">
              <ReactPaginate
                className=""
                breakLabel="..."
                activeClassName="active"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                // previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
};
export async function getStaticProps() {
  const res = await getData("blog");
  return {
    props: {
      blogs: res.blog,
      seo: {
        title: "Nelson - Blog",
      },
      breakcrumb: {
        title: "Blog",
        href: "/blog",
      },
    },
  };
}

export default Blogs;
