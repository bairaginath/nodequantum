var persistence = require('persistencejs');
var persistenceStore = persistence.StoreConfig.init(persistence, { adaptor: 'mysql' });
persistenceStore.config(persistence, 'localhost', 3306, 'nodedb', 'root', 'root');

module.exports=persistenceStore