import Option from "../interfaces/option";

interface selectProps{ 
    options: Option[],
    name: string,
    label: string,
    value?: string,
    placeholder?: string,
    id: string,
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: selectProps){
    const {options, name, label, placeholder, id, value, onChange} = props;
    return (
        <>
            <div className="text-left">
                <label htmlFor={name} className="block text-sm font-semibold leading-6 text-gray-900">
                    {label}
                </label>
                <div className="mt-2">
                    <select
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={value || ''} onChange={onChange}
                    >
                        <option key="-1" value="">-- Select Option -- </option>
                        {options.map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )

}

