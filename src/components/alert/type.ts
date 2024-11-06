export type AlertProps = {
    title: string;
    message: string;
}

export type ConfirmationReturnArgument = { status: 'confirm' | 'deny' | 'dismiss' };