"use client";
import { useState } from "react";
import { navLinksLeft, navLinksRight } from "../assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 lg:px-12 xl:px-32 py-6 border-b border-gray-300 bg-white transition-all">
      {/* Logo Section  */}
      <div>
        <a href="/">
          <Image
            src="/icons/practo_logo.svg"
            alt="Practo Logo"
            width={110}
            height={28}
          />
        </a>
      </div>

      {/* Central section */}
      <div className="hidden sm:flex items-center justify-between flex-grow mx-8">
        {/* Desktop Left Nav Links */}
        <div className="hidden lg:flex items-center gap-4 font-medium text-[16px] px-4">
          {navLinksLeft.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`
                text-gray-700 hover:text-blue-400 transition
                ${pathName === link.href ? "border-b-3 border-blue-400" : ""}
              `}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Right Nav Links */}
        <div className="flex items-center gap-4">
          {navLinksRight.map((link) =>
            link.children ? (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="text-gray-700 text-sm hover:text-blue-500 transition cursor-pointer flex items-center gap-1"
                >
                  {link.name}
                  {/* Dropdown arrow icon*/}

                  <ChevronDown className="w-4 transform group-hover:rotate-180 transition-transform" />
                </a>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-10">
                  {link.children.map((childLink) => (
                    <a
                      key={childLink.name}
                      href={childLink.href}
                      className="block px-8 py-4 text-gray-700 text-[14px] hover:bg-gray-100 transition"
                    >
                      {childLink.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-300 transition"
              >
                {link.name}
              </a>
            )
          )}
        </div>
      </div>

      {/* Sign Up CTA  */}
      <button className=" cursor-pointer px-2 py-1 border border-neutral-400 hover:text-blue-500 hover:border-blue-500 transition text-neutral-400 rounded-sm text-xs font-bold block">
        Login/ Sign Up
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-y-2 px-5 text-sm md:hidden`}
      >
        {[...navLinksLeft, ...navLinksRight]
          .flatMap((link) => {
            if (link.children) {
              return [{ name: link.name, href: link.href }, ...link.children];
            }
            return link;
          })
          .map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-1 text-gray-700 hover:text-blue-500 transition"
            >
              {link.name}
            </a>
          ))}
        {/* <button className="cursor-pointer px-6 py-2 mt-2 border border-neutral-900 hover:text-blue-500 hover:border-blue-500 transition text-neutral-900 rounded-sm text-sm">
          Sign Up
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
