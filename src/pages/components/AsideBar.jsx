function AsideBar({ children }) {
  return (
    <div
      className={`relative h-screen overflow-y-auto overflow-x-hidden border-r-1 border-gray-200 duration-300 pt-16 w-[300px]`}
    >
      {/* <MenuIcon
        size={24}
        className="cursor-pointer absolute top-2 right-2"
      /> */}
      <div>{children}</div>
    </div>
  );
}

export default AsideBar;
