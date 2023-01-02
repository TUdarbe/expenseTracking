import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Daily", href: "/", current: true },
  { name: "Monthly", href: "/monthly", current: false },
  { name: "Yearly", href: "/yearly", current: false },
];

function SignIn() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="App">
        <div id="redirectContainer">
          <Button id="signInButton" onClick={handleClick} variant="link">
            Sign-In
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
