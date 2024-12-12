'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error('Usuário não autenticado')
  }
  await db.booking.create({
    data: { ...params, userId: (user.user as { id: string }).id },
  })
  revalidatePath('/barbershops/[id]')
  revalidatePath('/bookings')
}
