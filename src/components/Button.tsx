interface buttonProps {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

export default function Button(props: buttonProps) {
    const {label, type, onClick, children, className} = props;
    
    return (
        <>
            <button
                type={type}
                className={ className ?? 'capitalize rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}
                onClick={onClick}
            >
                { children ?? label} 
            </button>
        </>
    );
}