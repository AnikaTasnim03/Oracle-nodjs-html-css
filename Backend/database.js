const oracledb = require('oracledb');
async function run() {
    let connection;
  
    try {
      // Establish a connection
        connection = await oracledb.getConnection({
        user: 'sys',
        password: 'mist@cse',
        connectString: 'localhost:1521/orcl', // e.g., 'localhost:1521/ORCL'
        privilege: oracledb.SYSDBA
      });
  
      console.log('Connection established!');
  
      // Use the connection for database operations
      // For example:
      
      await connection.execute(`
      BEGIN
      
        DBMS_SNAPSHOT.REFRESH_ALL;
        DBMS_STATS.GATHER_DATABASE_STATS;
      END;
    `);

    console.log('Database refreshed successfully!');
  
    } catch (err) {
      console.error('Error occurred:', err);
    } finally {
      if (connection) {
        try {
          // Close the connection
          await connection.close();
          console.log('Connection closed!');
                const result = await connection.execute('SELECT * FROM students');
        } catch (err) {
          console.error('Error closing connection:', err);
        }
      }
    }
}
module.exports=run,connection;