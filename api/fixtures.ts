import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('items');
    } catch (e) {
        console.log('Collections were not present');
    }

    const user = await User.create(
        {
            username: "test",
            password: "test",
            displayName: "test",
            phoneNumber: "1234567890",
            token: crypto.randomUUID(),
        },
        {
            username: "test1",
            password: "test1",
            displayName: "test1",
            phoneNumber: "12345678901",
            token: crypto.randomUUID(),
        },
    )

    const categories = await Category.create(
        {
            title: "Car",
        },
        {
            title: "Computers",
        },
        {
            title: "Games",
        },
    );

    const items = await Item.create(
        {
            title: "Item",
            description: "Item",
            price: 999,
            image: "fixtures/357736.jpg",
            category: categories[0]._id,
            user: user[0]._id
        },
        {
            title: "Item",
            description: "Item",
            price: 999,
            image: "fixtures/357736.jpg",
            category: categories[1]._id,
            user: user[0]._id
        },
        {
            title: "Item",
            description: "Item",
            price: 999,
            image: "fixtures/357736.jpg",
            category: categories[2]._id,
            user: user[1]._id
        },

    )


    await mongoose.disconnect();
};

run().catch(console.error);
