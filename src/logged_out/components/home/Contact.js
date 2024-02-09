import React from 'react'

const Contact = () => {
  return (
    <div class="content-wrapper">
        <div id="contact" class="contact" data-aos="fade-up">
            <h2 style={{textAlign:'center'}}>Get In Touch</h2>
            <p style={{fontSize:25, marginTop:20}}>Contact us for a free 30 minute diagnostics session!</p>
            <form class="contactForm" action="https://usebasin.com/f/a15221a633b7" method="POST">
                <input type="text" name="name" placeholder="Name*" class="contactField" required/>
                <input type="email" name="email" placeholder="Email Address*" class="contactField" required/>
                <textarea rows="15" name="message" placeholder="How can we help you succeed?" class="contactField" />
                <button type="submit" class='buttonClass'>Submit</button>
                </form>
        </div>
    </div>
  )
}

export default Contact
 