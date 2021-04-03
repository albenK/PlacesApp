import React from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group'; // https://reactcommunity.org/react-transition-group/css-transition
import './SideDrawer.css';

const SideDrawer = (props) => {
    /* Here, we're using React portals. A built in way to append
    JSX elements to another html element. In this case, we're appending
    the <aside> element to the div#drawer-hook element. The div#drawer-hook
    element is located within the index.html file. This semantically makes sense
    because the side drawer is an overlay over the whole app and should be rendered
    within the body element. We can apply the same logic for modals and toasters as well!
    */
    const sideDrawerContent = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside onClick={props.onClick} className="side-drawer">{props.children}</aside>
        </CSSTransition>
    );
    return ReactDOM.createPortal(sideDrawerContent, document.getElementById('drawer-hook'));
};

export default SideDrawer;