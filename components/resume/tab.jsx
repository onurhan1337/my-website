import React, { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CompaniesList from "./companiesList";
import CoursesList from "./coursesList";
import { Listbox, Transition } from "@headlessui/react";
import IconArrowUpDown from "../icons/arrow-up-down";

const tabs = [
  { name: "Experience", component: <CompaniesList /> },
  { name: "Courses", component: <CoursesList /> },
];

// this is the function that will be used to filter out the current tab
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ResumeTab = () => {
  const [currentTab, setCurrentTab] = React.useState(tabs[0].name);

  const handleTabChange = tabName => {
    setCurrentTab(tabName);
  };

  const isTabActive = tabName => {
    return currentTab === tabName;
  };

  return (
    <div>
      <div className="sm:hidden">
        <Listbox value={currentTab} onChange={handleTabChange}>
          {({ open }) => (
            <>
              <Listbox.Label htmlFor="tabs" className="sr-only">
                Select a tab
              </Listbox.Label>
              <div className="relative mt-1 ">
                <Listbox.Button
                  onClick={() => handleTabChange(currentTab)}
                  className="relative w-full cursor-default rounded-lg bg-[#EDFEE7] py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span className="block truncate">{currentTab}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <IconArrowUpDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {tabs.map(tab => (
                      <Listbox.Option
                        className={() =>
                          classNames(
                            isTabActive(tab.name)
                              ? "text-black bg-gray-50"
                              : "text-gray-900",
                            "cursor-default select-none rounded-lg  relative py-2 pl-10 pr-4"
                          )
                        }
                        key={tab.name}
                        value={tab.name}
                      >
                        {tab.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      {/* big screens */}
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              onClick={() => handleTabChange(tab.name)}
              className={classNames(
                isTabActive(tab.name)
                  ? "text-black bg-[#EDFEE7] dark:bg-white"
                  : "text-gray-500 bg-[#f8f9fa] dark:bg-[#050505]",
                tabIdx === 0 ? "rounded-r-none" : "",
                tabIdx === tabs.length - 1 ? "rounded-l-none" : "",
                "group rounded-lg relative min-w-0 flex-1 overflow-hidden p-4 text-center text-sm font-medium focus:z-10"
              )}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
      <AnimatePresence>
        <motion.div
          key={currentTab}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabs.map((tab, index) => {
            if (tab.name === currentTab) {
              return tab.component;
            }

            return null;
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ResumeTab;
