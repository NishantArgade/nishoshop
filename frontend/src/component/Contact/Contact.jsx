import React, { Fragment, useState } from "react";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import PenIcon from "@material-ui/icons/BorderColor";
import { send } from "emailjs-com";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./Contact.css";

const Contact = () => {
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [name, setName] = useState(isAuthenticated ? user.name : "");
  const [email, setEmail] = useState(isAuthenticated ? user.email : "");
  const [phone, setPhone] = useState("");
  const [textMsg, setTextMsg] = useState("");

  const contactFormHandler = (e) => {
    e.preventDefault();
    send(
      "service_anit8tl",
      "template_p75gdzn",
      { name, email, phone, message: textMsg },
      "user_ZeuDrRocdlUZk8k3rjA0N"
    )
      .then(() => {
        alert.success("Message Send Successfully!");
        setPhone("");
        setTextMsg("");
      })
      .catch((err) => {
        alert.error(`Message send Fail! Error:${err}`);
      });
  };
  return (
    <Fragment>
      <MetaData title="Contact -- NISHOSHOP" />

      <section>
        <div className="contactContainer">
          <form className="contactForm" onSubmit={contactFormHandler}>
            <h1 className="ContactHeading">Contact Us</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <EmailIcon />
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="textArea">
              <PenIcon />
              <textarea
                type="text"
                placeholder="Write Your Message Here..."
                value={textMsg}
                required
                onChange={(e) => setTextMsg(e.target.value)}
              />
            </div>

            <Button id="sendBtn" type="submit">
              Send
            </Button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Contact;
