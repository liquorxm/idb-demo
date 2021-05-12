import { message } from 'antd';

interface IndexedDBSetProps {
  dbName: string;
  storeName: string;
  key: string;
  value: string;
}

interface IndexedDBGetProps {
  dbName: string;
  storeName: string;
  key: string;
}
/**
 * 将 request 变为 Promise 对象
 * 操作成功 resolve
 * 操作失败 reject
 * @param request
 */
export const promisifyRequest = <T = undefined>({
  request,
  onSuccess,
  onError,
}: {
  request: IDBRequest<T>;
  onSuccess?: (e: Event, result: T) => void;
  onError?: (e: Event, error: DOMException | null) => void;
}): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = (e) => {
      resolve(request.result);
      onSuccess && onSuccess(e, request.result);
    };
    request.onerror = (e) => {
      reject(request.error);
      onError && onError(e, request.error);
      message.error(`插入失败`);
    };
  });
};

export const createStore = async ({
  dbName,
  storeName,
  onSuccess,
  onError,
}: {
  dbName: string;
  storeName: string;
  onSuccess?: (e: Event, result: T) => void;
  onError?: (e: Event, error: DOMException | null) => void;
}) => {
  // 打开/创建数据库
  const request = indexedDB.open(dbName);

  // 链接/新建数据库
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);

  // 将 request Promisify，解决回调地狱的问题
  const db = await promisifyRequest({
    request,
    onSuccess,
    onError,
  });

  // 第一个参数为事务的模式，第二个参数为开发者的回调
  return async (
    txMode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => void,
  ) => {
    // 增、删、改、查都用事务处理，需要的入参有：
    // storeName：操作对象，txMode：事务模式
    return callback(db.transaction(storeName, txMode).objectStore(storeName));
  };
};

export const indexedDBSet = async (props: IndexedDBSetProps) => {
  const { dbName, storeName, key, value } = props;
  const storeFun = await createStore({
    dbName,
    storeName,
    onSuccess: (e, result) => {
      message.success(`插入${key}成功！`);
    },
    onError: (e, error) => {
      message.error(`插入${key}成功！`);
    },
  });
  await storeFun('readwrite', (store: IDBObjectStore) => {
    // 插入数据
    store.put(value, key);
  });
};

export const indexedDBGet = async (props: IndexedDBGetProps) => {
  return new Promise(async (resolve, reject) => {
    let value;
    const { dbName, storeName, key } = props;
    const storeFun = await createStore({
      dbName,
      storeName,
      onSuccess: (e, result) => {
        message.success(`获取${key}成功！`);
      },
      onError: (e, error) => {
        reject(e);
        message.error(`获取${key}成功！`);
      },
    });
    await storeFun('readwrite', async (store: IDBObjectStore) => {
      // 获取数据
      const idbGet = store.get(key);
      idbGet.addEventListener('success', (e) => {
        value = idbGet.result;
        resolve(value);
      });
    });
  });
};

export const indexedDBDelete = async (props: IndexedDBGetProps) => {
  return new Promise(async (resolve, reject) => {
    let value;
    const { dbName, storeName, key } = props;
    const storeFun = await createStore({
      dbName,
      storeName,
      onSuccess: (e, result) => {
        message.success(`删除${key}成功！`);
      },
      onError: (e, error) => {
        reject(e);
        message.error(`删除${key}成功！`);
      },
    });
    await storeFun('readwrite', async (store: IDBObjectStore) => {
      // 获取数据
      const idbDel = store.delete(key);
      idbDel.addEventListener('success', (e) => {
        resolve(e);
      });
    });
  });
};
