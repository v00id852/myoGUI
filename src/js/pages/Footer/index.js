
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clazz from 'classname';

import classes from './style.css';
import Home from './Home';
import Contacts from './Contacts';
import Settings from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle, faTerminal } from '@fortawesome/free-solid-svg-icons';

export default class Footer extends Component {
    render() {
        var pathname = this.props.location.pathname;
        var component = {
            '/': Home,
            '/contacts': Contacts,
            '/settings': Settings,
        }[pathname];

        return (
            <footer className={classes.footer}>
                <nav>
                    <Link
                        className="link"
                        tabIndex="-1"
                        to="/">
                        <span className={clazz({
                            [classes.active]: pathname === '/'
                        })}>
                            <FontAwesomeIcon icon={faBars} color="black" />
                            {/* <i className="icon-ion-android-chat" /> */}
                        </span>
                    </Link>

                    <Link
                        className="link"
                        tabIndex="-1"
                        to="/contacts">
                        <span className={clazz({
                            [classes.active]: pathname === '/contacts'
                        })}>
                            <FontAwesomeIcon icon={faUserCircle} color={'black'} />
                        </span>
                    </Link>

                    <Link
                        className="link"
                        tabIndex="-1"
                        to="/settings">
                        <span className={clazz({
                            [classes.active]: pathname === '/settings'
                        })}>
                            <FontAwesomeIcon icon={faTerminal} color={'black'} />
                        </span>
                    </Link>
                </nav>

                <div className={classes.right}>
                    {
                        React.createElement(component)
                    }
                </div>
            </footer>
        );
    }
}
