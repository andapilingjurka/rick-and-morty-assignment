import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_CHARACTERS from '../queries/getCharacters';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './Header';

const CharacterList = () => {
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

  if (loading && !filteredData.length) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="filters mb-4 d-flex justify-content-end">
          <div className="d-flex gap-4">
            <div>
              <label>Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
              >
                <option value="">All</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label>Filter by Species:</label>
              <select
                value={filterSpecies}
                onChange={(e) => setFilterSpecies(e.target.value)}
                className="form-select"
              >
                <option value="">All</option>
                <option value="Human">Human</option>
                <option value="Alien">Alien</option>
              </select>
            </div>

            <div>
              <label>Sort by:</label>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="form-select"
              >
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="origin">Origin</option>
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
                <h4>Loading...</h4>
              </div>
            }
            scrollableTarget="scrollableDiv"
            scrollThreshold={1}
          >
          <div className="row mt-2">
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
                    <p><b>Status:</b> {character.status}</p>
                    <p><b>Species:</b> {character.species}</p>
                    <p><b>Gender:</b> {character.gender}</p>
                    <p><b>Origin:</b> {character.origin.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {!hasMore && <h5 className='d-flex justify-content-center align-items-center m-2 ' style={{ height: '100px' }}>No more characters to display.</h5>}
      </div>
    </div>
  );
};

export default CharacterList;
