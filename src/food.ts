import { db, eq, alias, Food, FoodTags, Tag, TagImplies } from "astro:db";

export function queryByFood() {
  const impliedTags = alias(Tag, "impliedTags")
  return db.select()
    .from(Food)
    .leftJoin(FoodTags, eq(FoodTags.foodid, Food.id))
    .leftJoin(Tag, eq(FoodTags.tagid, Tag.id))
    .leftJoin(TagImplies, eq(Tag.id, TagImplies.tagid))
    .leftJoin(impliedTags, eq(TagImplies.impliestagid, impliedTags.id))
}

/*
{
    "Food": {
      "id": 1,
      "name": "Bread",
      "description": "It's bread"
    },
    "FoodTags": {
      "_id": 1,
      "foodid": 1,
      "tagid": 1
    },
    "Tag": {
      "id": 1,
      "name": "Wheat",
      "description": "Contains wheat"
    },
    "TagImplies": {
      "_id": 1,
      "tagid": 1,
      "impliestagid": 2
    },
    "impliedTags": {
      "id": 2,
      "name": "Gluten",
      "description": "Contains gluten"
    }
  },
 */

// TODO: get proper types from Drizzle ORM docs
export function combineFood(food: any) {
  const foodMap: Record<number,any> = {};
  const foodsById = food.reduce(
    (foodMap: any, row: any) => {
      const id = row.Food.id;
      if (!foodMap[id]) {
        foodMap[id] = {...row.Food, tags: []}
      }
      if (row.Tag) {
        foodMap[id].tags.push(row.Tag)
      }
      if (row.impliedTags) {
        foodMap[id].tags.push(row.impliedTags)
      }
      return foodMap;
    },
    foodMap
  )
  return Object.values(foodsById);
}