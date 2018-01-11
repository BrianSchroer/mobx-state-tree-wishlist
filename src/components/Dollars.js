const Dollars = ({ amount }) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default Dollars;