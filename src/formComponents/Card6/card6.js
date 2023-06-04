import gV from "../../gV";
import { setGlobalState, useGlobalState } from "../../hookState";
import "./card6.css";
import { getAuth } from "firebase/auth";

const Card6 = () => { 

  const auth = getAuth();
  const user =  auth.currentUser;
  

  const [isError] = useGlobalState("isError");
  const [user_email_live] = useGlobalState("user_email_live");

  const handleChange = (e) => {
       gV.MailAddres = e.target.value;

       setGlobalState("user_email_live", e.target.value);
       setGlobalState("isFormValidate", true);
      
       {gV.showAppliesText.toString()}
   
    }

    return (
      <div className="card6">
        <div className="card6-main">
          <div className="card6-texts">
            <p>We are a team of 30+ US board-certified  radiologists, and we recheck {gV.showAppliesText.toString()} with artificial intelligence to make sure your diagnosis was accurate and nothing was missed.</p>
               <div className="card6-texts-child"> 
                  <p>To stay in contact with you, please provide us with your email address. We will send your<span> password </span>to the same email address.</p>
                  <p className="mt-2" style={{lineHeight: "18px" }}>We hate spam e-mails, too. You can drop me an e-mail anytime you want at jessica@vitamu.com</p>
               </div>
          </div>
          <input  disabled= {false ? true : false}  onChange={handleChange} className="nameİnput" placeholder={user ? user.email : "Type your e-mail here."}/>
          <p  className= {isError ? "is-error-text" : "display-none" }> This question is required</p>
          
        </div>
      </div>
    );
}

export default Card6;