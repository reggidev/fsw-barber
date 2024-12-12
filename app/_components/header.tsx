'use client'

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import SidebarSheet from './sidebar-sheet'
import SignInDialog from './sign-in-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Sheet, SheetTrigger } from './ui/sheet'

const Header = () => {
  const { data } = useSession()
  const pathname = usePathname()
  const handleLogoutClick = () => signOut()

  return (
    <>
      {/* Mobile NavBar */}
      <Card className="md:hidden">
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Link href="/">
            <Image src="/logo.png" height={18} width={120} alt="FSW Barber" />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </CardContent>
      </Card>

      {/* Desktop NavBar */}
      <Card className="hidden md:flex">
        <CardContent className="flex w-full items-center justify-between p-5 px-10">
          <div className="flex items-center gap-2">
            <Link href="/" className="mr-6">
              <Image src="/logo.png" width={120} height={18} alt="FSW Barber" />
            </Link>

            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link
                href="/"
                className={`${pathname === '/' ? 'font-bold text-primary' : ''}`}
              >
                <HomeIcon size={18} />
                Início
              </Link>
            </Button>

            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link
                href="/bookings"
                className={`${pathname === '/bookings' ? 'font-bold text-primary' : ''}`}
              >
                <CalendarIcon size={18} />
                Agendamento
              </Link>
            </Button>
          </div>

          <div className="flex gap-3">
            {data?.user ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={data?.user?.image ?? ''} />
                </Avatar>

                <div>
                  <p className="font-bold">{data.user.name}</p>
                </div>
              </div>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex gap-2">
                      Login
                      <LogInIcon size={14} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <SignInDialog />
                  </DialogContent>
                </Dialog>
              </>
            )}
            {data?.user && (
              <div>
                <Button size="xs" onClick={handleLogoutClick}>
                  <LogOutIcon size={14} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default Header
