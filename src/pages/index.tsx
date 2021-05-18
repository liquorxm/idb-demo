import { useEffect } from 'react';
import IndexedDBSet from './components/indexedDB/IndexedDBSet';
import IndexedDBGet from './components/indexedDB/IndexedDBGet';
import IndexedDBDelete from './components/indexedDB/IndexedDBDelete';
import IndexedDBClear from './components/indexedDB/IndexedDBClear';

export default function IndexPage() {

  return (
    <div style={{ width: 600, margin: 'auto', overflow: 'auto' }}>
      <div>
        <IndexedDBSet />
        <IndexedDBGet />
        <IndexedDBDelete />
        <IndexedDBClear />
      </div>
    </div>
  );
}
