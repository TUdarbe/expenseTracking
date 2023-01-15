import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
