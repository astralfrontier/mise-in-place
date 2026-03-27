import { db, Food, FoodTags, Tag, TagImplies } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Tag).values([
    { id: 1, name: "Wheat", description: "Contains wheat" },
    { id: 2, name: "Gluten", description: "Contains gluten" }
  ])

  await db.insert(TagImplies).values([
    { tagid: 1, impliestagid: 2 }
  ])

  await db.insert(Food).values([
    { id: 1, name: "Bread", description: "It's bread" }
  ])

  await db.insert(FoodTags).values([
    { foodid: 1, tagid: 1 }
  ])
}
