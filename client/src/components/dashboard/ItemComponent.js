import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import fountain1 from '../images/fountain1.jpg'
import tajMahal from '../images/tajMahal.jpg'
import lighting1 from '../images/lighting1.jpg'
import pool1 from '../images/pool1.jpg'
import pavers from '../images/pavers.jpg'
import pool2 from '../images/pool2.jpg'
import redwooddeck from '../images/redwooddeck.jpg'
import bamboo from '../images/bamboo.jpg'
import redwoodfence from '../images/redwoodfence.jpg'
import compositedeck from '../images/compositedeck.jpg'
import lighting2 from '../images/lighting2.jpg'
import gravel1 from '../images/gravel1.jpg'
import fountain2 from '../images/fountain2.jpg'
import turf from '../images/turf.jpg'
import pergola1 from '../images/pergola1.jpg'
import plywoodfence from '../images/plywoodfence.jpg'
import lighting3 from '../images/lighting3.jpg'
import gravel2 from '../images/gravel2.jpg'
import lighting4 from '../images/lighting4.jpg'
import lighting5 from '../images/lighting5.jpg'
import pirateShip from '../images/pirateShip.jpg'

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

const imageArray =
{
    uniqueID_0: fountain1,
    uniqueID_1: tajMahal,
    uniqueID_2: lighting1,
    uniqueID_3: pool1,
    uniqueID_4: pavers,
    uniqueID_5: pool2,
    uniqueID_6: redwooddeck,
    uniqueID_7: bamboo,
    uniqueID_8: redwoodfence,
    uniqueID_9: compositedeck,
    uniqueID_10: lighting2,
    uniqueID_11: gravel1,
    uniqueID_12: fountain2,
    uniqueID_13: turf,
    uniqueID_14: pergola1,
    uniqueID_15: plywoodfence,
    uniqueID_16: lighting3,
    uniqueID_17: gravel2,
    uniqueID_18: lighting4,
    uniqueID_19: lighting5,
    uniqueID_20: pirateShip
}

const ItemComponent = ({ item, updateBudget, itemsInBudget }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const classes = useStyles();
    return (
        <div className={itemsInBudget.filter(x => x.uniqueID === item.uniqueID).length !== 0 ?
            classes.selectCard
            : classes.card} key={item.uniqueID} onClick={() => updateBudget(item)}>
            <div className={classes.cardContent}>

                <div className={classes.cardItems}>
                    <div style={{ width: "48%" }}>
                        <p>Name: <span>{item.name}</span></p>
                        <p>Low Price: <span>{formatter.format(item.lowPrice / 100)}</span></p>
                        <p>High Price: <span>{formatter.format(item.highPrice / 100)}</span></p>
                    </div>
                    <div style={{ width: "48%" }}>
                        <img alt={item.uniqueID} width='178px' height='114px' src={imageArray[item.uniqueID]}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemComponent