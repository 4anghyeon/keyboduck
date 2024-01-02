import React from 'react';
import styles from './searchKeyboard.module.css';
import {useState} from 'react';
import {useCallback} from 'react';
import {useKeyboard} from '@/hooks/useKeyboard';
import {ReviewModal} from './ReviewModal';
import {FaSearch} from 'react-icons/fa';

interface SearchKeyboardProps {
  onSelectedKeyboard: (keyboardId: number) => void;
}

interface Keyboard {
  id: number;
  name: string;
}

const SearchKeyboard: React.FC<SearchKeyboardProps> = ({onSelectedKeyboard}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedKeyboard, setSelectedKeyboard] = useState<string | null>(null);
  const [keyboardName, setKeyboardName] = useState<string>('');
  const {data} = useKeyboard();
  const [filteredKeyboardList, setFilteredKeyboardList] = useState(data?.keyboardList || null);

  const clickOpenModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
    setFilteredKeyboardList(data?.keyboardList || null);
    setKeyboardName('');
  }, [isOpenModal, data]);

  const selectKeyboard = (keyboard: Keyboard): void => {
    setSelectedKeyboard(keyboard.name);
    setKeyboardName(keyboard.name);
    onSelectedKeyboard(keyboard.id);
  };
  const nameInputChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyboardName(e.target.value);
  };

  const searchButtonHandler = (): void => {
    const search: string = keyboardName.toLowerCase();
    const filteredList = data?.keyboardList?.filter(keyboard => {
      return keyboard.name.toLowerCase().includes(search);
    });
    setFilteredKeyboardList(filteredList || []);
    setKeyboardName(search);
  };

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleModalContainerClick = (): void => {
    closeModal();
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <p>제품명 {selectedKeyboard && `: ${selectedKeyboard}`}</p>
        {isOpenModal && (
          <div onClick={handleModalContainerClick}>
            <ReviewModal onClickToggleHandler={clickOpenModal}>
              <div onClick={handleModalContentClick} className={styles['modal-comment-container']}>
                <input
                  type="text"
                  value={keyboardName}
                  className={styles['modal-comment']}
                  placeholder="키보드를 검색하세요"
                  onChange={nameInputChangehandler}
                />
                <button onClick={searchButtonHandler}>
                  <FaSearch />
                </button>
              </div>
              <ul className={styles.keyboard}>
                {filteredKeyboardList?.map(keyboard => {
                  return (
                    <li className={styles['select-button']} key={keyboard.id} onClick={() => selectKeyboard(keyboard)}>
                      {keyboard.name}
                    </li>
                  );
                })}
              </ul>
            </ReviewModal>
          </div>
        )}
        <div className={styles['search-wrap']}>
          <button onClick={clickOpenModal}>키보드 종류 검색</button>
        </div>
      </div>
    </div>
  );
};

export default SearchKeyboard;
