interface ModalProps {
    children: React.ReactNode;
    title: string;
    closeHandler: React.MouseEventHandler<HTMLDivElement>;
    loadingOverlay?: React.ReactNode;
}

export function Modal({
    children,
    title,
    closeHandler,
    loadingOverlay = null,
}: ModalProps) {
    return (
        <div className="absolute top-0 h-full w-full z-10">
            <div className="min-h-full blur w-full bg-gray-800 bg-opacity-60" />
            <div className="fixed top-1/4 w-full mx-auto">
                <div className="relative bg-gray-100 bg-opacity-90 rounded-md max-w-md mx-auto shadow-md overflow-hidden">
                    {loadingOverlay}
                    <div className="relative py-3 mx-6 grid grid-cols-3 grid-rows-1 h-20 justify-items-center">
                        <div className="text-center text-3xl col-start-2 whitespace-nowrap">
                            {title}
                        </div>
                        <div className="ml-auto">
                            <div
                                className="w-9 h-9 hover:bg-gray-400 hover:shadow-md active:shadow-inner-md p-2 rounded cursor-pointer"
                                onClick={closeHandler}
                            >
                                <svg
                                    viewBox="0 0 329.26933 329"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
