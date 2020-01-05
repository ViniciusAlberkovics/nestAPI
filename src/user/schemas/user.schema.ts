import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    imgProfile: String,
    name: String,
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin', 'others'],
    }]
});