import React from 'react'

import styles from './Footer.less'

/**
 * 声明
 * @param {number} index 索引值
 */
interface ILogoProps {
    index: number;
}

// Logo 图片
const Logo = (props: ILogoProps): JSX.Element => {
    return (
        <img src={require(`./images/partner-logo${props.index}.png`)} />
    );
};

// SiteMap
const SiteMap = () => {
    return (
        <div className={styles.siteMap}>
            <h3>Bitgame</h3>
            <ul>
                <li>
                    <a href="#" title="Home">Home</a>
                    <a href="#" title="Game">Game</a>
                    <a href="#" title="Match">Match</a>
                    <a href="#" title="Activity">Activity</a>
                </li>
                <li>
                    <a href="#" title="Walkthrough">Walkthrough</a>
                    <a href="#" title="Betting Rules">Betting Rules</a>
                    <a href="#" title="FAQ">FAQ</a>
                </li>
                <li>
                    <a href="#" title="Terms of Use">Terms of Use</a>
                    <a href="#" title="Privacy Policy">Privacy Policy</a>
                    <a href="#" title="Token Disclaimer">Token Disclaimer</a>
                    <a href="#" title="Responsibility">Responsibility</a>
                    <a href="#" title="Statement">Statement</a>
                    <a href="#" title="Self-Exclusion Terms and Conditions">Self-Exclusion Terms and Conditions</a>
                </li>
            </ul>
        </div>
    );
};

// Partner
const Partner = () => {
    const Logos: JSX.Element[] = [];

    for (let i = 1; i < 18; i++) {
        Logos.push(<li key={i}><Logo index={i} /></li>);
    }

    return (
        <section className={styles.partner}>
            <div>
                <h3>Partner</h3>
                <ul>
                    {Logos}
                </ul>
            </div>
        </section>
    );
};

// Partner
const Copyright = () => {
    return (
        <section className={styles.copyright}>
            <ul>
                <li>Copyright 2019 - King of Fortune Island - Max Blue N.V. is owned and operated by Max Blue N.V., a company registered and established under the laws of Curacao and its wholly owned subsidiary, Max Blue Limited, registered address P.O.Box 3421x, Abraham de Veerstraat 9,Curacao. It is licensed and regulated by Gaming Service Provider N.V. under the gaming license 365/JAZ Sub-License GLH-OCCHKTW07010302019.</li>
                <li>Copyright&copy; 2020 Bitgame</li>
            </ul>
        </section>
    );
};

export const Footer = () => {


    return (
        <footer className={styles.footer}>
            <section>
                <SiteMap />
            </section>
            <Partner />
            <Copyright />
        </footer>
    )
} 