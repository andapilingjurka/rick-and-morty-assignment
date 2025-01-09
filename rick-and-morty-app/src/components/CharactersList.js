import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_CHARACTERS from '../queries/getCharacters';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './Header';
import Footer from './Footer'; 
import { useTranslation } from 'react-i18next';

const CharacterList = () => {
  const { t, i18n } = useTranslation(); 
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1, status: filterStatus, species: filterSpecies },
  });

  const loadMoreData = () => {
    if (loading || !data?.characters.info.next) return;

    fetchMore({
      variables: {
        page: data.characters.info.next,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        const allResults = [
          ...prevResult.characters.results,
          ...fetchMoreResult.characters.results,
        ];
        setHasMore(fetchMoreResult.characters.info.next !== null);

        return {
          characters: {
            ...fetchMoreResult.characters,
            results: allResults,
          },
        };
      },
    });
  };

  useEffect(() => {
    if (data) {
      const filtered = data.characters.results.filter((character) => {
        return (
          (filterStatus === '' || character.status === filterStatus) &&
          (filterSpecies === '' || character.species === filterSpecies)
        );
      });

      const sorted = [...filtered].sort((a, b) => {
        if (sortKey === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortKey === 'origin') {
          return a.origin.name.localeCompare(b.origin.name);
        }
        return 0;
      });

      setFilteredData(sorted);
    }
  }, [data, filterStatus, filterSpecies, sortKey]);

  if (loading && !filteredData.length) return <p>{t('loading')}</p>;
  if (error) return <p>{t('error')}: {error.message}</p>;

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="filters mb-4 d-flex justify-content-end">
          <div className="d-flex gap-4">
            <div>
              <label>{t('filterByStatus')}</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
              >
                <option value="">{t('all')}</option>
                <option value="Alive">{t('alive')}</option>
                <option value="Dead">{t('dead')}</option>
                <option value="unknown">{t('unknown')}</option>
              </select>
            </div>

            <div>
              <label>{t('filterBySpecies')}</label>
              <select
                value={filterSpecies}
                onChange={(e) => setFilterSpecies(e.target.value)}
                className="form-select"
              >
                <option value="">{t('all')}</option>
                <option value="Human">{t('human')}</option>
                <option value="Alien">{t('alien')}</option>
              </select>
            </div>

            <div>
              <label>{t('sortBy')}</label>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="form-select"
              >
                <option value="">{t('none')}</option>
                <option value="name">{t('name')}</option>
                <option value="origin">{t('origin')}</option>
              </select>
            </div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={filteredData.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
              <h4>{t('loading')}</h4>
            </div>
          }
        >
          <div className="row mt-1 g-4">
            {filteredData.map((character) => (
              <div className="col-md-4 mb-4" key={character.id}>
                <div className="character-card">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="card-img-top character-image"
                  />
                  <div className="card-body-text">
                    <h5 className="card-name">{character.name}</h5>
                    <p><b>{t('status')}:</b> {character.status}</p>
                    <p><b>{t('species')}:</b> {character.species}</p>
                    <p><b>{t('gender')}:</b> {character.gender}</p>
                    <p><b>{t('origin')}:</b> {character.origin.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {!hasMore && <h5 className="d-flex justify-content-center align-items-center m-2">{t('noMoreCharacters')}</h5>}
      </div>
      
      <Footer setLanguage={i18n.changeLanguage} /> 
    </div>
  );
};

export default CharacterList;
