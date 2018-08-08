import * as path from 'path'
import { mergeResolvers, fileLoader } from 'merge-graphql-schemas'

const resolversArray = fileLoader(path.join(__dirname, './**/*.resolver.*'))
const resolversMerged = mergeResolvers(resolversArray)

export default resolversMerged
