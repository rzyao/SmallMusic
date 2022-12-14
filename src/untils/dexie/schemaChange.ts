import Dexie from 'dexie';
async function changeSchema(db: Dexie, schemaChanges: TableSchema) {
  db.close();
  const newDb = new Dexie(db.name);

  newDb.on('blocked', () => false); // Silence console warning of blocked event.

  // Workaround: If DB is empty from tables, it needs to be recreated
  if (db.tables.length === 0) {
    await db.delete();
    newDb.version(1).stores(schemaChanges);
    return await newDb.open();
  }

  // Extract current schema in dexie format:
  const currentSchema = db.tables.reduce((result: any, { name, schema }) => {
    result[name] = [schema.primKey.src, ...schema.indexes.map((idx) => idx.src)].join(',');
    return result;
  }, {});

  console.log('Version: ' + db.verno);
  console.log('Current Schema: ', currentSchema);

  // Tell Dexie about current schema:
  newDb.version(db.verno).stores(currentSchema);
  // Tell Dexie about next schema:
  newDb.version(db.verno + 1).stores(schemaChanges);
  // Upgrade it:
  return await newDb.open();
}

// Open database dynamically:
async function playAround(obj: TableSchema) {
  let db = new Dexie('CleectionList');
  if (!(await Dexie.exists(db.name))) {
    console.log('Db does not exist');
    db.version(1).stores({});
  }
  await db.open();
  console.log('Could open DB');

  // Add a table with some indexes:
  //   db = await changeSchema(db, { friends: 'id, name' });
  db = await changeSchema(db, obj);
  console.log('Could enforce friends table with id and name');

  //   // Add another index in the friends table
  //   db = await changeSchema(db, { friends: 'id, name, age' });
  //   console.log('Could add the age index');

  //   // Remove the age index again:
  //   db = await changeSchema(db, { friends: 'id, name' });
  //   console.log('Could remove age index');

  //   // Remove the friends table
  //   db = await changeSchema(db, { friends: null });
  //   console.log('Could delete friends table');
}
interface TableSchema {
  [name: string]: string | null;
}
export function addNewCleectionList(obj: TableSchema) {
  playAround(obj).catch((err) => console.error(err));
}
