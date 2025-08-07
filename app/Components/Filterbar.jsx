"use client";

import React, { useState, useEffect } from "react";
import { filterbarOptions } from "../assets";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Filterbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState(() => {
    const initialFilters = {};
    searchParams.forEach((value, key) => {
      initialFilters[key] = value;
    });
    return initialFilters;
  });

  useEffect(() => {
    const currentFilters = {};
    searchParams.forEach((value, key) => {
      currentFilters[key] = value;
    });
    setSelectedFilters(currentFilters);
  }, [searchParams]);

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleSelect = (filterName, option) => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    let paramName = filterName.replace(/\s+/g, "");
    paramName = paramName.charAt(0).toLowerCase() + paramName.slice(1);

    if (filterName === "Sort By") {
      paramName = "sortBy";
    }

    if (filterName === "Consult type") {
      paramName = "consultType";
    }

    currentSearchParams.set(paramName, option);

    router.push(`${pathname}?${currentSearchParams.toString()}`);

    setActiveFilter(null);
  };

  const handleResetFilters = () => {
    router.push(pathname);
    setActiveFilter(null);
  };

  const isFilterActive = searchParams.toString().length > 0;

  return (
    <div className="w-full bg-blue-900 py-2 px-4 lg:pl-32">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full lg:w-[70%] gap-2 lg:gap-4 ">
        {filterbarOptions.map((option) => (
          <div key={option.name} className="relative ">
            <button
              onClick={() => toggleFilter(option.name)}
              className="flex items-center group cursor-pointer justify-between w-full px-1 py-[1px] text-[8px] lg:text-sm text-blue-50 bg-blue-50/10"
            >
              {/* Display logic for button text */}
              {option.children
                ? (() => {
                    const activeCount = option.children.reduce(
                      (count, child) => {
                        // Check if any of its children filters are active in the URL
                        let childParamName = child.name.replace(/\s+/g, "");
                        childParamName =
                          childParamName.charAt(0).toLowerCase() +
                          childParamName.slice(1);
                        if (child.name === "Consult type")
                          childParamName = "consultType"; // Specific override

                        return searchParams.has(childParamName)
                          ? count + 1
                          : count;
                      },
                      0
                    );
                    return activeCount > 0
                      ? `${option.name} (${activeCount})`
                      : option.name;
                  })()
                : searchParams.has(
                    option.name.replace(/\s+/g, "").charAt(0).toLowerCase() +
                      option.name.replace(/\s+/g, "").slice(1)
                  )
                ? `${option.name}: ${searchParams.get(
                    option.name.replace(/\s+/g, "").charAt(0).toLowerCase() +
                      option.name.replace(/\s+/g, "").slice(1)
                  )}`
                : option.name}

              <option.icon className="hidden md:flex w-5 stroke-1 transform group-hover:rotate-180 transition ease-in" />
            </button>

            {/* Dropdown menu */}
            {activeFilter === option.name && (
              <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md overflow-hidden z-20 min-w-[200px] border border-gray-200">
                {option.children ? (
                  option.children.map((childFilter) => (
                    <div key={childFilter.name}>
                      <h3 className="px-4 py-2 font-bold text-gray-800 bg-gray-100">
                        {childFilter.name}
                      </h3>
                      {childFilter.options.map((subOption) => (
                        <a
                          key={subOption}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelect(childFilter.name, subOption);
                          }}
                          className={`block px-4 py-2 text-sm transition-colors duration-200
                            ${
                              // Check if this subOption is currently active in the URL
                              searchParams.get(
                                childFilter.name
                                  .replace(/\s+/g, "")
                                  .charAt(0)
                                  .toLowerCase() +
                                  childFilter.name
                                    .replace(/\s+/g, "")
                                    .slice(1) ===
                                  // Special case for 'Consult type'
                                  "consultType"
                                  ? "consultType"
                                  : childFilter.name
                                      .replace(/\s+/g, "")
                                      .charAt(0)
                                      .toLowerCase() +
                                      childFilter.name
                                        .replace(/\s+/g, "")
                                        .slice(1)
                              ) === subOption
                                ? "bg-blue-100 text-blue-900 font-semibold"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          {subOption}
                        </a>
                      ))}
                    </div>
                  ))
                ) : // Render regular options if no children are present
                option.options.length > 0 ? (
                  option.options.map((subOption) => (
                    <a
                      key={subOption}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelect(option.name, subOption);
                      }}
                      className={`block px-4 py-2 text-sm transition-colors duration-200
                          ${
                            // Check if this subOption is currently active in the URL
                            searchParams.get(
                              option.name
                                .replace(/\s+/g, "")
                                .charAt(0)
                                .toLowerCase() +
                                option.name.replace(/\s+/g, "").slice(1)
                            ) === subOption
                              ? "bg-blue-100 text-blue-900 font-semibold"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                    >
                      {subOption}
                    </a>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No options available.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {isFilterActive && (
          <div className="relative w-full">
            <button
              onClick={handleResetFilters}
              className="flex items-center group cursor-pointer justify-center w-full px-1 py-2 text-lg rounded-md lg:text-sm text-white bg-blue-400 hover:bg-blue-300 transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filterbar;
