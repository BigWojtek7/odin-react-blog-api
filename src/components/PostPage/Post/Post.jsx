import styles from './Post.module.css'
function Post({ post }) {
  return (
    <div>
      <p className={styles.title}>{post.title}</p>
      <p className={styles.content}>{post.content}</p>
    </div>
  )
}

export default Post