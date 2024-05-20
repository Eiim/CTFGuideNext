import Head from 'next/head';
import { Footer } from '@/components/Footer';
import { StandardNav } from '@/components/StandardNav';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '@/utils/request';
import General from '@/components/settingComponents/generalPage';
import Sidebar from '@/components/settingComponents/sidebar';

import {
  updatePassword,
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  confirmPasswordReset,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

const STRIPE_KEY = process.env.NEXT_PUBLIC_APP_STRIPE_KEY;

export default function Dashboard() {
  const router = useRouter();

  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const [open, setOpen] = useState(true);
  const [general, setGeneral] = useState(false);
  const [security, setSecurity] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [billing, setbilling] = useState(false);
  const [username, setUsername] = useState('');

  var pfpString = '';
  var pfpChanged = false;

  const auth = getAuth();
  const user = auth.currentUser;


  const handleClick = () => {}
  useEffect(() => {
    const fileInput = document.getElementById('fileInput');

    // set username
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
        try {
          if (document.getElementById('first-name')) {

            setUsername(JSON.parse(this.responseText).username);
          }

        } catch (e) {
          console.log(e);
        }
      }
    });

    xhr.open('GET', `${process.env.NEXT_PUBLIC_API_URL}/account`);
    let token = getCookie();
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.withCredentials = true;
    xhr.send();
  }, []);

  function pfpChange() {
    pfpChanged = true;
  }
  useEffect(() => {
    console.log(router.query.loc);
    if (router.query.loc == 'general' || router.query.loc == undefined) {
      setGeneral(true);
      loadGeneral();
    } else {
      setGeneral(false);
    }

    if (router.query.loc == 'security') {
      setSecurity(true);
    } else {
      setSecurity(false);
    }

    if (router.query.loc == 'billing') {
      setbilling(true);
    } else {
      setbilling(false);
    }

    if (router.query.loc == 'preferences') {
      loadPreferences();
      setPreferences(true);
    } else {
      setPreferences(false);
    }
  }, [router.query]);

  function loadGeneral() {
    if (router.query.loc == 'general' || router.query.loc == undefined) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', function() {
        if (this.readyState === 4) {
          console.log(this.responseText);
          try {
            if (document.getElementById('first-name')) {
              document.getElementById('first-name').value = JSON.parse(
                this.responseText
              ).firstName;
              document.getElementById('last-name').value = JSON.parse(
                this.responseText
              ).lastName;
              document.getElementById('bio').value = JSON.parse(
                this.responseText
              ).bio;
              document.getElementById('url').value = JSON.parse(
                this.responseText
              ).githubUrl;
              document.getElementById('location').value = JSON.parse(
                this.responseText
              ).location;
              document.getElementById('username').value = JSON.parse(
                this.responseText
              ).username;
              document.getElementById('email').value = JSON.parse(
                this.responseText
              ).email;
            }

            if (pfpString == '') {
            } else {
              //  document.getElementById('pfp').src = pfpString;
            }



          } catch (e) {
            console.log(e);
          }
        }
      });

      xhr.open('GET', `${process.env.NEXT_PUBLIC_API_URL}/account`);
      let token = getCookie();
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.withCredentials = true;
      xhr.send();

    }
  }

  function savePreferences() {
    document.getElementById('savePreferences').innerHTML = 'Saving...';

    var data = JSON.stringify({
      FRIEND_ACCEPT: document.getElementById('friend-notif').checked,
      CHALLENGE_VERIFY: document.getElementById('challenge-notif').checked,
    });

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        document.getElementById('savePreferences').innerHTML = 'Save';
      }
    });

    xhr.open('PUT', `${process.env.NEXT_PUBLIC_API_URL}/account/preferences`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    let token = getCookie();
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.withCredentials = true;

    xhr.send(data);
  }
  
  function loadPreferences() {
    // WARNING: For GET requests, body is set to null by browsers.

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
        console.log('PREFFF');
        try {
          if (JSON.parse(this.responseText)[0].value == true) {
            document.getElementById('friend-notif').checked = true;
          }

          if (JSON.parse(this.responseText)[1].value == true) {
            document.getElementById('challenge-notif').checked = true;
          }
        } catch (error) {
          // .alert(error)
        }
      }
    });

    xhr.open('GET', `${process.env.NEXT_PUBLIC_API_URL}/account/preferences`);
    let token = getCookie();
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.withCredentials = true;
    xhr.send();
  }


  return (        
    <>
      <Head>
        <title>User Settings</title>
        <meta
          name="description"
          content="Cybersecurity made easy for everyone"
        />
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
        </style>
      </Head>

      <StandardNav />

      <div className="mx-auto flex max-w-6xl">
          <Sidebar/>
          
          {general && (              
            <div id="general" className="">
                {/*CONTAINING THE BODY OF GENERAL SECTION*/}
                <General/>
            </div>
          )}

         
      </div>

      <Footer />
    </>
  );
}
