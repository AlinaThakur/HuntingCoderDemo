import React, { useEffect, useState } from "react";
import styles from "../../styles/BlogPost.module.css";
import * as fs from "fs"

//step 1: find the file corresponding to the slug
//step 2: populate them inside the page
function Slug(props) {
  function createMarkup(c) {
    return {__html: c};
  }
  
  const [blog, setBlog] = useState(props.myBlog);
 return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />
        { blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
      </main>
    </div>
  );
}


export async function getStaticPaths() {
  let allb = await fs.promises.readdir(`blogdata`)
 allb = allb.map((item)=>{
  return {params :{ slug:item.split(".")[0]}}})
  console.log(allb)
  return {
    paths:allb,
    // paths: [
    //  {params :{slug:  "how-to-learn-flask" }},
    //  {params :{slug:  "how-to-learn-javascript" }},
    //  {params :{slug:  "how-to-learn-nextjs" }},

    // ],
    fallback: true
  }}
  
  export async function getStaticProps(context) {
    // console.log(context)
    // const router = useRouter();
    const { slug } = context.params;
    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`,"utf-8")
      
    return {
      props: { myBlog:JSON.parse(myBlog) }
    };
  }



// export async function getServerSideProps(context) {
//   // console.log(context.query)
//   // const router = useRouter();
//   const { slug } = context.query;
//   let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   let myBlog = await data.json();
//   return {
//     props: { myBlog },
//   };
// }
export default Slug;
