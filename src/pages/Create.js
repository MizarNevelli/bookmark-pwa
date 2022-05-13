import React, { Fragment, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { API_TOKEN, BOOKMARK_EMPTY_BODY, toBase64 } from "../constants";
import { createBookmark } from "../fetch/bookmarks";
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useAlert } from "react-alert";

function Create() {
    const [bookmarkBody, setBookMarkBody] = useState(BOOKMARK_EMPTY_BODY);
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const alert = useAlert();
    const ref = useRef();

    const onCreateBookmark = async () => {
        if (bookmarkBody.image === '' || bookmarkBody.link === '' || bookmarkBody.name === '') {
            setOpen(true);
            return;
        }
        try {
            await createBookmark(API_TOKEN, bookmarkBody);
            alert.success("Successfuly Inserted!");
            // RESET Form values
            setBookMarkBody(BOOKMARK_EMPTY_BODY);
            ref.current.value = "";
        } catch (err) {
            alert.error("ERROR! Try again");
            throw err
        }
    };

    return (
        <>
            <NavBar />
            <div
                style={{ height: 'calc(100vh - 4rem)', overflow: 'scroll' }}
                className="w-100 flex flex-col pt-20 items-center p-2 bg-gray-200"
            >
                <h2 className="text-2xl font-extrabold tracking-tight text-indigo-700 mb-4">Create a Bookmark</h2>
                <form 
                    // style={{ width: '-webkit-fill-available' }} 
                    className="w-80 sm:w-96"
                >
                    <div className="my-4">
                        <label htmlFor="formFile" className="form-label inline-block mb-2 text-indigo-700">Name</label>
                        <input
                            type="text"
                            name="bookmarkName"
                            id="bookmarkName"
                            value={bookmarkBody.name}
                            className="font-normal h-8 text-indigo-700 px-2 shadow-sm focus:ring-indigo-500 
                            focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
                            placeholder="Insert your name"
                            onChange={(e) => {
                                setBookMarkBody({
                                    ...bookmarkBody,
                                    name: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="formFile" className="form-label inline-block mb-2 text-indigo-700">Insert Link to Website</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-indigo-700 sm:text-sm">
                                https://
                            </span>
                            <input
                                type="text"
                                name="company-website"
                                value={bookmarkBody.link}
                                id="company-website"
                                className=" border-gray-300 h-8 flex-1  min-w-0 block w-full px-3 py-2 rounded-none 
                                rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                placeholder="www.example.com"
                                onChange={(e) => {
                                    setBookMarkBody({
                                        ...bookmarkBody,
                                        link: `${e.target.value}`,
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className=" my-4 flex justify-center">
                        <div className="mb-3 w-96 ">
                            <label htmlFor="formFile" className="form-label inline-block mb-2 text-indigo-700">Upload Image</label>
                            <input
                                className="border-indigo-500 font-normal text-indigo-700 px-2 shadow-sm focus:ring-indigo-500
                                focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
                                type="file"
                                // id="formFile"
                                // value={bookmarkBody?.image}
                                ref={ref}
                                onChange={async (e) => {
                                    const imgBase64 = await toBase64(e.target.files[0]);
                                    setBookMarkBody({
                                        ...bookmarkBody,
                                        image: imgBase64,
                                    })
                                }}
                            />
                            <p className="mt-1 text-xs text-indigo-400">
                                Insert a file .jpeg .jpg or .png 
                            </p>
                        </div>
                    </div>

                    <div className="text-center w-full mt-8">
                        <button
                            type="button"
                            className="m-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                             text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => onCreateBookmark()}
                        >
                            Create Bookmark
                        </button>
                    </div>
                </form>
                {/* MODAL INSERT ALL FIELDS */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>
                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Attention
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                   In order to create a Bookmark, you MUST insert all the fields
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 sm:mt-4 sm:flex sm:flex-row">
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Ok, I understand
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </>);
}

export default Create;
