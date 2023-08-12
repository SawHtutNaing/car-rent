export default function LoadingCarItem() {
  return (
    <div className="flex items-center justify-center sm:flex-row flex-col-reverse bg-darkGray sm:max-h-80 lg:min-h-[17rem]">
      <div className="w-full relative h-full sm:p-6 p-3 sm:text-left text-center">
        <div className="flex h-full flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold relative sm:w-full w-max mx-auto">
              <div className="animate-pulse w-40 h-6 bg-white bg-opacity-70"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.4rem)] sm:w-full w-[calc(100%-1rem)] h-[2px] bg-primary"></div>
            </h3>
            <ul className="sm:grid grid-cols-2 gap-4 mt-6 text-base flex items-center justify-around">
              <li className="animate-pulse w-16 h-6 bg-white bg-opacity-70"></li>
              <li className="animate-pulse w-16 h-6 bg-white bg-opacity-70"></li>
              <li className="animate-pulse w-28 h-6 bg-white bg-opacity-70"></li>
              <li className="animate-pulse w-20 h-6 bg-white bg-opacity-70"></li>
            </ul>
            <p className="mt-4 animate-pulse w-36 h-6 bg-white bg-opacity-70"></p>
          </div>
          <div>
            <div className="mt-4 animate-pulse w-36 h-6 bg-white bg-opacity-70"></div>
          </div>
          <div className="w-full h-10 bg-primary animate-pulse mt-4"></div>
        </div>
      </div>
      <div className="w-full h-full flex items-center animate-pulse duration-700 bg-primary">
        <div className="w-full max-w-[18rem]"></div>
      </div>
    </div>
  );
}
