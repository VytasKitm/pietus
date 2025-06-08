import {
      usersTableModel,
      commentsTableModel,
      dinnersTableModel,
      photosTableModel,
      favoritesTableModel,
      commentsTableConstraints,
      favoritesTableConstraints,
      photosTableConstraints,
      deleteAllTables

} from '../models/databaseModels.js'


async function cleanTables() {
      try {
            await deleteAllTables()
            await dinnersTableModel()
            await usersTableModel()
            await commentsTableModel()
            await photosTableModel()
            await favoritesTableModel()
            await commentsTableModel()
            await commentsTableConstraints()
            await favoritesTableConstraints()
            await photosTableConstraints()
      }
      catch ( error ) {
            console.log(error)
            process.exit(1)
      }
}

export default cleanTables