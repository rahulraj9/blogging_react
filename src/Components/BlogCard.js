export default function BlogCard(props){
console.log("object");
  return(
    <>{
      props.blog.map((list,index)=>{return(
        <div  style={style.card} key={index}>
        <h3>{list.title}</h3>
        <div style={style.data}>
        <span>{list.content}</span>
        <button style={style.btndlt} onClick={()=>props.removeBlog(index)}>Delete</button>
        </div>
        </div>
      )
      })}
    </>
  )
}
const style={
  card:{
    background: "aliceblue",
    borderRadius: "12px",
    width: "auto",
    height: "auto",
  },
  btndlt: {
    width: "fit-content",
    backgroundColor: "Red",
    color: "white",
    padding: "14px 20px",
    border: "none",
    borderRadius: " 4px",
    cursor: "pointer",
  
  },
  data:{
    display:"flex",
    justifyContent:'space-between'  
  }
}