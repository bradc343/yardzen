import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    card: {
        width: "400px",
        borderRadius: '8px',
        boxShadow: 'rgb(0 0 0 / 20%) 2px 2px 7px 1px',
        position: 'relative',
        margin: '.5rem 0 1rem 0',
        background: 'white',
        color: 'black',
        cursor: 'pointer',
        fontSize: '14px'
    },
    selectCard: {
        width: "400px",
        borderRadius: '8px',
        boxShadow: 'rgb(0 0 0 / 20%) 2px 2px 7px 1px',
        position: 'relative',
        margin: '.5rem 0 1rem 0',
        width: "400px",
        background: '#616060',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px'
    },
    cardContent: {
        padding: '8px 8px 8px 20px'
    },
    cardItems: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    }
})

const ItemComponent = ({ item, updateBudget, key1, itemsInBudget }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
    const classes = useStyles();
    return (
        <div className={itemsInBudget ? classes.selectCard : classes.card} key={key1} onClick={() => updateBudget(item)}>
            <div className={classes.cardContent}>

                <div className={classes.cardItems}>
                    <div style={{ width: "48%" }}>
                        <p>Name: <span>{item.name}</span></p>
                        <p>Low Price: <span>{formatter.format(item.lowPrice/100)}</span></p>
                        <p>High Price: <span>{formatter.format(item.highPrice/100)}</span></p>
                    </div>
                    <div style={{ width: "48%" }}>
                        Image Coming soon...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemComponent