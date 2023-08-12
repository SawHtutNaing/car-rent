import React from 'react'

const test = () => {
    return (
        <div
            className=' bg-white h-screen w-screen text-black'

        >



            <div
                className='
                container
                   rounded-lg   bg-balck  
                shadow-2xl  ownBorder   h-96 grid grid-cols-2  mt-10  w-2/4 mx-auto
            '
            >
                <div
                    className=' 
                    w-1/2
                  h-full     flex flex-col justify-center  gap-14 rightBorder
                '
                >

                    <div className="header ">
                        <p
                            className=' text-black font-bold  text-xl text-center '
                        >
                            Car Info
                        </p>
                    </div>
                    <div
                        className='text-xl text-start pl-8   body grid grid-rows-4 gap-4 '
                    >
                        <p
                            className=' text-black '
                        >
                            location - Yangon
                        </p>
                        <p
                            className=' text-black '
                        >
                            ID - 00car04
                        </p>
                        <p
                            className=' text-black '
                        >
                            Return Date - 27-7-2023
                        </p>
                        <p
                            className=' text-black '
                        >
                            User Name - U Mg Mg
                        </p>

                    </div>
                </div>

                <div
                    className=' 
                    w-1/2
                  h-full     flex flex-col justify-center  gap-14 
                '
                >

                    <div className="header ">
                        <p
                            className=' text-black text-xl text-center  font-bold'
                        >
                            Payment Info
                        </p>
                    </div>
                    <div
                        className='text-xl text-start pl-8   body grid grid-rows-4 gap-4 '
                    >
                        <p
                            className=' text-black'
                        >
                            Agent - Kpay
                        </p>
                        <p
                            className=' text-black'
                        >
                            Process Id - #34343434
                        </p>
                        <p
                            className=' text-black'
                        >
                            Status - <span className='  bg-primary p-2 rounded text-black'>

                                Pending
                            </span>
                        </p>
                        <p
                            className=' text-black'
                        >
                            Total Cost - $4444
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default test