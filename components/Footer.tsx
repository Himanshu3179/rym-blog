import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/ContactForm"

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      link: 'https://www.facebook.com',
      icon: <Facebook size={20} color="blue" />
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com',
      icon: <Instagram size={20} color="HotPink" />
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com',
      icon: <Linkedin size={20} color="navy" />
    },
    {
      name: 'Youtube',
      link: 'https://www.youtube.com',
      icon: <Youtube size={20} color="red" />
    },
  ]
  return (
    <div className="flex flex-col md:flex-row gap-10  justify-evenly items-center px-4 md:px-10 py-20 md:py-10
       bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-red-500/50
    ">

      <ContactForm />

      <div className={`flex flex-col justify-between items-center gap-10`}>
        <div className="text-3xl font-semibold text-black">
          Blogging Website
        </div>
        <div className="flex gap-5">
          {/* socialLinks */}
          {socialLinks.map((socialLink, index) => (
            <Link href={socialLink.link} key={index} className="flex items-center p-1 rounded-full bg-neutral-200">
              {socialLink.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer