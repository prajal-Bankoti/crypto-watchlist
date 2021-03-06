import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./stock.css";

export default function Login() {
  const user = localStorage.getItem("auth");
  if (user) {
    window.location.href = "/home";
  }
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        console.log(user);
        const { displayName, photoURL, uid } = user;
        const set = {
          userName: displayName,
          profilePic: photoURL,
          uid: uid,
        };
        localStorage.setItem("auth", JSON.stringify(set));
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log("Err: ", error);
      });
  };
  return (
    <div className="login-page">
      <div></div>
      <div onClick={signIn} className="login">
        Google Login
      </div>
    </div>
  );
}
