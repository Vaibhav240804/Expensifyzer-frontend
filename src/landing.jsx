import React, { useEffect } from "react";
import "./landing.css";
import SaveLottie from "./lottiecompo/savelottie";
import Graphlottie from "./lottiecompo/graphlottie";
import CategoreiLottie from "./lottiecompo/categorielottie";
import ReportLottie from "./lottiecompo/reportlottie";
import logo from "./static/expensifyzer-high-resolution-logo-black-on-transparent-background.png"
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

export default function Landing() {
  const user = useSelector((state)=>state.auth.user);
  
  return (
    <div id="landing-main">
      <div id="f-container-landing">
        <div id="f-inner-landing">
          <div id="ind-landing">
            <img
              src={logo}
              alt=""
              sizes=""
              srcset=""
              className=""
            />
            <div id="_2023">2023</div>
          </div>
          <h1 id="heading-landing">EXPENSIFYZER</h1>
          <p id="para-landing">
            Welcome to EXPENSIFYZER, your ultimate expense tracking companion.
            Tame your chaotic spending habits with our innovative features and
            get closer to achieving financial zen.
          </p>
          <div id="btn-getstarted"className="my-3">
            <button id="inner-a-getstarted" >
              <Link to= { user ? '/dashboard' : '/signup'} >Get Started</Link>
            </button>
          </div>
        </div>
        <div id="tracknsave">
          <div id="inner-track">
            <h2 id="trsv-head">Track & Save</h2>
            <h2 id="trsv-txt1">
              Log in using your Google account to seamlessly sync your expense
              data and wave goodbye to those pesky overspending habits.
            </h2>
            <h2 id="trsv-txt2">
              Quickly add expenses with our streamlined mini-form. Choose from
              categories like groceries, bills, and entertainment to keep your
              financial life organized.
            </h2>
          </div>
        </div>
        <div id="landing-gallary">
          <div id="gallary-grid">
            <div className="grid-gallary-item">
            <SaveLottie />
              <h2 className="grid-item-heading">Expense Logging</h2>
              <h3 className="grid-item-txt">
                Save and sort your expenses effortlessly with our easy-to-use
                interface.
              </h3>
            </div>
            <div className="grid-gallary-item">
              <Graphlottie />
              <h2 className="grid-item-heading">Visualize Data</h2>
              <h3 className="grid-item-txt">
                Get a bird's-eye view of your spending habits with visually
                stunning charts and graphs.
              </h3>
            </div>
            <div className="grid-gallary-item lottie-container">
            <CategoreiLottie/>
              <h2 className="grid-item-heading">Categorized Data</h2>
              <h3 className="grid-item-txt">
                Effortlessly categorize and filter your expenses like a
                financial guru.
              </h3>
            </div>
            <div className="grid-gallary-item">
            <ReportLottie />
            
              <h2 className="grid-item-heading">Download Report</h2>
              <h3 className="grid-item-txt">
                Export your data into detailed reports for analysis and
                planning.
              </h3>
            </div>
          </div>
        </div>
        <div id="takeastep-landing">
          <div id="takeastep-wr-landing">
            <h2 id="takeastep-head-landing">
              Ready to rock your budget? Join the Expensifyzer now!
            </h2>
            <div id="btnwrapper-action" className="my-3">
              <div id="btn1-action">
                <Link id="btn1-txt" to='/signup'>Sign Up Now</Link>
              </div>
            </div>
          </div>
        </div>
        <footer id="landing-footer">
          <div id="supp-footer">
            <div className="inn-sup-footer-landing">
              <p className="footer-sup-head-landing">Features</p>
              <div className="aur-ek-bc"></div>
            </div>
          </div>
          <div id="copyw-footer">
            <p id="copyw-txt">© 2023 Expensifyzer. All rights reserved.</p>
            <div id="icons-footer">
              <a href="https://www.instagram.com/vaibhav_kore24/">
                <img
                  id="inst-footer-landing"
                  src="https://th.bing.com/th/id/R.4af42c87858bf65a60f6632aaf366a2f?rik=NGuIpcspN7X91g&riu=http%3a%2f%2fpluspng.com%2fimg-png%2finstagram-logo-eps-png-instagram-logo1-instagram-logo-1915.png&ehk=fvtoXiEoQhjKg0l38At0nkWKwoCxRe14IAkiIwAsQRg%3d&risl=&pid=ImgRaw&r=0"
                  alt="instagram"
                  sizes=""
                  srcset=""
                />
              </a>
              <a href="https://www.linkedin.com/in/vaibhav-kore-9ab28922a/">
                <img
                  id="inst-footer-landing"
                  src="https://th.bing.com/th/id/OIP.LzkgqOQsbW8NTxUvjslavQHaHa?pid=ImgDet&rs=1"
                  alt="linkedin"
                  sizes=""
                  srcset=""
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
