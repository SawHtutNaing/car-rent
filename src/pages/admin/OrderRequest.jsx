import React from 'react'


import { MdDownloadDone, MdPending } from 'react-icons/md'

const OrderRequest = () => {
    const is_done = true;
    return (
        <div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left  ">
                    <thead className="text-xs  uppercase  text-primary">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Car
                            </th>
                            <th scope="col" className="px-6 py-3">
                                From
                            </th>
                            <th scope="col" className="px-6 py-3">
                                To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Satus
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=" border-b bg-accent  border-gray-700 hover:bg-darkGray">

                            <th className="px-6 py-4">


                                #089898989
                            </th>
                            <td className="px-6 py-4">
                                Ko Ko
                            </td>
                            <td className="px-6 py-4">
                                Mini Bus
                            </td>
                            <td className="px-6 py-4">
                                Yangon
                            </td>
                            <td className='   x-6 py-4 '>
                                Hlaing Thar Yrr
                            </td>
                            <td className='   x-6 py-4 '>
                                17/6/2023
                            </td>
                            <td className='    x-6 py-4 '>

                                {
                                    is_done ? (<div className='flex gap-x-5 '>
                                        <MdDownloadDone></MdDownloadDone>
                                        Done

                                    </div>
                                    ) : (
                                        <div className=' flex gap-x-5  '>
                                            <MdPending></MdPending>
                                            is_pending

                                        </div>
                                    )
                                }

                                {/* */}
                            </td>
                        </tr>




                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default OrderRequest 