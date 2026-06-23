require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function test() {
    await mongoose.connect(process.env.URI);
    console.log('DB connesso');

    // Crea un utente di test
    const user = await User.create({
        name: 'pier',
        email: 'pier@test.com',
        password: 'secret123',
        role: 'admin'
    });

    console.log('Utente creato:', user);

    // Verifica che la password sia hashata
    console.log('Password hashata?', user.password.startsWith('$2b$'));

    // Verifica comparePassword
    const match = await user.comparePassword('secret123');
    console.log('Password corretta?', match);

    await mongoose.connection.close();
}

test().catch(console.error);