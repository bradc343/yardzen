const { initializeApp } = require('firebase/app');
// import { initializeApp } from 'firebase/app';
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite')
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
    authDomain: "yardzen-demo.firebaseapp.com",
    databaseURL: "https://yardzen-demo.firebaseio.com",
    projectId: "yardzen-demo",
    storageBucket: "yardzen-demo.appspot.com",
    messagingSenderId: "509183652730",
    appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
}
module.exports = router => {
    router.getAsync('/getItems', async (req, res) => {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Get a list of items from your database\
        const itemsCol = collection(db, 'items');
        const itemsSnapshot = await getDocs(itemsCol);
        const itemsList = itemsSnapshot.docs.map(doc => doc.data());
        console.log(itemsList)
        // setItems(itemsList)
        // setCategory([...new Set(tempItems.map(x => x.type))])
        res.json({
            itemsList: itemsList
        })
    });
    router.postAsync('/findService', async (req, res) => {
        const coords = req.body;
        try {
            let serviceRes = []
            // const serviceRes = await executeStoredProc('CoordinateTestSEL', [
            //     { name: 'Latitude', type: TYPES.Real, value: coords.lat },
            //     { name: 'Longitude', type: TYPES.Real, value: coords.lng }
            // ])

            res.json({
                serviceRes
            })
        } catch (error) {
            console.log(error)

            res.status(500).json({ error: error.message })
        }
    });
}