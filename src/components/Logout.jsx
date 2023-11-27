import { GoogleLogout } from "react-google-login";



function Logout(){
    const onSuccess = () =>{
        console.log("logout successful!")

    }
    return(
        <div id="signOutButton">

        <GoogleLogout
            clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
            buttonText={"Logout"}
            onLogoutSuccess= {onSuccess}
        />

        </div>
    )
}

export default Logout;