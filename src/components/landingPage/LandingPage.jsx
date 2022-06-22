import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <header className={styles.header}>
      <div>
        <div>
          <div>
            <h1 className={styles.title}>Videogames App</h1>
            <h2>
              A free app for you to keep up to date your information about your
              passion as a gamer
            </h2>
            <Link to="/home">
              <button className={styles.boton}>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingPage;
