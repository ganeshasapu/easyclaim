import Link from "next/link";

const top_space = {
    padding: 10,
    width: 85,
    height: 70,
  };

const user = {
    name: "Stacy",
    email: "stacy@mail.securian.com",
    imageUrl:
      "https://i0.wp.com/www.sfnwseries.com/wp-content/uploads/2017/11/team-1-4-person-circle-p2-200-1.png?ssl=1",
};

const InboxNavBar = () => {
    return(
        <div className="flex w-full p-4 items-center border-b border-white">
            <Link href="https://www.securiancanada.ca/?utm_source=google&utm_medium=ps&utm_campaign=brand&utm_content=english&utm_term=securian-canada&gad_source=1">
              <img className="h-8 w-8 rounded-full" src="/Logo.png" alt="Your Company" style={top_space}/>
            </Link>
            <div className="flex w-full items-center justify-evenly p-2 gap-8">
                    <div className="py-2 border rounded w-full px-4 bg-lime-200 text-black text-center font-bold">
                        Inbox
                    </div>
                    <Link className="py-2 border rounded w-full px-4 text-center" href={"/database"}>
                        Database
                    </Link>     
            </div>
          
          <div className="flex">
            <Link href="/">
              <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" style={top_space}/>
            </Link>
          </div>
        </div>
    )
}

export default InboxNavBar;