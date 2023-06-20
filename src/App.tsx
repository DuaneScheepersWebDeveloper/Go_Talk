import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import { AppStyles } from './components/AppStyles';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultList from './components/DefaultList';
import FavoritesList from './components/FavoritesList';
import { useFavoriteEpisodes } from './handlers/favoritesHandler';

const App: React.FC = () => {
  const { favoriteEpisodes, toggleFavorite } = useFavoriteEpisodes();

  return (
    <AppStyles>
      <div className="app">
        <Router>
          <Provider store={store}>
            <AppStyles>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route
                    path="/favorites"
                    element={
                      <FavoritesList
                        favoriteEpisodeIDs={favoriteEpisodes}
                        toggleFavorite={toggleFavorite}
                      />
                    }
                  />
                  <Route path="/" element={<DefaultList />} />
                </Routes>
              </div>
              <Footer />
            </AppStyles>
          </Provider>
        </Router>
      </div>
    </AppStyles>
  );
};

export default App;
