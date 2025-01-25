import express from "express";
import Item from "../models/Item";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import Category from "../models/Category";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
    const { categoryId } = req.query;

    try {
        const filter = categoryId ? { category: categoryId } : {};

        const items = await Item.find(filter)
            .populate("category", "-_id title")
            .populate("user", "-_id displayName, phoneNumber");

        if (!items.length) {
            res.status(404).send('No items found')
            return;
        }

        res.send(items);
    } catch (e) {
        next(e);
    }
});



itemsRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id)
            .populate("category", "-_id title")
            .populate("user", "-_id displayName phoneNumber ");

        if (!item) {
            res.status(404).send('Item not found');
            return
        }

        res.send(item);
    } catch (e) {
        next(e);
    }
});



itemsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;


    try {
        const { title, description, price, category } = req.body;
        if (!title || !description || !price || !category) {
            res.status(400).send({ message: 'All fields are required' });
            return;
        }

        const foundCategory = await Category.findById(category);
        if (!foundCategory) {
            res.status(404).send({ message: 'Category not found' });
            return;
        }

        const newItem = {
            title,
            description,
            price,
            category,
            user: user._id,
            image: req.file ? 'images/' + req.file.filename : null
        };

        const item = new Item(newItem);
        await item.save();

        res.status(201).send(item);
    } catch (e) {
        next(e);
    }
});


itemsRouter.delete('/:id', auth, async (req, res, next) => {
    const { id } = req.params;

    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        const item = await Item.findById(id);
        if (!item) {
            res.status(404).send({message: 'Item not found'});
            return;
        }

        if (!item.user || item.user._id.toString() !== user._id.toString()) {
            res.status(403).send({message: 'You are not the seller of this item'});
            return;

        }
        await item.deleteOne();
        res.status(200).send({message: 'Item deleted successfully'});
    } catch (e) {
        next(e);
    }
});





export default itemsRouter;