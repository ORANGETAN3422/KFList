import React, { useImperativeHandle, forwardRef, useState } from "react";
import './header.css';

const Header = forwardRef(({ currentList }, ref) => {
  const [titleText, setTitleText] = useState("Karma Farm List");

  function animateTitleChange() {
    const underlineDeco = document.querySelector('.underline-deco');
    const icon = document.querySelector('.icon');

    const widthStyles = { collapsed: "0", open: "330px" };
    const colorStyles = { collapsed: "rgba(255, 255, 255, 0)", open: "rgba(255, 255, 255, 1)" };

    underlineDeco.style.width = widthStyles.collapsed;
    underlineDeco.style.color = colorStyles.collapsed;

    icon.classList.add('spin');

    setTimeout(() => {
      setTitleText(currentList === "platformer" ? "Karma Farm List" : "Platformer List");
      underlineDeco.style.width = widthStyles.open;
      underlineDeco.style.color = colorStyles.open;
    }, 600);

    setTimeout(() => {
      icon.classList.remove('spin');
    }, 1200);
  }

  useImperativeHandle(ref, () => ({
    animateTitleChange,
  }));

  return (
    <header>
      <img
        src={`${import.meta.env.BASE_URL}gd-reddit-icon.png`}
        className="icon"
        alt="icon"
      />
      <div className="underline-deco">
        <h1>{titleText}</h1>
      </div>
    </header>
  );
});

export default Header;
