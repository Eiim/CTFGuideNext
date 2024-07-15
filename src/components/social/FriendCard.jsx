import React from 'react';
import { CardDecorator } from '../design/CardDecorator';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { Tooltip } from 'react-tooltip';

const FriendCard = ({ data }, mutual) => {
  const {
    username,
    profileImage,
    bannerImage,
    location,
    leaderboardNum,
    followedBy,
    role,
  } = data;

  const pfp =
    profileImage ||
    `https://robohash.org/${username}.png?set=set1&size=150x150`;
  const banner =
    bannerImage ||
    'https://images.unsplash.com/photo-1633259584604-afdc243122ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const proUser = role !== 'USER';
  const followers = followedBy.length;

  console.log(role);

  return (
    <Link href={`/users/${username}`} passHref>
    <div className="flex flex-1">
      <div className="group relative h-36 w-96 cursor-pointer overflow-hidden rounded-sm border border-gray-900 shadow-2xl hover:border-gray-500">
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${banner})`,
            backgroundPosition: 'center',
            filter: 'blur(0px)',
          }}
          className="object cover absolute inset-0 transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="group-hover:blur-xs absolute inset-0 bg-black bg-opacity-40 transition duration-500 group-hover:bg-opacity-60" />
        <div className="relative p-4 ">
          {/* TOP ROW */}
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              {/* Profile Picture */}
              <img className="h-14 w-14 rounded-full" src={pfp} alt="" />
              {/* To left of pfp */}
              <div>
                {/* top row */}
                <div className="flex gap-x-2">
                  {/* Flag */}
                  {/* <img
                      src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png"
                      alt="American Flag"
                      className="mt-2.5 h-5 w-7 rounded-md"
                    /> */}
                  <div
                    data-tooltip-id="location"
                    data-tooltip-content={location}
                    data-tooltip-place="left">
                    <i class="fas fa-globe-americas ml-2 mt-0.5 py-2 text-lg text-white hover:text-gray-400"></i>
                    <Tooltip className="" id="location" />
                  </div>
                  {/* Friend Icon */}
                  {mutual ? (
                    <div
                      data-tooltip-id="mutual"
                      data-tooltip-content="Mutuals!"
                      data-tooltip-place="right"
                    >
                      <i class="fas fa-user-friends ml-2 mt-0.5 py-2 text-lg text-white hover:text-gray-400">
                        {' '}
                      </i>
                      <Tooltip className="" id="mutual" />
                    </div>
                  ) : (
                    <div
                      data-tooltip-id="follower"
                      data-tooltip-content="Follower!"
                      data-tooltip-place="right"
                    >
                      <i class="fas fa-user ml-2 mt-0.5 py-2 text-lg text-white hover:text-gray-400">
                        {' '}
                      </i>
                      <Tooltip className="" id="follower" />
                    </div>
                  )}
                  {/* CTFGuide Badge */}
                  {proUser && (
                    <div
                      data-tooltip-id="proUser"
                      data-tooltip-content="CTFGuide Pro!"
                      data-tooltip-place="right"
                    >
                      <img
                        src="https://ctfguide.com/proBadge.png"
                        alt="CTFGuide Badge"
                        className="mt-0.5 h-8 w-8 rounded-md"
                      />
                      <Tooltip className="" id="proUser" />
                    </div>
                  )}
                </div>
                {/* bottom row */}
                {proUser ? (
                  <h1 className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 bg-clip-text text-lg font-bold text-transparent">
                    {username}
                  </h1>
                ) : (
                  <h1 className="text-lg font-bold text-white">{username}</h1>
                )}
              </div>
            </div>
            {/* <button>
              <i class="fas fa-ellipsis-v text-md mt-2 text-white"></i>
            </button> */}
          </div>

          {/* BOTTOM ROW */}
          <div className="mt-4 flex justify-between">
            <div
              className="flex pl-1  text-lg text-white hover:text-gray-400"
              data-tooltip-id="followerCount"
              data-tooltip-content="Followers!"
              data-tooltip-place="right"
            >
              <i class="fas fa-users mt-1"></i>
              <p className="ml-1 font-bold ">{followers}</p>
              <Tooltip className="" id="followerCount" />
            </div>
            <div
              data-tooltip-id="leaderboard"
              data-tooltip-content="Leaderboard Rank!"
              data-tooltip-place="left"
            >
              <p className="text-lg font-bold text-white hover:text-gray-400">
                #{leaderboardNum}
              </p>
              <Tooltip className="" id="leaderboard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
  );
};

export default FriendCard;
