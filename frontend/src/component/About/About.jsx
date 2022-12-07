import React, { Fragment } from "react";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./About.css";
import MetaData from "../layout/MetaData";

const About = () => {
  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/nishant-argade-9058ab1a5/";
  };
  return (
    <Fragment>
      <MetaData title="About -- NISHOSHOP" />

      <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
          <Typography component="h1">About Us</Typography>

          <div>
            <div>
              <Avatar
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                src="https://res.cloudinary.com/dz9ggznzw/image/upload/v1646480161/avatars/jeg5sqtzsgj7knsrpwwz.jpg"
                alt="Founder"
              />
              <p>Nishant Argade</p>
              <Button onClick={visitLinkedin} color="primary">
                Visit Linkedin
              </Button>
              <span>
                This is a sample wesbite made by @nishantargade. Only with the
                purpose to learn MERN Stack.
              </span>
            </div>
            <div className="aboutSectionContainer2">
              <Typography component="h2">Our Brands</Typography>
              <a
                href="https://www.facebook.com/nishant.argade.14"
                target="blank"
              >
                <FacebookIcon className="LinkedinIcon" />
              </a>

              <a
                href="https://www.instagram.com/nishant.argade/"
                target="blank"
              >
                <InstagramIcon className="instagramSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
