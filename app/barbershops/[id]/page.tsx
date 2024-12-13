import { ChevronLeftIcon, MapPinIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Header from '@/app/_components/header'
import PhoneItem from '@/app/_components/phone-item'
import ServiceItem from '@/app/_components/service-item'
import { Button } from '@/app/_components/ui/button'
import { db } from '@/app/_lib/prisma'

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1400px]">
        {/* IMAGEM */}
        <div className="relative h-[250px] w-full md:hidden">
          <Image
            alt={barbershop?.name}
            src={barbershop?.imageUrl}
            fill
            className="object-cover"
          />

          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-4"
            asChild
          >
            <Link href="/">
              <ChevronLeftIcon />
            </Link>
          </Button>
        </div>

        {/* TITULO */}
        <div className="border-b border-solid p-5">
          <div className="mb-3 hidden md:flex">
            <Button size="icon" variant="secondary" asChild>
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>
          </div>
          <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
          <div className="mb-2 flex items-center gap-2">
            <MapPinIcon className="text-primary" size={18} />
            <p className="text-sm">{barbershop?.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <StarIcon className="fill-primary text-primary" size={18} />
            <p className="text-sm">5,00 (499 avaliações)</p>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-3 border-b border-solid p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Sobre nós
          </h2>
          <p className="text-justify text-sm">{barbershop?.description}</p>
        </div>

        {/* SERVIÇOS */}
        <div className="space-y-3 border-b border-solid p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Serviços
          </h2>
          <div className="mx-auto grid gap-y-3 md:max-w-screen-md md:grid-cols-2 md:gap-x-3 lg:max-w-screen-lg lg:grid-cols-3 2xl:max-w-screen-2xl 2xl:grid-cols-4">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={JSON.parse(JSON.stringify(barbershop))}
                service={JSON.parse(JSON.stringify(service))}
              />
            ))}
          </div>
        </div>

        {/* CONTATO */}
        <div className="mx-auto max-w-[400px] space-y-3 p-5">
          {barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopPage
