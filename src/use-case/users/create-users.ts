import { UsersRepository } from '@/repositories/users/users-repository'
import { hash } from 'bcryptjs'
import { Role, User } from '@prisma/client'

interface CreateUsersUseCaseRequest {
    name: string
    email: string
    password: string
    address: string
    phone: string
    isAdmin: Role
}

interface CreateUsersUseCaseResponse {
    user: User
}


export class CreateUsersUseCases {
    constructor(private usersRepository: UsersRepository){}

    async execute({ name, email, password, address, phone, isAdmin}: CreateUsersUseCaseRequest): Promise<CreateUsersUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
            address,
            phone,
            isAdmin
        })


        return {
            user
        }

    }

    
}
