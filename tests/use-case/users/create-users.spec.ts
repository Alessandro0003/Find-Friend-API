import { expect, it, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { CreateUsersUseCases } from '@/use-case/users/create-users'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users'

let usersRepository: InMemoryUsersRepository
let sut: CreateUsersUseCases

describe('Register User in Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new CreateUsersUseCases(usersRepository)
    })

    it('should be able to register', async () => {
        
        const { user } =  await sut.execute({
            name: 'Alessandro',
            email: 'ale@example.com',
            password: '123456',
            address: 'Curitiba',
            phone: '(41)99149-5889',
            isAdmin: 'MEMBER'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {

        const { user } =  await sut.execute({
            name: 'Alessandro',
            email: 'ale@example.com',
            password: '123456',
            address: 'Curitiba',
            phone: '(41)99149-5889',
            isAdmin: 'MEMBER'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )
            
        expect(isPasswordCorrectlyHashed).toBe(true)

    })

})
