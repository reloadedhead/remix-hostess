import { Children, Fragment, isValidElement, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Body from "./body";
import Actions from "./actions";
import { Form } from "@remix-run/react";

type FormProps = {
  form: true;
} & ComponentPropsWithoutRef<typeof Form>;

type NonFormProps = {
  form?: false;
  /** TODO: These here should be never. */
} & ComponentPropsWithoutRef<typeof Form>;

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
} & (FormProps | NonFormProps);

export default function Modal({
  open,
  onClose,
  title,
  children,
  form,
  ...rest
}: Props) {
  const cancelButtonRef = useRef(null);

  const body = Children.toArray(children)
    .filter(isValidElement)
    .filter((body) => body.type === Body);

  const actions = Children.toArray(children)
    .filter(isValidElement)
    .filter((body) => body.type === Actions);

  const Container = form ? Form : Fragment;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <Container {...rest}>
                  <div className="bg-white px-4 pt-5 pb-4 dark:bg-slate-800 dark:text-slate-400 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-400"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">{body}</div>
                    </div>
                  </div>
                  {actions}
                </Container>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Modal.Body = Body;
Modal.Actions = Actions;
