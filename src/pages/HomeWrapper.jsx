import HomeDefault from "./Home";
import HomeLogin from "./HomePage";
import { useSelector } from "react-redux";

const HomeWrapper = () => {
    const isUserLogLocal = localStorage.getItem("authToken") != null;
    const isMobile = window.innerWidth <= 500;
    const isHomeLogin = (!isUserLogLocal && !isMobile);
    console.log(isHomeLogin, isMobile, isUserLogLocal);
    return (
        <>
            {isUserLogLocal ? <HomeLogin /> : <HomeDefault />} 
        </>
    );
}


export default HomeWrapper;
