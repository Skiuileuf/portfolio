import Image from 'next/image'

export default function Navbar () {
    return (
        <nav className="bg-gray-100 p-4 md:p-6 fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/profile.png"
              alt="Picture of the author"
              width={50}
              height={50}
              className="rounded-full bg-orange-500"
            />
            <h1 className="text-2xl md:text-4xl font-bold">Nume Prenume</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-500">About</a>
            <a href="#projects" className="hover:text-blue-500">Projects</a>
            <a href="#" className="hover:text-blue-500">Contact</a>
          </div>
        </div>
      </nav>
    );
}