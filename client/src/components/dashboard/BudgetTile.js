import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import YardzenLogo from '../images/YardzenLogo.png'

const useStyles = makeStyles({
	card: {
		width: "50%",
		borderRadius: '8px',
		boxShadow: 'rgb(0 0 0 / 20%) 2px 2px 7px 1px',
		position: 'fixed',
		margin: '0% 0% 0% 0%',
		left: '50%',
		transform: 'translateX(-50%)',
		background: 'white',
		color: 'black',
		cursor: 'pointer',
		zIndex: 1,
		minWidth: "400px"
	},
	cardContent: {
		padding: '8px 8px 8px 20px'
	},
	cardItems: {
		display: "flex",
		justifyContent: "space-between",
		width: "90%",
		marginLeft: 'auto'
	},
	logo: {
		maxHeight: '58px',
		transform: 'scale(1,1)'
	},
	title: {
		textAlign: 'center',
		color: '#336EBD'
	},
	costRangeDiv: {
		width: "40%",
		marginTop: '-10px'
	},
	costRangeP: {
		marginBottom: '0px'
	},
	cost: {
		marginTop: '2px',
		color: '#336EBD',
		marginBottom: '0px'
	},
	inBudget: {
		margin: 0,
		color: 'green',
		fontWeight: 'bold'
	},
	underBudget: {
		margin: 0,
		color: 'green',
		fontWeight: 'bold'
	},
	overBudget: {
		margin: 0,
		color: 'red',
		fontWeight: 'bold'
	},
	inputDiv: {
		width: "40%"
	},
	button: {
		boxShadow: 'rgba(0, 0, 0, 0.01) 0px 1px 0px -2px',
		background: 'black',
		color: 'white',
		fontSize: '11px',
		cursor: 'pointer',
		letterSpacing: '0.5px',
		borderStyle: 'none',
		padding: '8px 12px',
		borderRadius: '2px',
		margin: '8px 0px'
	}
})

const BudgetTile = ({ low, high, prepareState, budget, pressButton }) => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	const classes = useStyles();

	return (
		<div className={classes.card}>
			<div className={classes.cardContent}>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<img className={classes.logo} src={YardzenLogo} alt="Home" />
				</div>
				<p className={classes.title}>Welcome To Your Yardzen Budget Calculator. Please Enter Your Budget and Select Items</p>
				<div className={classes.cardItems}>
					<div className={classes.inputDiv}>
						<label htmlFor="Budget">Budget</label>
						<input id="Budget" type='number' style={{ height: "34px" }} onChange={(e) => prepareState(e)}></input>
					</div>
					<div className={classes.costRangeDiv}>
						<p className={classes.costRangeP}>Cost Range</p>
						<p className={classes.cost}>
							{formatter.format(low / 100) + ' - ' + formatter.format(high / 100)}
						</p>
						{budget === 0 ? null
							: budget > (low / 100) && budget < (high / 100) ?
								<p className={classes.inBudget}>In Budget</p>
								: budget < (low / 100) ?
									<p className={classes.underBudget}>Under Budget</p>
									: budget > (high / 100) ?
										<p className={classes.overBudget}>Over Budget</p>
										: null
						}
					</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button className={classes.button} onClick={() => pressButton()}>Save Items</button>
				</div>
			</div>
		</div>

	)
}

export default BudgetTile