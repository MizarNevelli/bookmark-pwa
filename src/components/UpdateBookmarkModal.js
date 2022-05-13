
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { API_TOKEN, toBase64 } from "../constants";
import { getBookmarks, updateBookmark } from "../fetch/bookmarks";

function UpdateBookmarkModal({ elementToUpdate = {}, setOpenModalUpdate = {}, setBookMarksList = {} }) {

    const alert = useAlert();
    const [bookmarkBody, setBookMarkBody] = useState(elementToUpdate);

    const onUpdateElement = async () => {
        // Validation: error if all fields remain the same
        if (bookmarkBody.link === elementToUpdate.link && 
            bookmarkBody.name === elementToUpdate.name && 
            (document?.querySelector('#formFile').value === '' ||
            document?.querySelector('#formFile').value === null ))
        {
            alert.error('Update at least one field')
            return;
        }
        try {
            await updateBookmark(API_TOKEN, bookmarkBody);
            alert.success('Element Updated Successfully!');
            const updatedItems = await getBookmarks(API_TOKEN);
            setBookMarksList(updatedItems);
            setOpenModalUpdate(false);
        } catch (err) {
            alert.error('Error, Try again')
            throw err
        }
    };

    return (
        <>
            {/* <!-- Main modal --> */}
            <div className="flex overflow-hidden h-screen w-screen p-4 lg:p-48 fixed right-0 left-0 top-0 z-50 justify-center items-center">
                <div className="relative m-4 flex items-center justify-center w-full max-w-2xl h-full">
                    <div className="relative px-6 rounded-lg shadow" style={{ backgroundColor:'#F5F5F5'}}>
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-xl text-gray-600 lg:text-2xl ">
                                Update Bookmark
                            </h3>
                            <button
                                type="button"
                                onClick={() => { setOpenModalUpdate(false) }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="defaultModal"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="flex flex-col justify-center items-center p-8">
                            <form >
                                <div className="my-4 w-full">
                                    <label htmlFor="formFile" className="text-gray-600 form-label inline-block mb-2 ">Name</label>
                                    <input
                                        type="text"
                                        name="bookmarkName"
                                        defaultValue={elementToUpdate.name}
                                        className="font-normal h-8 text-gray-600 px-2 shadow-sm focus:ring-indigo-500 
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
                                <div className=" my-4 w-full">
                                    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600 ">Insert Link to Website</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <span className="text-gray-600 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50  sm:text-sm">
                                            https://
                                        </span>
                                        <input
                                            type="text"
                                            name="company-website"
                                            defaultValue={elementToUpdate.link}
                                            id="company-website"
                                            className=" text-gray-600 border-gray-300 h-8 flex-1 block w-full px-3 py-2 rounded-none 
                                            rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                            placeholder="www.example.com"
                                            onChange={(e) => {
                                                setBookMarkBody({
                                                    ...bookmarkBody,
                                                    link: `https://${e.target.value}`,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="my-4 w-full">
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Upload Image</label>
                                        <input
                                            className=" text-gray-600 border-indigo-500 font-normal  px-2 shadow-sm focus:ring-indigo-500
                                            focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
                                            type="file"
                                            id="formFile"
                                            onChange={async (e) => {
                                                const imgBase64 = await toBase64(e.target.files[0]);
                                                setBookMarkBody({
                                                    ...bookmarkBody,
                                                    image: imgBase64,
                                                })
                                            }}
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                            Insert a file .jpeg .jpg or .png
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <div className="w-full flex justify-between">
                                <button
                                    type="button"
                                    className="m-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                                        text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={onUpdateElement}
                                >
                                    Update Bookmark
                                </button>
                                <button
                                    type="button"
                                    className="m-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                                        text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={()=>{setOpenModalUpdate(false)}}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default UpdateBookmarkModal;
