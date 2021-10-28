const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, writeBatch, doc } = require('firebase/firestore/lite')

const firebaseConfig = {
    apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
    authDomain: "yardzen-demo.firebaseapp.com",
    databaseURL: "https://yardzen-demo.firebaseio.com",
    projectId: "yardzen-demo",
    storageBucket: "yardzen-demo.appspot.com",
    messagingSenderId: "509183652730",
    appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = router => {
    router.getAsync('/getItems', async (req, res) => {

        // Get a list of items from your database\
        const itemsCol = collection(db, 'items');
        const itemsSnapshot = await getDocs(itemsCol);
        const itemsList = itemsSnapshot.docs.map(doc => doc.data());
        const categories = [...new Set(itemsList.map(x => x.type))]
        var tempItemsList = []
        for (var i = 0; i < itemsList.length; i++) {
            tempItemsList.push({
                ...itemsList[i],
                uniqueID: `uniqueID_${i}`
            })
        }

        res.json({
            categories: categories,
            itemsList: tempItemsList
        })
    });

    router.getAsync('/getResults', async (req, res) => {

        // Get a list of items from your database\
        const itemsCol = collection(db, 'bradciechanowskibudgetresponse');
        const itemsSnapshot = await getDocs(itemsCol);
        const itemsList = itemsSnapshot.docs.map(doc => doc.data());

        res.json({
            itemsList: itemsList
        })
    });

    router.postAsync('/addToCollection', async (req, res) => {
        const { docs } = req.body;

        const batch = writeBatch(db)
        docs.forEach((doc2) => {
            var docRef = collection(db, 'bradciechanowskibudgetresponse');
            var docRef2 = doc(docRef) //automatically generate unique id
            batch.set(docRef2, doc2);
        });

        batch.commit()

        res.json({
            docs
        })
    });

}