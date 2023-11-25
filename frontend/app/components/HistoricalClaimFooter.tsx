const HistoricalClaimFooter = () => {

    return (
      <div className="text-black bg-gray-50 w-[90%] mx-auto h-[2vh] pt-12 flex justify-around items-center">
        <div className="flex justify-between">
          <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
            <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                1
              </span>
              <span>
                <h3 className="font-medium leading-tight">User info</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>
            <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
              <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                2
              </span>
              <span>
                <h3 className="font-medium leading-tight">Company info</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>
            <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
              <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                3
              </span>
              <span>
                <h3 className="font-medium leading-tight">Payment info</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>
          </ol>
        </div>
      </div>
    );
}
