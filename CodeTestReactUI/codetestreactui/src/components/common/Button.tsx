import { Button as Btn } from '@progress/kendo-react-buttons';
import { ButtonInterface } from './ButtonInterface';

export function Button(props : ButtonInterface) {
    const baseStyle = {
        marginTop: "10px", 
        padding: "7.5px 12.5px", 
        margin: "10px 5px",
        display: "inline-block", 
        backgroundColor: "#403C3C", 
        color: "white"
    };

    const styles = {...baseStyle, ...props.style};

    return (  
        <Btn 
            style={ styles }
            onClick={ props.onClick }
        >{ props.label }
        </Btn>
    );
}