import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost/api-auth';
mongoose.set('useFindAndModify', true);
mongoose.connect(MONGO_URI || process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(db => console.log('DB Connected'))
.catch(err => console.log(err));