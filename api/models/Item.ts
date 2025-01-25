import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0,
    },
    image: {
        type: String,
        default: null,
        required: [true, 'Image is required'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'Category is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;