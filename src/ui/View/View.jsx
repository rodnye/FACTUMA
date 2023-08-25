
import './View.css';

export default function View ({ show, className, children }) { 
    return (show && 
      <div className={"view " + className}> 
        { children } 
      </div>
    )
}