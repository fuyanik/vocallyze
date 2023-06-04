
import {Link} from 'react-router-dom';



const NavbarDropdown = ({showNumber,onMouseLeave,image, line1head1,line1text1,line1head2,line1text2,line1head3,line1text3,line2head1,line2text1,line2head2,line2text2,line2head3,line2text3}) => {

  return(

   <div className="navbar-dropdown" 
            onMouseLeave={onMouseLeave} >
   
       <div className="navbar-dropdown-content">

         

            
             <div className="dropdown-right">

                  
                   {/* LİNE 2 */}
                   <div className="dropdown-line1"> 
                      <div className="line1-content"> 
                        <Link to="/missed-diagnosis" style={{textDecoration:'none'}} > <h2>{line1head2} </h2> </Link>

                        <p> {line1text2}</p>
                        </div>
                        
                       <div className="line1-content"> 
                             {line1head1} 
                        <p> {line1text1}</p>
                        </div>

                          
                    
                   
                       <div className="line1-content"> 
                        <h2>   {line1head3} </h2>

                        <p> {line1text3}</p>
                        </div>

                       
                 
                 
                   </div> 
                 
                 
                 
               {/* LİNE 2 */}
                   <div className="dropdown-line1">
                    
                     <div className="line1-content"> 
                          {line2head1}  

                        <p> {line2text1}</p>
                     </div>

                     <div className="line1-content"> 
                        <Link style={{textDecoration:'none'}} to="/statistics"><h2>  {line2head2}   </h2></Link>
                        <p> {line2text2} </p>
                     </div>

                     <div className="line1-content"> 
                        <Link style={{textDecoration:'none'}} to="/resources"><h2> {line2head3} </h2></Link>

                        <p>{line2text3}</p>
                     </div>
                    
                    </div>


             </div>

             <img alt='image'  src={image}  className="dropdown-left"/>


      
    
    
       </div>
            
              

   </div>

  )


 }

 export default NavbarDropdown;