import { styled } from 'styled-components';
export const AppStyles = styled.div`
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
`;
export const NavbarStyles = styled.nav`
  background-color: #1e1e20;
  padding: 5px 0;
  box-shadow: #31c48d;
  width: 100%;
  h2 {
    color: white;
  }
  h2 span {
    color: yellow;
  }
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .navbar-logo {
    height: 90px;
    border-radius: 100%;
    cursor: pointer;
  }
`;
export const ShowPodcastStyles = styled.div`
  /* ShowList Display */

  .show-list-container {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 20px);
  }

  .show-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .show-card {
    display: flex;
    flex-direction: column;

    border: 1px solid #f5f5f5;
    border-radius: 5px;
    padding: 10px;

    max-width: 200px;
  }

  .show-image {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .show-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
  }

  .show-description {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .show-seasons {
    font-size: 12px;
    display: inline-block;
    padding: 4px 8px;
    background-color: #fff;
    color: #000;
    border-radius: 16px;
    margin-bottom: 5px;
  }

  .load-more-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  /* Genres */
  .genre-container {
    display: inline-block;
    position: relative;

    padding: 5px;
    border-radius: 4px;
  }

  .genre-label {
    position: absolute;

    top: -8px;
    left: 8px;
    padding: 0 4px;
    font-size: 12px;
    font-weight: bold;
  }

  .genre-pill {
    font-size: 12px;
    display: inline-block;
    padding: 4px 8px;
    background-color: #3d3d3d;
    color: #ffffff;
    border-radius: 16px;
    margin-bottom: 0px;
    margin-right: 4px;
    cursor: pointer;
    margin: 2px;
  }

  .genre-pill:last-child {
    margin-right: 0;
  }

  .genre-list {
    display: flex;
    flex-wrap: wrap;
  }

  .show-genres {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .last-updated {
    font-size: 10px;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-top: 20px;
  }

  form {
    display: flex;
    justify-content: center;
    margin: 20px;
  }

  form input {
    width: 80%;
    padding: 10px;
  }
  .filter-input {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .filter-input::placeholder {
    color: #999;
  }

  .filter-input:focus {
    outline: none;
    border-color: #31c48d;
    box-shadow: 0 0 5px rgba(49, 196, 141, 0.5);
  }
  .genre-filter {
    justify-content: center;
    text-align: center;
  }
`;
export const SeasonsStyles = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .season-selector label {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
    margin-right: 1rem;
  }

  select {
    position: relative;
    width: 310px;

    background-color: #31c48d;
    color: #fff;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z' fill='%23fff' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 25px;
    padding: 0.5rem;
    border: none;
  }
`;
export const SinglePodcastStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;

  .episode-number-pill {
    font-size: 10px;
    display: inline-block;
    padding: 4px 8px;
    background-color: #fff;
    color: #000;
    border-radius: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .show-title {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .show-description {
    font-size: 16px;
    margin-bottom: 20px;
    color: #fff;
  }

  .single-show-image {
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
  }

  .season-selector {
    margin-bottom: 20px;
  }

  select {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background-color: #31c48d;
    color: #fff;
    cursor: pointer;
  }

  .selected-season-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .episode-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;

    overflow: hidden;
  }

  .episode-item {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #444;
  }

  .episode-title {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .episode-description {
    font-size: 14px;
    color: #fff;
  }

  .go-back-btn {
    margin: 25px 0px 20px 0px;
    font-size: 16px;
    border: none;
    background-color: dodgerblue;
    color: #fff;
  }
  .load-more-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .favorite-icon {
    color: pink;
    cursor: pointer;
  }
  .favourite-icon {
    color: pink;
    cursor: pointer;
  }
  /* LOADING SPINNER */

  .loading-spinner {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-top: 20px;
  }
`;
export const PodcastPlayerStyles = styled.div`
  .audio-loader {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #1b1b1b;
    padding: 5px;
    z-index: 9999;
  }

  .audio {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #1b1b1b;
    padding: 5px;
  }

  .audio audio {
    width: 100%;
    max-width: 100%;
  }
  .player-container {
  }
`;
export const FooterStyles = styled.footer`
  /* FOOTER */

  background-color: #1e1e20;
  padding: 50px 0;

  text-align: center;
  width: 100%;

  .footer-extra {
    font-size: 13px;
  }
`;
export const ShowFavoritePodcastStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .form-container {
    margin: 20px;
  }
  .favourite-icon {
    color: pink;
    cursor: pointer;
  }
  .single-show-image {
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
  }

  .loading-spinner {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-top: 20px;
  }
`;
