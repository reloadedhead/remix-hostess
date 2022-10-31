import { cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";
import cn from "classnames";
import { Menu } from "@headlessui/react";
import { Link } from "@remix-run/react";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  to?: string;
};

type ChildProps = {
  active: boolean;
  disabled: boolean;
};

export default function Item({ children, icon, to }: Props) {
  if (isValidElement<ChildProps>(children)) {
    return (
      <Menu.Item>
        {({ active, disabled }) =>
          to ? (
            <Link
              to={to}
              className={cn(
                active && "bg-violet-500",
                "group flex w-full items-center space-x-2 rounded-md px-2 py-2 text-sm font-medium text-white"
              )}
            >
              {icon}
              {cloneElement(children, { active, disabled })}
            </Link>
          ) : (
            <div
              className={cn(
                active && "bg-violet-500",
                "group flex w-full items-center space-x-2 rounded-md px-2 py-2 text-sm font-medium text-white"
              )}
            >
              {icon}
              {cloneElement(children, { active, disabled })}
            </div>
          )
        }
      </Menu.Item>
    );
  } else throw new Error("Children are not a valid React element. Whoops!");
}
