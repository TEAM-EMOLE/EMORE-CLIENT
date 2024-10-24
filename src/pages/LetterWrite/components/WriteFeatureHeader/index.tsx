import React from 'react';
import SaveIcon from '../../assets/SaveIcon';
import StorageIcon from '../../assets/StorageIcon';
import useWriteLetter from '../../hooks/useWriteLetter';

function WriteFeatureHeader({
  handleToStorage,
  handleOnSave,
}: {
  handleToStorage: ReturnType<typeof useWriteLetter>['handleToStorage'];
  handleOnSave: ReturnType<typeof useWriteLetter>['handleOnSave'];
}) {
  return (
    <div className="flex justify-end gap-6 py-4">
      <button onClick={handleToStorage} className={`flex text-gray-400 items-center gap-1`}>
        <StorageIcon />
        보관함
      </button>
      <button onClick={handleOnSave} className={`flex text-gray-400 items-center gap-1`}>
        <SaveIcon />
        저장하기
      </button>
    </div>
  );
}

export default React.memo(WriteFeatureHeader);
