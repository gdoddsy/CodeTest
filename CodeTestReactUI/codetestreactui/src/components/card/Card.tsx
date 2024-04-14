import {
	Card as CardContainer,
    CardHeader,
    CardBody,
    CardFooter,
    CardActions
} from "@progress/kendo-react-layout";
import { 
    HeaderInterface,
    BodyInterface,
    FooterInterface,
    CTAInterface,
    CardInterface
} from './CardInterface';

export function Header(props : HeaderInterface) {
    return ( 
        <CardHeader className="k-hbox" style={{ background: "transparent", paddingBottom: "10px", fontWeight: "600" }}>
            { props.title }
        </CardHeader>
    );
}

export function Body({ children } : BodyInterface) {
    return (  
        <CardBody>
            <>
                { children }
            </>
        </CardBody>
    );
}

export function CTA(props : CTAInterface) {
    return (  
        <CardActions>
            { props.action }
        </CardActions>
    );
}

export function Footer(props : FooterInterface) {
    const baseStyle = {
        position: "absolute" as "absolute",
        bottom: "0",
        left: "0",
        textAlign: "center" as "center",
        width: "100%",
        padding: "25px 0", 
        height: "100px",
        background: "#E32D39", 
        color: "white"
    };

    const styles = {...baseStyle, ...props.style};

    return (
        <CardFooter 
            style={styles}>
            { props.value }
            { props.children }
        </CardFooter>
    );
}

export function Card(props : CardInterface) {
    const baseStyle = {
        position: "relative",
        width: "480px", 
        height: "300px",
        overflow: "hidden", 
        padding: "15px",
        margin: "25px 0",
        border: "2px solid #000"
    };

    const styles = {...baseStyle, ...props.style};

    return (  
        <CardContainer 
            style={styles}>
            { props.children }
        </CardContainer>
    );
}