import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import * as objects from './schemas/objects'
import * as documents from './schemas/documents'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...Object.values(objects), ...Object.values(documents)])
})
