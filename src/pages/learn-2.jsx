import Head from 'next/head'

import { Footer } from '@/components/Footer'

import { StandardNav } from '@/components/StandardNav'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Stats } from '@/components/dashboard/Stats'
import { Developer } from '@/components/dashboard/Developer'
import { Performance } from '@/components/dashboard/Performance'
import { useEffect } from 'react'
import { Friends } from '@/components/dashboard/Friends'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideNavContent } from '@/components/dashboard/SideNavContents'
import { QuickSettings } from '@/components/dashboard/QuickSetttings'
import { Suggest } from '@/components/dashboard/Suggest'
import { ProgressBar  } from '@tremor/react'
import { LearningModule } from '@/components/learn/LearningModule'

export default function Dashboard() {
    const [open, setOpen] = useState(true)


    /*
    Code to check if onboarding has been complete
  */
    useEffect(() => {
        fetch("api.ctfguide.com/dashboard")
            .then((res) => res.json())

            .then((data) => {
                if (data.onboardingComplete == false) {
                    //      window.location.replace("http://localhost:3000/onboarding?part=1")
                }
            }
            )
        //  .catch((error) => window.location.replace("http://localhost:3000/onboarding?part=1"))
    }, [])

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ami`)
        .then((response) => response.json())
        .then((data) => setLoggedIn(data))
        .catch((error) => {
            console.log(error)
        });
    }, []);

    return (
        <>
            <Head>
                <title>Learn - CTFGuide</title>
                <meta
                    name="description"
                    content="Cybersecurity made easy for everyone"
                />
                <style>
                    @import url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
                </style>
            </Head>
            <StandardNav />
            <main>
                <div className="w-full" style={{ backgroundColor: "#212121" }}>
                    <div className="flex mx-auto text-center h-28 my-auto">
                        <h1 className='text-4xl text-white mx-auto my-auto font-semibold'>Learn</h1>
                    </div>
                </div>
                {<div className="rounded-md bg-[#3B82F6] hover:bg-[#468dff]">
                    <a href="/login">
                        <div className="flex mx-auto text-center h-10 my-auto">
                            <h1 className='text-lg text-white mx-auto my-auto font-semibold'>Log in to see your progress!</h1>
                        </div>
                    </a>
                </div>}
                <div className='max-w-6xl mx-auto mt-10'>
                <h1 className='text-white text-3xl mb-4 font-semibold mt-6'>Up next for you</h1>   
            <div className="grid grid-cols-2 mt-4 gap-x-6 gap-y-6">

            {/**Up Next Card 1*/}    
            <div className='px-4 py-4 rounded-lg flex bg-[#212121] hover:bg-[#2c2c2c]'> 
                <div className='flex px-0 py-0'>
                    <div className='my-auto pr-4'>
                    <svg className='text-white h-10 w-10' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                </div>

                <div>
                <h1 className='text-white text-2xl font-medium'>Mastery Task</h1>
                <h1 className='text-white text-md italic'>Located in <span className='text-blue-500'>Linux Basics</span></h1>
                    </div>
                </div>
                <div className='ml-auto my-auto px-2'>
                    <a href="../learn/ch1/activity1" className='bg-blue-700 text-lg px-2 py-1 rounded-lg text-white'>Start Task</a>
                </div>

            </div>

            {/**Up Next Card 2*/}
            <div className='px-4 py-4 rounded-lg flex bg-[#212121] hover:bg-[#2e2e2e]'> 
            <div className='flex px-0 py-0'>
            <div className='my-auto pr-4'>
        

            <svg className='text-white h-10 w-10' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>

            </div>
            <div>
            <h1 className='text-white text-2xl font-medium'>What is Linux?</h1>
                <h1 className='text-white text-md italic'>Located in <span className='text-blue-500'>Linux Basics</span></h1>
                </div>
            </div>
            <div className='ml-auto my-auto px-2'>
                <a href="../learn/ch1/preview" className='bg-blue-700 text-lg px-2 py-1 rounded-lg text-white'>Start Task</a>
            </div>
            </div>

                </div>

                    <h1 className='text-white text-3xl mb-4 font-semibold mt-10'>Learning Modules</h1>
                    <div className="grid grid-cols-2 mt-4 gap-x-6 gap-y-6">
                        <LearningModule lessonId={1} title={"Linux Basics"} sections={["What is Linux?", "Command Basics", "Mastery Tasks", "Logging into a Server"]} imgSrc={"https://camo.githubusercontent.com/81045db2ee0ac7dc57a361737aec02c91af299e8122a4b92748b2acb0b0a89d0/687474703a2f2f6a61736f6e6c6f6e672e6769746875622e696f2f67656f5f7061747465726e2f6578616d706c65732f6469616d6f6e64732e706e67"} link={"../learn/ch1/preview"} sectionHrefs={["../learn/ch1/preview", "../learn/ch1/video1", "../learn/ch1/activity1", "../learn/ch1/dynamic1"]}/>
                        <LearningModule lessonId={2} title={"Forensics"} sections={["What is Forensics?", "Cyberchef 101", "Mastery Task", "I spy with my little eyes..."]} imgSrc={"https://camo.githubusercontent.com/f38cb60cf74f6e673504cbde590a1481018dd3bcb83d4307b3f20bb2a4a992f7/687474703a2f2f6a61736f6e6c6f6e672e6769746875622e696f2f67656f5f7061747465726e2f6578616d706c65732f636f6e63656e747269635f636972636c65732e706e67"} link={"../learn/ch1/preview"} sectionHrefs={["../learn/ch1/preview", "../learn/ch1/video1", "../learn/ch1/activity1", "../learn/ch1/dynamic1"]}/>
                        <LearningModule lessonId={3} title={"Cryptography"} sections={["What is Cryptography?", "PKI Introduction", "Knees deep into TLS", "Password Dump"]} imgSrc={"https://camo.githubusercontent.com/2885763d225b252ff5409416061b0fd287b206fed23a6f96fb7bd5e315782579/687474703a2f2f6a61736f6e6c6f6e672e6769746875622e696f2f67656f5f7061747465726e2f6578616d706c65732f63686576726f6e732e706e67"} link={"../learn/ch1/preview"} sectionHrefs={["../learn/ch1/preview", "../learn/ch1/video1", "../learn/ch1/activity1", "../learn/ch1/dynamic1"]}/>     
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
