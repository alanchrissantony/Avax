import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Facebook, Instagram, Twitter} from "lucide-react";
import {Separator} from "@/components/ui/separator";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-10">
      <div className="mx-auto w-full max-w-screen-xl text-sm">
        <div className="grid grid-cols-2 gap-8 px-4 py-4 md:grid-cols-5">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">Company</h2>
            <ul className="text-white/60 font-medium space-y-3">
              <li>
                <a href="#" className="hover:underline hover:text-white">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Jobs</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">For the Record</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">Communities</h2>
            <ul className="text-white/60 font-medium space-y-3">
              <li>
                <a href="#" className="hover:underline hover:text-white">For Artists</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Developers</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Advertising</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Investors</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Vendors</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">Useful links</h2>
            <ul className="text-white/60 font-medium space-y-3">
              <li>
                <a href="#" className="hover:underline hover:text-white">Support</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Free Mobile App</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">Avax Plans</h2>
            <ul className="text-white/60 font-medium space-y-3">
              <li>
                <a href="#" className="hover:underline hover:text-white">Premium Individual</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Premium Dou</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Premium Family</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Premium Student</a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">Avax Free</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex mt-4 md:mt-0 justify-end space-x-3 rtl:space-x-reverse">

              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/30">
                <Link href="">
                  <Instagram/>
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>

              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/30">
                <Link href="">
                  <Twitter/>
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>

              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/30">
                <Link href="">
                  <Facebook/>
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>

            </div>
          </div>
        </div>

        <Separator className="m-4"/>

        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white/70 sm:text-center font-normal pb-6">
              © {currentYear} Avax AB
            </span>
        </div>
      </div>
    </footer>
  )
}