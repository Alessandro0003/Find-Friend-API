import { PetsRepository } from '@/repositories/pets/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetsUseCaseRequest {
    name: string
    species: string
    breed: string
    age: string
    description: string
}

interface CreatePetsUseCaseReponse {
    pet: Pet
}

export class CreatePetsUseCase {
    constructor(private petsRepository: PetsRepository){}

    async execute({name,  species,  breed, age, description}: CreatePetsUseCaseRequest): Promise<CreatePetsUseCaseReponse> {
        const pet = await this.petsRepository.create({
            name,
            species,
            breed,
            age,
            description
        })

        return {
            pet
        }
    }
}