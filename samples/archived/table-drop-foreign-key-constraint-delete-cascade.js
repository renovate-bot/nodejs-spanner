// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// sample-metadata:
//  title: Drops a foreign key constraint with delete cascade action
//  usage: node table-drop-foreign-key-constraint-delete-cascade.js <INSTANCE_ID> <DATABASE_ID> <PROJECT_ID>

'use strict';

function main(instanceId, databaseId, projectId) {
  // [START spanner_drop_foreign_key_constraint_delete_cascade]

  // Imports the Google Cloud client library
  const {Spanner} = require('@google-cloud/spanner');

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'my-project-id';
  // const instanceId = 'my-instance-id';
  // const databaseId = 'my-database-id';

  // Creates a client
  const spanner = new Spanner({
    projectId: projectId,
  });

  // Gets a reference to a Cloud Spanner instance and a database. The database does not need to exist.
  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);

  async function dropForeignKeyConstraintDeleteCascade() {
    const [operation] = await database.updateSchema([
      `ALTER TABLE ShoppingCarts
      DROP CONSTRAINT FKShoppingCartsCustomerName`,
    ]);

    console.log(`Waiting for operation on ${databaseId} to complete...`);
    await operation.promise();

    console.log(
      'Altered ShoppingCarts table to drop FKShoppingCartsCustomerName',
    );
  }
  dropForeignKeyConstraintDeleteCascade();
  // [END spanner_drop_foreign_key_constraint_delete_cascade]
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
