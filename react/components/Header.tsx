import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logout from "./Logout";

// const navigation = [
//   { name: "Daily", href: "#", current: true },
//   { name: "Monthly", href: "#", current: false },
//   { name: "Yearly", href: "#", current: false },
// ];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Header({ onClick }: Props) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16">
              <div className="flex flex-1 justify-center sm:items-stretch sm:justify-center">
                <div className="flex flex-shrink-0 items-center">
                  <h1 id="headerTitle">EXPENSE TRACKER</h1>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-right absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Logout onClick={onClick} />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
