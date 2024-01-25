// UpBar.js
import React from 'react';

interface UpBar2Props {
    onSortChange: (value: string) => void;
  }


const UpBar2: React.FC<UpBar2Props> = ({ onSortChange }) => {
  return (
    <div>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Bez sortowania</option>
        <option value="odwiedzoneSpoty">Sortuj wg odwiedzonych spotów</option>
        <option value="obserwujacy">Sortuj wg  obserwujących</option>

        {/* Dodaj więcej opcji sortowania tutaj */}
      </select>
      {/* Możesz dodać więcej elementów UI tutaj, jeśli potrzebujesz */}
    </div>
  );
};

export default UpBar2;
