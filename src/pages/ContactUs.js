import React, {useState} from "react";
import emailjs from "@emailjs/browser";
import {init} from "@emailjs/browser";

init("user_LVwaNrHvAvjKnEkcWJ5qe");

const ContactUs = () => {
  const [, showResult] = useState(false); /// use let ??

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "shop-Gmail",
        "toys-shop",
        e.target,
        "user_LVwaNrHvAvjKnEkcWJ5qe"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
    showResult(true);
  };

  setTimeout(() => {
    showResult(false);
  }, 5000);


  return (
    <div className="contact__us">
      <div className="container contact-form">
        <div className="contact-image">
          <img
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form onSubmit={sendEmail}>
          <h3>Drop Us a Message</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="txtName"
                  className="form-control"
                  placeholder="Your Name *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="txtEmail"
                  className="form-control"
                  placeholder="Your Email *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="txtPhone"
                  className="form-control"
                  placeholder="Your Phone Number *"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  value="Send Message"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <textarea
                  name="txtMsg"
                  className="form-control"
                  placeholder="Your Message *"
                  style={{width: "100%", height: "150px"}}
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
