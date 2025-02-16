import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is Required"],
        minLength: 3,
        maxLength: 60,
    },

    price: {
        type : Number,
        required: [true, "Price is Required"],
        min: [0, "Price must be greater than 0"],
    },

    currency: {
        type: String,
        enum: ['INR','USD','EUR','DBP','AED'],
        default: 'INR',
    },

    frequency: {
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
        required: [true, 'Frequency is required']
    },

    category: {
        type: String,
        enum: ['Sports','Entertainment','News','Reality','LifeStyle','Software','Other'],
        required: [true, 'Category is required']
    },

    paymentMethod:{
        type: String,
        required: true,
        trim: [true, 'Method of Payment is required']
    },

    status:{
        type: String,
        enum: ['active','cancelled','expired'],
        default: 'active',
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value < new Date(),
            message: 'Start date must be in the past'
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate()
            },
            message: 'Renewal date must be after the Start Date'
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,    //to optimise the query
        required: true, 
    }
}, {timestamps: true});

// calc renewal date if not provided
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate)
    {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 28,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    if(this.renewalDate < new Date())
    {this.status = 'expired';}

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
