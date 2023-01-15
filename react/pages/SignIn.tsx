import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <div className="App">
        <div id="redirectContainer">
          <Button id="signInButton" onClick={handleRedirect} variant="link">
            Sign-In
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
