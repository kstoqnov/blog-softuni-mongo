import React from "react";
import {MDBContainer,MDBFooter} from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter  className="font-small pt-4 mt-4 bg-primary">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:  blog.com 
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;