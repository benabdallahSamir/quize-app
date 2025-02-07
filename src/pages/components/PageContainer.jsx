import React from "react";

function PageContainer({ children }) {
  return <div className="grow min-h-screen flex flex-col bg-gray-100 p-2">{children}</div>;
}

export default PageContainer;
