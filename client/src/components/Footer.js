import react from 'react'
import github from './../images/github.png'



const Footer = () => {


  return (
    // <footer className='fixed-bottom'>
    <section className='icon-display'>
      <p>FOLLOW US</p>
      <div className='icon'>
        <a className="nav-item nav-link github" href="https://github.com/liuyuanmeng"> <img src={github} />Yuanmeng</a>
        <a className="nav-item nav-link github" href="https://github.com/giubbas"> <img src={github} />Riccardo</a>
        <a className="nav-item nav-link github" href="https://github.com/markoravnice25"> <img src={github} />Marko</a>
      </div>
      © Project3, 25May2022. Marko-Yuanmeng-Riccardo♥️. 
    </section>






  // </footer>
  )
}

export default Footer