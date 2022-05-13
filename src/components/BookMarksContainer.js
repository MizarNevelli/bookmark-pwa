import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import React, { Fragment, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { API_TOKEN } from "../constants";
import { deleteBookmark, getBookmarks } from "../fetch/bookmarks";
import UpdateBookmarkModal from "./UpdateBookmarkModal";

function BookMarksContainer({ bookMarksList = [], setBookMarksList = {} }) {

    const alert = useAlert();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [elementToUpdate, setElementToUpdate] = useState({});
    const cancelButtonRef = useRef(null);
    const [deleteId, setDeleteId] = useState('');

    const onDeleteElement = async (id) => {
        try {
            await deleteBookmark(API_TOKEN, id);
            alert.success('Element deleted successfully!');
            const updatedItems = await getBookmarks(API_TOKEN);
            setBookMarksList(updatedItems);
        } catch (err) {
            alert.error('Error, Try again')
            throw err
        }
    };

    return (
        <div >
            <div className="mx-auto py-4 px-16 sm:px-4 ">
                <h2 className="py-8 text-2xl font-extrabold tracking-tight text-indigo-700 text-center w-full">Your Bookmarks</h2>
                {!bookMarksList &&
                    <div
                        className="mt-48 w-100 h-64 flex justify-center items-center "
                    >
                        <span>No Bookmark to show</span>
                    </div>
                }
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    
                {bookMarksList && bookMarksList.map((element,i) => (
                    <div key={i} style={{ backgroundColor: '#DCB6FF' }} className="max-w-sm bg-white rounded-lg border border-indigo-700 shadow-md dark:border-indigo-700">
                        <div
                                style={{ backgroundImage: `url(${element.image_url})` }}
                                className={`relative bg-no-repeat bg-center bg-cover w-full h-64 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none`}
                        >
                            <div
                                data-modal-toggle="popup-modal"
                                className=" absolute flex justify-center items-center right-2 top-2 bg-white bg-opacity-60 border-black border-1 cursor-pointer border-solid w-8 h-8 rounded-full"
                                onClick={() => {
                                    setOpenModalDelete(true);
                                    setDeleteId(element.id)
                                }}
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div
                                data-modal-toggle="popup-modal"
                                className=" absolute flex justify-center items-center left-2 top-2 bg-white bg-opacity-60 border-black border-1 cursor-pointer border-solid w-8 h-8 rounded-full"
                                onClick={() => {
                                    setOpenModalUpdate(true);
                                    setElementToUpdate(element);
                                }}
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="p-5 rounded-md">
                            <div>
                                <h5 className="mb-2 text-indigo-700 text-2xl font-bold tracking-tight">{element.name}</h5>
                            </div>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ }</p>
                            
                            <button
                                type="button"
                                className="m-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                                        text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <a href={'https://' + element.link} target='_blank' rel="noreferrer">
                                    <p>Open link </p>
                                </a>
                            </button>
                        </div>
                    </div>
                ))}
                </div>
                {/* MODAL UPDATE */}
                {openModalUpdate &&
                    <UpdateBookmarkModal
                        setOpenModalUpdate={setOpenModalUpdate}
                        elementToUpdate={elementToUpdate}
                        setBookMarksList={setBookMarksList}
                    />}
                {/* MODAL DELETE */}
                <Transition.Root show={openModalDelete} as={Fragment}>
                    <Dialog as="div" className="fixed z-1000 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpenModalDelete}>
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
                                                Attention!
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure to delete the element?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpenModalDelete(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                onDeleteElement(deleteId)
                                                setOpenModalDelete(!openModalDelete)
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            OK, Delete
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    );
}

export default BookMarksContainer;
