import React from "react";

function Header() {

    const options = ["Home", "About us", "Pricing", "Contact"]; 

  return (
    <header className="bg-blue-500">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-white font-bold text-xl">LOGO</div>
        <nav>
          <ul className="flex space-x-4">
            {options.map((title) => (
              <li key={title}>
                <a
                  href="#"
                  className="text-white hover:border-white border-b-2 border-transparent"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
