import React from "react";
import { Link } from "react-router-dom";

function ListItem({ path, children }) {
  return (
    <Link
      to={path}
      className="cursor-pointer flex items-center overflow-x-hidden px-5 py-3 duration-300 rounded-lg hover:border-gray-500 border border-transparent mb-5 mx-3 "
    >
      {children}
    </Link>
  );
}

export default ListItem;
