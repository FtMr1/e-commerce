import React, { useEffect, useState } from 'react'
import './Reviews.css'
import ReviewsForm from './ReviewsForm'
import ReviewsItem from './ReviewsItem'
const Reviews = ({active ,singleProduct, setSingleProduct}) => {

const [users, setUsers] = useState([])
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const thisReview = [];

  useEffect(() => {
    const fetchUser = async () => {
   
      try {
        const response = await fetch(`${apiUrl}/api/users`)
         
  
        if (response.ok) {
          const data = await response.json();
              setUsers(data)
        } else {
          message.error("Veri başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchUser()
  }, [apiUrl])
  
  console.log(users)

  singleProduct && singleProduct.reviews.forEach((review)=>{
      const matchingUsers = users?.filter((user)=> user._id === review.user);

      matchingUsers.forEach((matchingUsers)=>{
        thisReview.push(({
          review : review,
          user : matchingUsers,

        }))
      })
  })
  
  return (
    <div className={`tab-panel-reviews  ${active}`}>
        <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
        {singleProduct && singleProduct.reviews.length >0 ?   <div className="comments">
          <ol className="comment-list">
           
            {thisReview.map((item , i )=>(
                    <ReviewsItem key={i} item={item} reviewItem={item}/>
            ))}
            
            
          </ol>
        </div> : <h3 style={{color: "red"}}>Hiç yorum yok</h3>}
      
       
        <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewsForm 
        singleProduct={singleProduct}
        setSingleProduct={setSingleProduct}
          
          
        />
      </div>
    </div>
       
      
  )
}

export default Reviews