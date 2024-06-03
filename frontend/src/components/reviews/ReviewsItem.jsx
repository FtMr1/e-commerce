import React from 'react'

const ReviewsItem = ({reviewItem}) => {
  const { review, user } = reviewItem;
  const { text, createdAt, rating } = review;
  const formatDate = new Date(createdAt).toLocaleDateString("tr-TR")
  return (
    <li className="comment-item">
    <div className="comment-avatar">
      <img src={user.avatar} width={60} alt=""/>
    </div>
    <div className="comment-text">
      <ul className="comment-star">
        {Array.from({length: rating } , (_ , index)=>{
          return(
            <li key={index}>
            <i className="bi bi-star-fill"></i>
          </li>
          )
        })}
        

      </ul>
      <div className="comment-meta">
        <strong>{user.username}</strong>
        <span> - </span>
        <time>{formatDate}</time>
      </div>
      <div className="comment-description">
        <p>{text}</p>
      </div>
    </div>
  </li>
  )
}

export default ReviewsItem