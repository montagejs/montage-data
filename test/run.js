// Require the Jasmine "specs" defining the test here.
// For maintainability please keep these in alphabetical order.
require("spec/object-descriptor");
require("spec/data-selector");
require("spec/data-provider");
require("spec/data-stream");
require("spec/data-service");

// Execute the tests defined above. This needs to be requested explicitly here
// because the default invocation of jasmine.getEnv().execute() was disabled in
// run.html. See run.html for details.
jasmine.getEnv().execute()
