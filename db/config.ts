import { defineDb, defineTable, column } from 'astro:db';

const Tag = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    description: column.text(),
  }
})

const TagImplies = defineTable({
  columns: {
    tagid: column.number({ references: () => Tag.columns.id }),
    impliestagid: column.number({ references: () => Tag.columns.id })
  }
})

const Food = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    description: column.text()
  }
})

const FoodTags = defineTable({
  columns: {
    foodid: column.number({ references: () => Food.columns.id }),
    tagid: column.number({ references: () => Tag.columns.id })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Tag, TagImplies, Food, FoodTags }
});
