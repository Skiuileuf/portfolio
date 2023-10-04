import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import ProfilePanel from '@/components/ProfilePanel'
import Education from '@/components/Education'
import Awards from '@/components/Awards'
import Panel from '@/components/Panel'
import ContactButtons from '@/components/ContactButtons'
import { AcademicCapIcon, BeakerIcon } from '@heroicons/react/24/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faGears, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import WorkExperience from '@/components/WorkExperience'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Viziteu Mihai | Software Developer</title>
        <meta name="title" content="Viziteu Mihai | Software Developer" />
        <meta name="description" content="Accounting and Management Information Systems student, Computer Science enthusiast. " />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.viziteumihai.ro/" />
        <meta property="og:title" content="Viziteu Mihai | Software Developer" />
        <meta property="og:description" content="Accounting and Management Information Systems student, Computer Science enthusiast. " />
        <meta property="og:image" content="https://www.viziteumihai.ro/images/garfield1.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.viziteumihai.ro/" />
        <meta property="twitter:title" content="Viziteu Mihai | Software Developer" />
        <meta property="twitter:description" content="Accounting and Management Information Systems student, Computer Science enthusiast. " />
        <meta property="twitter:image" content="https://www.viziteumihai.ro/images/garfield1.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className='pt-16'></div>

      <div className="container mx-auto">
        <ProfilePanel
          left={
            <Panel>
              <Image
                src="/images/profile.png"
                alt="Picture of the author"
                width={200}
                height={200}
                className="rounded-full bg-orange-500 mx-auto"
              />
              <h1 className="text-4xl font-bold">Viziteu Mihai</h1>
              <h2 className="text-3xl font-normal">Software Developer</h2>
              <h2 className="text-2xl font-normal">Accounting and Management Information Systems student, Computer Science enthusiast.</h2>
              <ContactButtons />
            </Panel>
          }
          top={
            <Panel>
              <h1 className="text-4xl font-bold">About me</h1>
              <p className="text-2xl font-normal">
                Student la Facultatea de Contabilitate și Informatică de Gestiune, ASE București.
                Pasionat de informatică, dezvolt software de peste 3 ani.
                Am multiple proiecte personale realizate folosind tehnologii relevante pentru industrie. Majoritatea sunt disponibile pe GitHub. Printre cele mai importante se numara siteul nicoviangi.ro .
              </p>
            </Panel>
          }
          bottom={
            <Panel>
              <h1 className="text-4xl font-bold">Skills</h1>
              <div className="grid grid-cols-3 gap-x-8">
                <div className="flex justify-between align-bottom">
                  <div>Romanian</div>
                  <div className='bg-gray-800 text-gray-100 rounded-full px-2'>Native</div>
                </div>
                <div className="flex justify-between align-bottom">
                  <div>English</div>
                  <div className='bg-gray-800 text-gray-100 rounded-full px-2'>B2</div>
                </div>
              </div>
              <Skills />
            </Panel>
          }
          className='pt-16 gap-2'
        />

        <Panel className='my-4'>
          <div id="projects" style={{ transform: "translateX(-100px)" }}></div>
          <h2 className="text-xl font-semibold mb-2"><FontAwesomeIcon icon={faGears} className='h-6 w-6 inline-block mr-2 align-bottom' />Work Experience</h2>
          <WorkExperience />
        </Panel>

        <Panel className='my-4'>
          <div id="projects" style={{ transform: "translateX(-100px)" }}></div>
          <h2 className="text-xl font-semibold mb-2"><FontAwesomeIcon icon={faGraduationCap} className='h-6 w-6 inline-block mr-2 align-bottom' />Education</h2>
          <Education />
        </Panel>

        <Panel className='my-4'>
          <h2 className="text-xl font-semibold mb-2"><FontAwesomeIcon icon={faAward} className='h-6 w-6 inline-block mr-2 align-bottom' />Awards</h2>
          <Awards />
        </Panel>

        {/* <div id="projects" style={{transform: "translateX(-100)" }}></div> */}
        {/* <Panel className='mt-4 mb-16'> */}
        <Projects />
        {/* </Panel> */}
      </div>
    </>
  )
}
