import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets/pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {

    public items: Pet[] = []

    async findById(id: string) {
        const pet = this.items.find((item) => item.id === id)

        if (!pet) {
            return null
        }

        return pet
    }
    async create(data: Prisma.PetCreateInput) {
        const pet = {
            id: randomUUID(),
            name: data.name,
            species: data.species,
            breed: data.breed,
            age: data.age,
            description: data.description,
            created_at: new Date(),
        }

        this.items.push(pet)

        return pet
    }
}