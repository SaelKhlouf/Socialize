import { Fragment } from "react";
import { Icon, Menu } from "semantic-ui-react";
import Calendar from 'react-calendar';

export function ActivitiesListFilters(){
    const handleItemClick = () => console.log();

    return (
        <Fragment>
            <Menu pointing vertical fluid style={{marginTop: '10%'}}>
                <Menu.Item style={{borderBottom: '50', color: 'teal', fontWeight: 'bold'}}> 
                    <Icon name="filter" />
                        Filters 
                    
                </Menu.Item>

                <Menu.Item
                name='All activities'
                onClick={handleItemClick}
                />

                <Menu.Item
                name={`I'm going`}
                active={true}
                onClick={handleItemClick}
                />

                <Menu.Item
                name={`I'm hosting`}
                onClick={handleItemClick}
                />

            </Menu>

            <Calendar /> 
          
            

        </Fragment>
    )
}