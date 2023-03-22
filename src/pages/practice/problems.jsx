import Head from 'next/head'
import React, { useState, useEffect } from "react";
import { StandardNav } from '@/components/StandardNav'
import { Footer } from '@/components/Footer'
import { PracticeNav } from '@/components/practice/PracticeNav'
import { ProblemSetCards } from '@/components/practice/GoToCreate'
import ProblemSet from '@/components/practice/ProblemSet'
import { ChallengeCard } from '@/components/create/ChallengeCard';
import { Community } from '@/components/practice/community'
import ProblemSetCard from '@/components/practice/ProblemSetCard';
import Challenge from "@/components/challenge/ChallengeComponent";

export default function ProblemsPage() {
    const [components, setComponents] = useState([]);
    const set = [
        {
            name: "Cryptography",
            description: "Cryptography deals with algorithms to secure info. Encryption/decryption are the foundation of cybersecurity.",
            category: "cryptography"
        },
        {
            name: "Forensics",
            description: "Sometimes, secrets are hidden in plain site. Can you crack these challenges?",
            category: "forensics"
        },
        {
            name: "Web",
            description: "Cryptography deals with algorithms to secure info. Encryption/decryption are the foundation of cybersecurity.",
            category: "web"
        }
    ];

    const [cryptoChallenges, setCryptoChallenges] = useState([]);


    useEffect(() => {
        try {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/challenges")
                .then((response) => response.json())
                .then((data) => {
                    if (result) {
                        const { result } = data;
                        setComponents(result);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });



        } catch {

        }




    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('https://api.ctfguide.com/challenges/type/all');
                // const data = await response.json();
                // setChallenges([...data]);
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/challenges?category=cryptography');
                const { result } = await response.json();

                setCryptoChallenges([...result]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const filterData = (category) => {
        return components.filter(component => {
            return component.category.some(categoryName => {
                return categoryName.toLowerCase() === category.toLowerCase();
            })
        });
    }

    const badgeColor = {
        'easy': 'bg-[#28a745] text-[#212529] ',
        'medium': 'bg-[#f0ad4e] text-[#212529] ',
        'hard': 'bg-[#dc3545] ',
    }

    const borderColor = {
        'easy': 'border-[#28a745] text-[#212529] ',
        'medium': 'border-[#f0ad4e] text-[#212529] ',
        'hard': 'border-[#dc3545] ',
    }


    return (
        <>
            <Head>
                <title>Problem Sets - CTFGuide</title>
                <meta
                    name="description"
                    content="Practice Problems"
                />
                <style>
                    @import url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
                </style>
            </Head>
            <StandardNav />
            <main>
                <div className=" w-full " style={{ backgroundColor: "#212121" }}>
                    <div className="flex mx-auto text-center h-28 my-auto">
                        <h1 className='text-4xl text-white mx-auto my-auto font-semibold'>Problem Sets</h1>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <div className="w-full md:w-1/5 flex md:h-screen max-w-7xl md:mx-auto md:justify-center px-8 md:px-16">
                        <PracticeNav />
                    </div>
                    <div className='w-full md:w-4/5 px-8 xl:px-16 border-l border-gray-800'>
                        <div className='w-3/4'>
                            <ProblemSetCards />
                        </div>
                        {set.map((setInfo, index) => (
                            <div key={index} className="rounded-lg overflow-hidden shadow-lg mb-16 mr-4 border-2 border-[#323232]">
                                <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-100">{setInfo.name}</h2>
                                <p className="text-gray-200 text-center mt-2 py-2">{setInfo.description}</p>
                                <div className='border border-2 border-[#212121]'>
                                    <ProblemSetCard categoryName={setInfo.category}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
