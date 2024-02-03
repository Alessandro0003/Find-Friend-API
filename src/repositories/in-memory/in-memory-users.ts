import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {   
    public items: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            address: data.address,
            phone: data.phone,
            isAdmin: data.isAdmin,
            created_at: new Date(),
        }

        this.items.push(user)

        return user
    }


}