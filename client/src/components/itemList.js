import React from 'react';
import Item from './item';

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.itemsData}
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.itemsData });
    }

    renderItem = (itemData) => {
        return <Item key={itemData._id} itemName={itemData.itemName} />
    };

    render() {
        return (
            <ul>
                {this.state.data.map(item => this.renderItem(item))}
            </ul>
        )
    }
}

export default ItemList;
