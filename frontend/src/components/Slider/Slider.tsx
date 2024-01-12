import styles from './slider.module.scss';




const Downbar = () => {
    return (
      <div className="downbar">
        <div className="arrowButtons">
          <button onClick={() => {/* Logika obsługi przewijania w lewo */}}>←</button>
          <button onClick={() => {/* Logika obsługi przewijania w prawo */}}>→</button>
        </div>
  
        <div className="pageMenu">
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            {/* Dodaj więcej opcji według potrzeb */}
          </select>
        </div>
      </div>
    );
  };
  
  export default Downbar;