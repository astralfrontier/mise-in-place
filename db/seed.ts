import { db, Food, FoodTags, Tag, TagImplies } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Tag).values([
    { id: 1, name: "Wheat", description: "Contains wheat" },
    { id: 2, name: "Gluten", description: "Contains gluten" },
    { id: 3, name: "Dairy", description: "Lactose" }
  ])

  await db.insert(TagImplies).values([
    { tagid: 1, impliestagid: 2 }
  ])

  await db.insert(Food).values([
    { id: 1, name: "Bread", description: "It's bread" },
    { id: 2, name: "Milk", description: "It's milk" },
    { id: 3, name: "Eggs", description: "It's eggs" },
    { id: 4, name: "Cheeseburger", description: "Combination" }
  ])

  await db.insert(FoodTags).values([
    { foodid: 1, tagid: 1 },
    { foodid: 2, tagid: 3 },
    { foodid: 4, tagid: 1 },
    { foodid: 4, tagid: 3 },
  ])
}
