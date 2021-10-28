import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import ItemComponent from './ItemComponent'

const useStyles = makeStyles({
    popup: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2,
    },
    inner: {
        position: 'absolute',
        left: "9%",
        right: '9%',
        top: '0%',
        bottom: "25%",
        margin: 'auto',
        borderRadius: '20px',
        zIndex: 3
    },
    card: {
        width: '100%',
        minWidth: "400px",
        borderRadius: '8px',
        boxShadow: 'rgb(0 0 0 / 20%) 2px 2px 7px 1px',
        background: 'white',
        color: 'black',
    },
    header: {
        fontSize: '26px',
        padding: '16px',
        textAlign: 'center',
        borderBottom: '1px solid black'
    },
    closeIcon: {
        position: 'absolute',
        top: '45px',
        right: '4px',
        color: 'black',
        cursor: 'pointer'
    }
})

const ResultsPopup = ({ closePopup }) => {
    const [itemsResult, setItemsResult] = useState([])

    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`/api/getResults`)
            setItemsResult(res.data.itemsList)
            console.log(res)
        }
        fetchData();
    }, [])

    const updateBudget = () => {
        console.log('Functionality Coming Soon!')
    }

    return (
        <div className={classes.popup}>
            <div className={classes.inner}>
                <div className={classes.card}>
                    <i className={classes.closeIcon} onClick={() => closePopup()}>X</i>
                    <h1 className={classes.header}>Submitted! Here are your Current and Past items.</h1>
                    {/* Tiles */}
                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column', overflowY: 'scroll' }}>
                        {itemsResult?.map((item, index) =>
                            <ItemComponent
                                key={index}
                                item={item}
                                itemsInBudget={false}
                                updateBudget={updateBudget}
                            />
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ResultsPopup