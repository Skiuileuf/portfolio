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
import { faAward, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Portofoliu Viziteu Mihai</title>
        <meta name="description" content="Portofoliu Viziteu Mihai" />
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
              <h1 className="text-4xl font-bold">Nume Prenume</h1>
              <h2 className="text-3xl font-normal">Title</h2>
              <h2 className="text-2xl font-normal">Accounting and Management Information Systems student, Computer Science enthusiast.</h2>
              <ContactButtons />
            </Panel>
          }
          top={
            <Panel>
              <h1 className="text-4xl font-bold">About me</h1>
              <p className="text-2xl font-normal">
              Menestrel trist, mai aburit ca vinul vechi ciocnit la nuntă, de cuscrul mare dăruit cu pungi, panglici, beteli cu funtă.
              </p>
            </Panel>
          }
          bottom={
            <Panel>
              <h1 className="text-4xl font-bold">Skills</h1>
              <Skills />
            </Panel>
          }
          className='pt-16 gap-2'
        />
        <Panel className='my-4'>
          <h2 className="text-xl font-semibold mb-2"><FontAwesomeIcon icon={faGraduationCap} className='h-6 w-6 inline-block mr-2 align-bottom' />Education</h2>
          {/* <p className="text-gray-700 mb-3">Lorem ipsum</p> */}
          <Education />
        </Panel>

        <Panel className='my-4'>
          <h2 className="text-xl font-semibold mb-2"><FontAwesomeIcon icon={faAward} className='h-6 w-6 inline-block mr-2 align-bottom' />Awards</h2>
          {/* <p className="text-gray-700 mb-3">Lorem ipsum</p> */}
          <Awards />
        </Panel>
        
        {/* <Panel className='mt-4 mb-16'> */}
          <Projects />
        {/* </Panel> */}
      </div>
    </>
  )
}
