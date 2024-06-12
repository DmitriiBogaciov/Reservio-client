//Home Page

'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';



import { Fa0 } from "react-icons/fa6";
import { FaBeer, FaWifi } from "react-icons/fa";

//Custom Components
import List from "../components/List";
import TextCard from "@/components/TextCard";
import SearchBar from "@/components/SearchBar";
import LoadingComponent from "@/components/Loading.component";
import ErrorComponent from "@/components/Error.component";

//Props
import { IconListCardProps } from "@/props/IconListCard.props";
import { LoadingStateProps } from "@/props/LoadingState.props";

//Images
import Image from "next/image";

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

      newWorkPlaceCards.push({ image: "/building-factory.png", icons: [FaWifi], shortText: (workPlace.description) ? workPlace.description : "", title: workPlace.name, onClick: () => { push(`/workPlace/${workPlace._id}`) } })
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
      <div className="flex mb-4">
        <SearchBar onSearch={searchBarHandler}></SearchBar>
      </div>
      <div className="flex justify-between">
        <div className="pr-10">
          {
            (loadingState === "pending") ? <LoadingComponent text="Loading work places..." /> :
              <List title={"Choose work area where you want to reserve a work space:"} items={searchedWorkAreaCards} />
          }
        </div>
        <div className="max-w-[50%] mt-28 ml-24">
          <TextCard>
            <h1>Reservio: Revolutionizing Workspace Reservations</h1>
            <p>In today’s fast-paced, increasingly digital world, efficient time management and space utilization have become critical to both personal productivity and business success. One tool that has emerged as a game-changer in this realm is Reservio, an intuitive reservation system designed to streamline bookings and manage spaces effectively. Whether you are a freelancer in need of a quiet workspace or a large corporation looking to optimize meeting room usage, Reservio offers a robust solution tailored to your needs.</p>

            <h2>What is Reservio?</h2>
            <p>Reservio is an advanced online booking and scheduling platform that caters to a variety of industries. It is designed to help businesses manage appointments, reservations, and bookings with ease. From beauty salons and fitness centers to coworking spaces and corporate offices, Reservio simplifies the reservation process, allowing users to focus on what truly matters—providing excellent service and growing their business.</p>

          </TextCard>
        </div>
      </div>
      <div className="mt-5">
        <TextCard>
          <h2>Key Features of Reservio</h2>
          <ul>
            <li><strong>User-Friendly Interface:</strong> Reservio’s clean, intuitive interface makes it easy for both administrators and clients to navigate. With just a few clicks, users can check availability, book spaces, and manage their reservations.</li>
            <li><strong>Automated Scheduling:</strong> The platform offers automated scheduling features that minimize the need for manual intervention. Notifications and reminders are sent out automatically, reducing no-shows and ensuring that clients are always informed about their appointments.</li>
            <li><strong>Customizable Options:</strong> Reservio allows businesses to customize their booking system according to their unique requirements. This includes setting booking rules, adjusting availability, and tailoring the booking form to capture all necessary information.</li>
            <li><strong>Integration Capabilities:</strong> The system can seamlessly integrate with other tools and platforms such as Google Calendar, Outlook, and various CRM systems. This ensures that your bookings are synchronized across all your devices and platforms, providing a unified and efficient workflow.</li>
            <li><strong>Analytics and Reporting:</strong> With built-in analytics and reporting tools, Reservio provides valuable insights into booking trends, client preferences, and resource utilization. These insights can help businesses make informed decisions and optimize their operations.</li>
          </ul>

          <h2>Reserving a Workspace with Reservio</h2>
          <p>Imagine you are a freelance graphic designer looking for a quiet, well-equipped workspace to complete a critical project. With Reservio, finding and booking the perfect spot is a breeze.</p>
          <ol>
            <li><strong>Search and Select:</strong> Log into the Reservio platform and search for available workspaces in your desired location. The system displays a list of options, complete with detailed descriptions, amenities, and real-time availability.</li>
            <li><strong>Book and Confirm:</strong> Choose the workspace that best suits your needs, select the date and time, and proceed to book. You can customize your booking by specifying additional requirements, such as the need for high-speed internet or access to meeting rooms.</li>
            <li><strong>Manage Your Booking:</strong> Once your reservation is confirmed, you will receive an email or SMS notification with all the details. If you need to make any changes, such as adjusting the time or adding extra services, you can do so easily through the Reservio platform.</li>
            <li><strong>Check-In and Enjoy:</strong> On the day of your reservation, simply check in at the workspace using the details provided. Enjoy a productive session in a conducive environment, knowing that everything has been taken care of seamlessly.</li>
          </ol>

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
