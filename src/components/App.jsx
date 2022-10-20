import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchApi } from 'api/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

const errorMessage = 'oops, no images';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, src: '', alt: '' });

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }
    fetchGallery(query, page);
  }, [query, page]);

  const fetchGallery = async (query, page) => {
    try {
      setIsLoading(true);
      const { hits } = await fetchApi(query, page);

      if (hits.length === 0) {
        throw new Error(errorMessage);
      }

      if (page === 1) {
        setImages(hits);
      } else {
        setImages([...images, ...hits]);
      }
    } catch {
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const chengeNameSubmit = query => {
    setQuery(query);
    setPage(1);
    setError(null);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = (src, alt) => {
    setModal({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModal({ isOpen: false, src: '', alt: '' });
  };

  return (
    <>
      <Searchbar onSubmit={chengeNameSubmit} />
      {error && <div>{errorMessage}</div>}
      {isLoading && <Loader />}
      {!error && <ImageGallery images={images} openModal={openModal} />}
      {images.length > 0 && images.length % 12 === 0 && !error && (
        <Button showMore={loadMore} />
      )}
      {modal.isOpen && (
        <Modal closeModal={closeModal} src={modal.src} alt={modal.alt} />
      )}
    </>
  );
};
