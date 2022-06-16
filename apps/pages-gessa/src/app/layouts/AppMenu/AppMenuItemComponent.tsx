import { ListItem } from "@mui/material";
import React, { forwardRef } from "react";
import { Link, NavLink } from "react-router-dom";

interface Props{
  className?: string,
  onClick: () => void,
  link: string | undefined,
  children: React.ReactNode
}

function AppMenuItemComponent(props: Props) {
  const { className, onClick, link, children } = props;
  if (!link || typeof link !== "string") {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    );
  }

  return (
    <ListItem
      button
      className={className}
      children={children}
      component={Link}
      // component={forwardRef((props, ref) => (
      //   <NavLink exact {...props} innerRef={ref} />
      // ))}
      to={link}
    />
  );
}

export default AppMenuItemComponent;
