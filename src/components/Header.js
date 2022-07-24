import React from "react";
import { Link } from "gatsby";

const Header = ({
  underline = true,
  headerText,
  headLevel = 2,
  linkURL = false,
  linkText,
}) => {
  const headerClass = underline ? "flex underline" : "flex";

  return (
    <header className={headerClass}>
      {headLevel === 1 && <h1>{headerText}</h1>}
      {headLevel === 2 && <h2>{headerText}</h2>}
      {headLevel === 3 && <h3>{headerText}</h3>}
      {linkURL && <Link to={linkURL}>{linkText}</Link>}
    </header>
  );
};

export default Header;
