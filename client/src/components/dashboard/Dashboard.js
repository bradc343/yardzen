import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import ItemComponent from './ItemComponent';
import BudgetTile from './BudgetTile';
import ResultsPopup from './ResultsPopup';

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
    top: '250px',
    position: 'relative',
    paddingBottom: '50px',
    cursor: 'pointer'
  },
  smallFont: {
    color: '#336EBD',
    fontSize: '10px'
  }
})

const Dashboard = () => {
  const [items, setItems] = useState([])
  const [itemsInBudget, setItemsInBudget] = useState([])
  const [category, setCategory] = useState([])
  const [budget, setBudget] = useState(0)
  const [low, setLow] = useState(0)
  const [high, setHigh] = useState(0)
  const [sectionToDisplay, setSectionToDisplay] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    document.title = "Dashboard";
    async function fetchData() {
      const res = await axios.get(`/api/getItems`)
      setItems(res.data.itemsList)
      setCategory(res.data.categories)
    }
    fetchData();
  }, [sectionToDisplay])

  const prepareState = (e) => {
    const { value } = e.target;
    setBudget(parseFloat(value))
  }

  const updateBudget = (item) => {
    var tempBudgetArray = itemsInBudget
    if (itemsInBudget.includes(item)) {
      tempBudgetArray = itemsInBudget.filter(x => x.uniqueID !== item.uniqueID)
      setItemsInBudget(tempBudgetArray)
      setLow(low - item.lowPrice)
      setHigh(high - item.highPrice)
    } else {
      tempBudgetArray = tempBudgetArray.filter(x => x.type !== item.type)
      tempBudgetArray.push(item)
      setItemsInBudget(tempBudgetArray)
      setLow(tempBudgetArray.map(itemSum => itemSum.lowPrice).reduce((prev, next) => prev + next))
      setHigh(tempBudgetArray.map(itemSum => itemSum.highPrice).reduce((prev, next) => prev + next))
    }
  }

  const displaySection = (section) => {
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

  const pressButton = async () => {
    var array = {
      docs: itemsInBudget
    }
    await axios.post(`/api/addToCollection`, array)
      .then(() => {
        setShowPopup(true)
      })
  }

  const closePopup = () => {
    setShowPopup(false)
    setItemsInBudget([])
    setBudget(0)
    setLow(0)
    setHigh(0)
    setSectionToDisplay([])
  }

  return (
    <div className={classes.container}>
      {showPopup && <ResultsPopup closePopup={closePopup} />}

      {/* Input */}
      <BudgetTile
        budget={budget}
        low={low}
        high={high}
        itemsInBudget={itemsInBudget}
        pressButton={pressButton}
        prepareState={prepareState}
      />
      {/* Sections */}
      <div className={classes.section}>
        {category?.map(section => sectionToDisplay.includes(section) ?
          <div key={section}>
            <div className={classes.sectionDropdown} onClick={() => displaySection(section)}>
              <p>{section.split('_').join(' ')}
                <span className={classes.smallFont}>
                  &emsp;&emsp;&emsp;{'(Select only 1)'}
                </span>
              </p>
              <i className="fa fa-caret-up" style={{ marginBottom: 'auto', marginTop: 'auto' }}></i>
            </div>
            {/* Tiles */}
            <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {items.filter(filteredItem => filteredItem.type === section)?.map(item =>
                <ItemComponent
                  key={item.uniqueID}
                  item={item}
                  itemsInBudget={itemsInBudget}
                  updateBudget={updateBudget}
                />
              )}
            </div>
          </div>
          : <div key={section}>
            <div className={classes.sectionDropdown} onClick={() => displaySection(section)}>
              <p>{section.split('_').join(' ')}
                <span className={classes.smallFont}>
                  &emsp;&emsp;&emsp;{'(Select only 1)'}
                </span>
              </p>
              <i className="fa fa-caret-down" style={{ marginBottom: 'auto', marginTop: 'auto' }}></i>
            </div>
          </div>
        )}

      </div>
    </div>
  )


}


export default Dashboard
