import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, useLocation } from 'react-router-dom'

function NavBar() {

    const navigation = [
        { name: 'Create Bookmark', href: '/create-bookmark', current: false },
        { name: 'Home', href: '/', current: false },
    ]
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState('');


    useEffect(() => {
        setCurrentPath(location.pathname)
    }, [location.pathname])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="bg-indigo-700 ">
            {({ open }) => (
                <>
                    <div className="w-full flex justify-between sm:px-6 px-4 ">
                        <div className="relative w-full flex items-center justify-between h-16">
                            <div className=" inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center mr-8">
                                    <img
                                        className="h-8 w-auto hidden sm:block"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    />
                                    <span className='text-xl text-gray-300 px-3 py-2 rounded-md text-xl font-xl'>
                                        Bookmark App
                                    </span>
                                </div>
                                <div className="flex justify-center items-center hidden sm:flex">
                                    <div className="flex space-x-4">
                                        {navigation.map((item, i) => (
                                            <Link
                                                to={item.href}
                                                key={item.name}
                                            >
                                                <span
                                                    className={classNames(
                                                        currentPath === item.href ? 'border-2 border-white text-gray-300' : 'text-gray-300 hover:bg-indigo-500 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={currentPath === item.href ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                    <span className={'block px-4 py-2 text-sm text-gray-700'}>
                                                        Your Profile
                                                    </span>
                                            </Menu.Item>
                                            <Menu.Item>
                                                    <span className={'block px-4 py-2 text-sm text-gray-700'}>
                                                        Settings
                                                    </span>
                                            </Menu.Item>
                                            <Menu.Item>
                                                    <span className={'block px-4 py-2 text-sm text-gray-700'}>
                                                        Sign out
                                                    </span>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default NavBar;
