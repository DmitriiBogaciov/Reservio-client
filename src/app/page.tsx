//Home Page

'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';



import { Fa0 } from "react-icons/fa6";
import { FaBeer, FaWifi, FaHamburger, FaParking } from "react-icons/fa";

//Custom Components
import List from "../components/List";
import TextCard from "@/components/TextCard";
import SearchBar from "@/components/SearchBar";
import LoadingComponent from "@/components/Loading.component";
import ErrorComponent from "@/components/Error.component";

//Props
import { IconListCardProps } from "@/props/IconListCard.props";
import { LoadingStateProps } from "@/props/LoadingState.props";
import Link from "next/link";


const apiUrl = process.env.NEXT_PUBLIC_RESERVIO_API;

//~~~Overview page of all work places~~~

export default function Home() {

  const { push } = useRouter();

  const [workAreaCards, setWorkAreaCards] = useState<Array<IconListCardProps>>([]);
  const [searchedWorkAreaCards, setSearchedWorkAreaCards] = useState<Array<IconListCardProps>>(workAreaCards);
  const [workPlaces, setWorkPlaces] = useState<Array<PlaceDataProps>>([]);

  const [loadingState, setLoadingState] = useState<LoadingStateProps>("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/place/findAll`);
        const data = await response.json();
        console.log(data);
        if (data.result) {
          setLoadingState("success");
          setWorkPlaces(data.result);
        }
        else
          setLoadingState("error");
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let newWorkPlaceCards: Array<IconListCardProps> = [];
    workPlaces.forEach((workPlace) => {
      let icons = [];
      if (workPlace.features.includes("wifi"))
        icons.push(FaWifi);
      if (workPlace.features.includes("drink"))
        icons.push(FaBeer);
      if (workPlace.features.includes("parking"))
        icons.push(FaParking);
      if (workPlace.features.includes("food"))
        icons.push(FaHamburger);

      let imagePath = "/building-shop.png";
      if (workPlace.category === "restaurant")
        imagePath = "/building-restaurant.png";
      if (workPlace.category === "office")
        imagePath = "/building-office.png";
      if (workPlace.category === "factory")
        imagePath = "/building-factory.png";

      newWorkPlaceCards.push({ image: imagePath, icons: icons, shortText: (workPlace.description) ? workPlace.description : "", title: workPlace.name, onClick: () => { push(`/workPlace/${workPlace._id}`) } })
    })
    setWorkAreaCards(newWorkPlaceCards);
    setSearchedWorkAreaCards(newWorkPlaceCards);
  }, [workPlaces]);

  const searchBarHandler = (searchedTerm: string) => {

    setSearchedWorkAreaCards(workAreaCards.filter((item) => {
      if (item.title.toUpperCase().includes(searchedTerm.toUpperCase()))
        return item;
    }));
  };

  return (

    <div>
      <div className="md:flex block justify-evenly">
        <div className="md:w-[650px] w-full mt-20">
            {
              (loadingState === "pending") ? <LoadingComponent text="Loading work places..." /> :
                <div>
                  <h2>Available work places:</h2>
                  <div className="md:flex block mb-4">
                    <SearchBar placeHolder="Search for work place" onSearch={searchBarHandler}></SearchBar>
                  </div>
                  <List emptyText="No work places were found." items={searchedWorkAreaCards} />
                </div>
            }
        </div>
        <div className="md:max-w-[50%] w-full md:mt-28 lg:ml-24 md:ml-8 border-t-[2px] pt-6 mt-6 md:p-0">

          <TextCard>
            <h3>Don&apos;t have a reservation?</h3>
            <p> You can create one on one of a places from the list. Just click on one of the places from the list and fill up a form. </p>
            <p>We have currently {workPlaces.length} work {(workPlaces.length > 1 || workPlaces.length == 0) ? "places" : "place"} available.</p>
          </TextCard>
          <div className="mt-8">
            <TextCard>
              <h3>Already have a reservation?</h3>
              <p>Did you already made a reservation and want to activate it? Just follow these <Link href="/reservation">instructions.</Link> </p>
            </TextCard>
          </div>
        </div>
      </div>
      <div className="pb-32 border-b-2 border-black"></div>
      <div className="mt-5">
        <TextCard>
          <h1>Reservio: Revolutionizing Workspace Reservations</h1>
          <p>In our fast-paced, digital world, effective time and space management are crucial for productivity and business success. Reservio, an intuitive reservation system, simplifies bookings and space management, catering to freelancers and large corporations alike.</p>

          <h2>What is Reservio?</h2>
          <p>Reservio is an advanced online booking and scheduling platform serving various industries. It helps businesses manage appointments and reservations effortlessly, from beauty salons and fitness centers to coworking spaces and corporate offices.6</p>

        </TextCard>
        <TextCard>
          <div className="md:grid block grid-cols-2 mb-8">
            <div className="md:border-r-2 md:border-black border-transparent">
              <h2>Reserving a Workspace with Reservio</h2>
              <p>Imagine you are a freelance graphic designer looking for a quiet, well-equipped workspace to complete a critical project. With Reservio, finding and booking the perfect spot is a breeze.</p>
              <ol>
                <li><strong>Search and Select:</strong> Log into the Reservio platform and search for available workspaces in your desired location. The system displays a list of options, complete with detailed descriptions, amenities, and real-time availability.</li>
                <li><strong>Book and Confirm:</strong> Choose the workspace that best suits your needs, select the date and time, and proceed to book. You can customize your booking by specifying additional requirements, such as the need for high-speed internet or access to meeting rooms.</li>
                <li><strong>Manage Your Booking:</strong> Once your reservation is confirmed, you will receive an email or SMS notification with all the details. If you need to make any changes, such as adjusting the time or adding extra services, you can do so easily through the Reservio platform.</li>
                <li><strong>Check-In and Enjoy:</strong> On the day of your reservation, simply check in at the workspace using the details provided. Enjoy a productive session in a conducive environment, knowing that everything has been taken care of seamlessly.</li>
              </ol>
            </div>
            <div className="p-2">
              <h2>Key Features of Reservio</h2>
              <ul>
                <li><strong>User-Friendly Interface:</strong> Reservio’s clean, intuitive interface makes it easy for both administrators and clients to navigate. With just a few clicks, users can check availability, book spaces, and manage their reservations.</li>
                <li><strong>Automated Scheduling:</strong> The platform offers automated scheduling features that minimize the need for manual intervention. Notifications and reminders are sent out automatically, reducing no-shows and ensuring that clients are always informed about their appointments.</li>
                <li><strong>Customizable Options:</strong> Reservio allows businesses to customize their booking system according to their unique requirements. This includes setting booking rules, adjusting availability, and tailoring the booking form to capture all necessary information.</li>
                <li><strong>Integration Capabilities:</strong> The system can seamlessly integrate with other tools and platforms such as Google Calendar, Outlook, and various CRM systems. This ensures that your bookings are synchronized across all your devices and platforms, providing a unified and efficient workflow.</li>
                <li><strong>Analytics and Reporting:</strong> With built-in analytics and reporting tools, Reservio provides valuable insights into booking trends, client preferences, and resource utilization. These insights can help businesses make informed decisions and optimize their operations.</li>
              </ul>
            </div>
          </div>


          <h2>Benefits of Using Reservio for Workspace Reservations</h2>
          <ul>
            <li><strong>Efficiency:</strong> Reservio eliminates the hassle of manually searching for and booking workspaces. Its automated processes save time and reduce the likelihood of errors.</li>
            <li><strong>Flexibility:</strong> Whether you need a space for an hour or an entire day, Reservio accommodates your schedule. The platform’s flexibility ensures that you can book the right space for the right amount of time.</li>
            <li><strong>Transparency:</strong> With real-time availability and transparent pricing, you always know what you are getting. There are no hidden fees or last-minute surprises.</li>
            <li><strong>Enhanced Productivity:</strong> By providing a reliable system to manage workspace reservations, Reservio allows you to focus on your work without worrying about logistics.</li>
          </ul>

          <h2>Conclusion</h2>
          <p>Reservio is more than just a reservation system; it is a comprehensive tool designed to enhance efficiency, productivity, and user satisfaction. For freelancers, businesses, and organizations alike, Reservio offers a seamless, customizable solution to manage workspace bookings effectively. With its user-friendly interface, automated scheduling, and powerful analytics, Reservio ensures that you can make the most of your time and resources. Whether you need a quiet desk for a few hours or a fully equipped conference room for a week, Reservio is your go-to platform for all your booking needs.</p>

        </TextCard>
      </div>
    </div>
  )
}
