import React, { FormEvent, ReactNode } from 'react';
import Button from './Button';
interface IProps {
    isOpen: boolean;
    title?: string;
    add?: string;
    btnClass?: string;
    children: ReactNode;
    closeModal: () => void;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void; // Type for form submission
}

function Modal({ isOpen, closeModal, onSubmit, title, btnClass = "success", add, children }: IProps) {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // If the clicked element is the overlay (i.e., not the modal content itself), close the modal
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            {/* Main modal */}
            {isOpen && (
                <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 "
                    onClick={handleOverlayClick}
                >
                    <div className="relative w-full max-w-2xl p-4 max-h-full overflow-auto">
                        {/* Modal content */}
                        <div className="relative bg-slate-100 rounded-lg shadow ">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5">
                                <h3 className="text-lg font-normal text-gray-700 capitalize">
                                    {title}
                                </h3>
                            </div>
                            {/* Form wrapping the modal content */}
                            <form onSubmit={onSubmit}>
                                {/* modal body */}
                                <div className="p-4 md:p-5 border-2 space-y-4">
                                    {children}
                                </div>
                                <div className="flex gap-3 items-start justify-end p-4 md:p-5">
                                    {
                                        add && <Button
                                            type="submit"
                                            className={`capitalize  py-2 px-3 bg-${btnClass}-500 text-white hover:bg-${btnClass}-600`}
                                        >
                                            {add}
                                        </Button>
                                    }

                                    <Button
                                        onClick={closeModal}
                                        className="capitalize border-2 py-2 px-3 bg-gray-500 text-white hover:bg-gray-600"
                                    >
                                        close
                                    </Button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
