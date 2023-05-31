import { useEffect, useState } from "react";
import Button from "../components/Button";
import Select from "../components/Select";
import axios from 'axios';
import User from "../interfaces/user";
import Option from "../interfaces/option";
import Log from "../interfaces/log";
import Moment from 'moment';


export default function Notification() {
    const [usersOptions, setUsersOptions] = useState<Option[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [categories, setCategories] = useState<Option[]>([]);
    const [channels, setChannels] = useState<Option[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);

    const [message, setMessage] = useState('');
    const [userSelected, setUserSelected] = useState('');
    const [categorySelected, setCategorySelected] = useState('');
    const [channelSelected, setChannelSelected] = useState('');
    
    useEffect( () => {
        async function fetchData() {
            try {
                const {data} = await axios.get('http://localhost:3000/users');
                setUsers(data);
                setUsersOptions(data.map((user: User) => {
                    return {
                        name: user.firstName +" "+ user.lastName,
                        value: user.id 
                    }
                }))
            } catch {}
        }
        fetchData();
    }, []);

    const onChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const valor = event.target.value;
        setUserSelected(valor);

        if(users){           
            const user = users.find((user: User) => {
                return user.id === valor
            })
    
            if(user && user.subscribed){                
                const subscribedOptions = user.subscribed.map( (s: any) => {
                    return {
                        name: s.name,
                        value: s.id
                    }
                })
                
                const channelOptions = user.channels.map( (s: any) => {
                    return {
                        name: s.name,
                        value: s.id
                    }
                })


                setCategories(subscribedOptions);
                setChannels(channelOptions);
                getLogs();
            }
        }
    };

    const onChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const valor = event.target.value;
        setCategorySelected(valor);
    }

    const onChangeChannel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const valor = event.target.value;
        setChannelSelected(valor);
    }

    const getLogs = async () => {
        try {
            const result  = await fetch(
                'http://localhost:3000/logs/'+ userSelected,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET'
                }
            );

            const data = await result.json();
            setLogs(data);

            console.log("🚀 ~ file: Notification.tsx:120 ~ getLogs ~ data:", data);
        } catch (e) {
            console.log("🚀 ~ file: Notification.tsx:80 ~ submit ~ e:", e)
        }
            
    }

    const submit = async () => {
        try {
            const result  = await fetch(
                'http://localhost:3000/logs',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({
                        user: userSelected,
                        message: message,
                        category: categorySelected,
                        channel: channelSelected
                    })
                }
            );
    
            getLogs();
        } catch (e) {
            console.log("🚀 ~ file: Notification.tsx:80 ~ submit ~ e:", e)
        }
    }

    const getMessage = (e: any) => {
        setMessage(e.target.value);
    };

    return (
        <div className="mx-10">
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Send notification</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be send to user.
                        </p>

                        <div className="mt-10 grid grid-cols-3">
                            <div>
                                <Select 
                                    id="cmbUsers" 
                                    options={usersOptions} 
                                    label="Users" 
                                    value={userSelected}
                                    name="cmbUsers" 
                                    onChange={onChangeUser}
                                />
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-3">
                            <div>
                                <Select 
                                    id="cmbChannels" 
                                    options={channels} 
                                    value={channelSelected} 
                                    label="Channels" 
                                    name="cmbChannels"
                                    onChange={onChangeChannel}    
                                />
                            </div>
                            <div className="ml-6">
                                <Select 
                                    id="cmbCategories"
                                    options={categories} 
                                    value={categorySelected} 
                                    label="Categories" 
                                    name="cmbChategories"
                                    onChange={onChangeCategory}
                                />
                            </div>
                        </div>

                        <div className="mt-10 text-left">
                            <label className="block text-sm font-semibold leading-6 text-gray-900"> Message </label>
                            <textarea 
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                onChange={getMessage}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button label="Send" type="button" onClick={submit}/>
                </div> 
            </form>

            <div className="mt-10">
                <h2 className="text-base font-semibold leading-7 text-gray-900">User History</h2>
                { 
                    logs && 
                    <table className="mt-10 min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                                <th className="px-6 py-4"> Category </th>
                                <th className="px-6 py-4"> Channel </th>
                                <th className="px-6 py-4"> Message </th>
                                <th className="px-6 py-4"> Created At </th>
                            </tr>
                        </thead>
                    <tbody>
                    {logs.map(({ message, category, channel, createdAt, user}, index) => {
                        const dateFormated = Intl.DateTimeFormat('en-US').format(new Date(createdAt));
                        return (
                            <tr key={"log_" + index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                <td className="px-6 py-4">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4">
                                    {channel.name}
                                </td>
                                <td className="px-6 py-4">
                                    {message}
                                </td>
                                <td className="px-6 py-4">
                                    {dateFormated}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                }
            </div>


        </div>
    )
}