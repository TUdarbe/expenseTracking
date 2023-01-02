import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
interface Props {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
function Logout({ onClick }: Props) {
  return (
    <>
      <span onClick={onClick}>
        <FontAwesomeIcon
          inverse
          className="fa-2x fa-solid"
          icon={faRightFromBracket}
        />
      </span>
    </>
  );
}

export default Logout;
