import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";

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

    const [] = await Category.create(
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
    await mongoose.disconnect();
};

run().catch(console.error);
