import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Channel from "../interfaces/channels";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Channels() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [name, setName] = useState('');


    async function fetchData() {
        try {
            const {data} = await axios.get('http://localhost:3000/channels');
            setChannels(data);
        } catch {}
    }


    useEffect( () => {
        fetchData();
    }, []);

    const submit = async () => {
        try {
            const result  = await fetch(
                'http://localhost:3000/channels',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                    })
                }
            );
    
            fetchData();
            setName('')
        } catch (e) {
            console.log("🚀 ~ file: Notification.tsx:80 ~ submit ~ e:", e)
        }
    }

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    async function deleteCategory(id: string) {
        try {
            const result  = fetch(
                'http://localhost:3000/channels/' + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'DELETE',
                }
            );

            console.log("🚀 ~ file: Categories.tsx:55 ~ onDelete ~ result:", result)
    
            fetchData();
            setName('')
        } catch (e) {
            console.log("🚀 ~ file: Notification.tsx:80 ~ submit ~ e:", e)
        }
    }

    const onDelete = (id: string) => {
        deleteCategory(id)
    }


    return (
        <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Channels</h2>

            <div className="mt-4">
                { 
                    channels && 
                    <table className="mt-10 min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                                <th className="px-6 py-4"> # </th>
                                <th className="px-6 py-4"> Name </th>
                                <th className="px-6 py-4">  </th>
                            </tr>
                        </thead>
                    <tbody>
                    {channels.map(({ id, name }, index) => {
                        return (
                            <tr key={"cat_" + index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                <td className="px-6 py-4">
                                    {id}
                                </td>
                                <td className="px-6 py-4">
                                    {name}
                                </td>
                                <td>
                                    <Button 
                                        type="button" 
                                        label="" 
                                        className="text-center"
                                        onClick={ () => onDelete(id)}>
                                        <TrashIcon className="ml-4 h-6 w-6 text-red-500" />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                }
            </div>


            <div className="mt-8">
                <form>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Add Channel</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Add new channels.
                            </p>

                            <div className="mt-10 grid grid-cols-3">
                                <div>
                                    <TextField
                                        value={name}
                                        label="Name"
                                        onChange={onChangeName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button label="Send" type="button" onClick={submit}/>
                    </div> 
                </form>
            </div>
        </div>
    )
}