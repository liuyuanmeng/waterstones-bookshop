# Project 3: Waterstones Bookshop

## Overview

This was the third project for the Software Engineering Immersive course with GA, which consisted of a full-stack group project built using the MERN stack, the whole project was built and delivered in a week. The idea was to have a database of books and an app which models the Waterstones website, which we used as a guide for this project.

You can find the deployed version of the project [here](https://firestonebookshop.herokuapp.com/).

## Technologies Used

 MERN Stack (MongoDB, Express.js, React, Node.js)
* React Router
* JavaScript (ES6+)
* Mongoose
* JSON Web Token / bcrypt
* React-Bootstrap
* HTML5, CSS3, and SASS
* Axios
* VSCode
* Eslint
* Git & GitHub
* Insomnia
* Google doc for Project Management

## Planning:
* Excalidraw
### Features
* Homepage - index of all books
* Navbar - allow users to navigate across between different pages on the site and serching books by name or author
* User Login/Register Page
* Account Page - users can find their profile and wishlist
* Book show page - detailed view of book, where you can add book to your wishlist, add review and delete review if you are the owner. Same subgerne added.
* Wishlist Page
All content was sourced from the [Waterstones](https://www.waterstones.com/) website

## Approach Taken
Planning (day1) On the first day, we decided on the theme for our project and used Exaclidraw and Google Docs to record working progress and tasks. (day 2&3) We created the back end together, and after all the relations tested in insomnia, we decided to work on the front end separately. 

Division of Work:
* Yuanmeng - Bookshow page , Account page, Navbar
* Marko - Wishlist, Login, Register
* Riccardo - Homepage, Post review, delete review

## Wireframing

Back-End design
The Back-End consisted of a database which held our API; a router (and secure route) through which all requests were made; controllers which would access the model before returning the request back to the User.
<img src="https://user-images.githubusercontent.com/100864042/176675502-1a413930-f225-4dfd-a8b1-32266bc7be42.png" width="600">
Front-End design
We wanted to keep the Front-End Design to a minimum and add on features if we had time at the end. As can be seen in the wireframe, there are three main pages: home page; show page; wishlist page. We didn't add the Register/Login pages to the wireframe as they were a given.

<img width="600" src="https://user-images.githubusercontent.com/100864042/176675798-ad894a94-11b7-4fd9-9c3d-7fc229189c0d.png">




## Demonstration of the App Flow 


https://user-images.githubusercontent.com/100864042/176675900-5f422834-58dd-49dd-8aa5-4109f0795e78.mov


## Final Product of My part - Screenshot & Featured Code Walkthrough
#### Bookshow page
<img width="600" alt="Screenshot 2022-06-29 at 15 45 54" src="https://user-images.githubusercontent.com/100864042/176676047-057e38ed-92fc-4748-bfed-ebce1ed925f7.png">

#### Added serching in Navbar

I have added serching in the Navbar to give users better experience.
<img width="600" alt="Screenshot 2022-06-29 at 15 45 45" src="https://user-images.githubusercontent.com/100864042/176676206-fae167a2-3c71-4930-9e23-312825442c34.png">

``` const handleChange = (e) => {
    setTerm(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      navigate(`/books/search/${term}`)
    } catch (error) {
     
      setErrors(error.response.data)
    }
  }
```
```<form className='form-inline '>
          <input type="text" name="searchTerm" placeholder='🔍Search Book or Author here...' onChange={handleChange} />
          <button type="submit" className="btn btn-outline-dark btn-sm" onClick={handleSubmit}>Search</button>
 
        </form>
```

#### Added books that shared  the same subGenre 
Use the filter to select books from the same subgenre, and the id of the book is not the one I have already displayed above.

<img width="600" alt="Screenshot 2022-06-29 at 15 46 08" src="https://user-images.githubusercontent.com/100864042/176676085-19a43954-297b-41b2-a5a4-c4cbe9df621a.png">

```  <Slider {...settings} className='carousel-wrapper'>
              {similarBooks.filter(item => item.subGenre === book.subGenre && item.id !== book.id).map((item, index) => {
                return <SimilarBookDisplay key={item.id} item={item} />
              })}
            </Slider>
 ```

#### Account Page
Only the first name of users would show on the page, and users can use two links to navigate their profile and wishlist.
``` <h5>Hi {account.firstName}, welcome to your account dashboard</h5>```
``` <a href="/account/profile/" className="btn">👤Your Profile</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <a href="/account/wishlist/" className="btn">❤️Wish Lists</a>
  ```
                


<img width="600" alt="Screenshot 2022-06-29 at 15 46 23" src="https://user-images.githubusercontent.com/100864042/176676107-7839a958-0122-4415-b409-a47299ed6982.png">

#### Profile Page

<img width="600" alt="Screenshot 2022-06-29 at 15 46 36" src="https://user-images.githubusercontent.com/100864042/176676120-886c6369-ee49-4e21-be85-76bd0e340c92.png">





## Reflection
### Challenges 
On the profile page, I faced issues updating all the sections, I have created one handle change to handle the whole form details, but only the top section with users' names has been updated, didn't update email or password. I had to create multip handles to control each area to handle the whole form changing.
``` const handleSubmitDetails = async (e) => {
    e.preventDefault()
    try {
      const formDataDetails = {
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }
      console.log('form', formDataDetails)
      const { data } = await axios.put('/api/account/profile', formDataDetails, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },

      })
      console.log('data', data)

    } catch (error) {
      console.log(error)

    }
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault()
    try {

      const formDataEmail = {
        email: formData.email,
        confirmEmail: formData.confirmEmail,

      }

      const { data } = await axios.put('/api/account/profile', formDataEmail, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },

      })

    } catch (error) {
      console.log(error)

    }
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    try {
      const formDataPassword = {
        password: formData.password,
        _passwordConfirmation: formData._passwordConfirmation,

      }

      const { data } = await axios.put('/api/account/profile', formDataPassword, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },

      })

    } catch (error) {
      console.log(error)

    }
  }
```

### Key Learnings
* Using  MERN
* Designing relationships on the Back-end and control flow on the Frend-end
* Working in group 
* Prioritise tasks
* Time management 

### Future Improvements
* Responsive styling
* Review display render
* No repetite books add in the wishlists 







