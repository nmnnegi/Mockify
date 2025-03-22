import { Link } from "react-router-dom";

export const LogoContainer = () => {
  return (
    <Link to={"/"}>
      <img
        src="/assets/svg/logo.png"
        alt="Mockify Logo"
        className="h-14 w-auto max-w-[200px] object-contain"
      />
    </Link>
  );
};
