import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import ItemComponent from './ItemComponent';
import BudgetTile from './BudgetTile';

// const firebaseConfig = {
//   apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
//   authDomain: "yardzen-demo.firebaseapp.com",
//   databaseURL: "https://yardzen-demo.firebaseio.com",
//   projectId: "yardzen-demo",
//   storageBucket: "yardzen-demo.appspot.com",
//   messagingSenderId: "509183652730",
//   appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
// }

const useStyles = makeStyles({
  sectionDropdown: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '1px solid black'
  },
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '1280px'
  },
  section: {
    top: '237px',
    position: 'relative',
    paddingBottom: '50px'
  }
})

const Dashboard = () => {
  const [items, setItems] = useState([])
  const [itemsInBudget, setItemsInBudget] = useState([])
  const [category, setCategory] = useState([])
  const [message, setMessage] = useState(null)
  const [budget, setBudget] = useState(0)
  const [low, setLow] = useState(0)
  const [high, setHigh] = useState(0)
  const [sectionToDisplay, setSectionToDisplay] = useState([])
  const [refresh, setRefresh] = useState(false)

  const classes = useStyles()
  useEffect(async () => {
    document.title = "Dashboard";
    const items = await axios.get(`/api/getItems`)
    // const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);

    // // Get a list of items from your database
    // async function getItems(db) {
    //   const itemsCol = collection(db, 'items');
    //   const itemsSnapshot = await getDocs(itemsCol);
    //   const itemsList = itemsSnapshot.docs.map(doc => doc.data());
    //   return itemsList;
    // }
    // var tempItems = await getItems(db)
    // setItems(tempItems)
    // setCategory([...new Set(tempItems.map(x => x.type))])
    setMessage('Welcome To Your Yardzen Budget Calculator. Please Enter Your Budget and Select Items')
    console.log(items)

  }, [sectionToDisplay])

  const prepareState = (e) => {
    const { value } = e.target;
    setBudget(parseFloat(value))
  }

  const updateBudget = (item) => {
    var tempBudgetArray = itemsInBudget
    if (itemsInBudget.includes(item)) {
      tempBudgetArray = itemsInBudget.filter(x =>
        x.highPrice !== item.highPrice
        && x.lowPrice !== item.highPrice
        && x.name !== item.highPrice
        && x.type !== item.highPrice
      )
      setItemsInBudget(tempBudgetArray)
      setLow(low - item.lowPrice)
      setHigh(high - item.highPrice)
    } else {
      tempBudgetArray.push(item)
      setItemsInBudget(tempBudgetArray)
      setLow(low + item.lowPrice)
      setHigh(high + item.highPrice)
    }
  }

  const displaySection = (section) => {
    console.log(section)
    var tempDisplaySection = sectionToDisplay
    if (tempDisplaySection.includes(section)) {
      tempDisplaySection = tempDisplaySection.filter(x => x !== section)
      setSectionToDisplay(tempDisplaySection)
      setRefresh(!refresh)
    } else {
      tempDisplaySection.push(section)
      setSectionToDisplay(tempDisplaySection)
      setRefresh(!refresh)
    }

  }

  return (
    <div className={classes.container}>
      {/* Input */}
      <BudgetTile
        message={message}
        budget={budget}
        low={low}
        high={high}
        prepareState={prepareState}
      />
      {/* Sections */}
      <div className={classes.section}>
      {category?.map(section => sectionToDisplay.includes(section) ?
        <div key={section}>
          <div className={classes.sectionDropdown} onClick={() => displaySection(section)}>
            <p>{section.split('_').join(' ')}</p>
            <i className="fa fa-caret-up" style={{ marginBottom: 'auto', marginTop: 'auto' }}></i>
          </div>
          {/* Tiles */}
          <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {items.filter(filteredItem => filteredItem.type === section)?.map((item, index) =>
              <ItemComponent
                key1={index}
                item={item}
                itemsInBudget={itemsInBudget.includes(item)}
                updateBudget={updateBudget}
              />
            )}
          </div>
        </div>
        : <div>
          <div className={classes.sectionDropdown} onClick={() => displaySection(section)}>
            <p>{section.split('_').join(' ')}</p>
            <i className="fa fa-caret-down" style={{ marginBottom: 'auto', marginTop: 'auto' }}></i>
          </div>
        </div>
      )}
      </div>
    </div>
  )


}


export default Dashboard
