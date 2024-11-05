import {ToastProps} from "./types";

export default function SimpleToast({type, message, title}: ToastProps) {
    const classes = ['p-4 mb-4 w-max-xs text-sm rounded-lg border'];
    let messageTitle = title;

    switch (type) {
        case "info":
            classes.push('text-blue-800 bg-blue-50 border-blue-300');
            if (!title) messageTitle = 'Info'
            break;
        case "success":
            classes.push('text-green-800 bg-green-50 border-green-300');
            if (!title) messageTitle = 'Success'
            break;
        case "warning":
            classes.push('text-yellow-800 bg-yellow-50 border-yellow-300');
            if (!title) messageTitle = 'Warning'
            break;
        case "error":
            classes.push('text-red-800 bg-red-50 border-red-300');
            if (!title) messageTitle = 'Error'
            break;
    }

    return (
        <div className={classes.join(' ').trim()}
             role="alert">
            <span className="font-bold">{messageTitle},</span> {message}
            <button type="button"
                    className="ms-auto ml-1.5 items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                    data-dismiss-target="#toast-interactive" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    )
}