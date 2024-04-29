# address verifier

## Prerequisites
 - This application requires node v20.12.2 or greater to be installed.
 - Once you have the correct version of node installed you need to run an `npm install` to download the application dependencies.
 - Lastly you'll need to set the environment variables `SMARTY_AUTH_ID` and `SMARTY_AUTH_TOKEN`
with your [Smarty](https://www.smarty.com/) auth ID and auth token.

## Running the application
Once the prerequisites are in place you can run the command t `ts-node src/index.ts {path to csv file}` to run the 
address verifier

## Running the tests
The tests can be executed by running `npm test` there is also a test watcher that runs all the tests 
on file changes available by running `npm run test:watch`.

There is also a `npm run test:nocache` command that runs all the tests without the caching for Smarty responses enabled. 
Be aware this will result in real Smarty API calls being made by the tests. See the testing approach below for more 
information on this cache.

## Approach

### Structure
Reading over the instructions it was clear there are three main concerns in this application

1. Input: Parsing address CSV files
2. Processing: Address verification
3. Output: Formatting address verification results for display

A first class priority is logically separating these concerns. Doing so will make it easier
to understand the application, extend the application, and write simple and readable tests against it. 

### Testing
From a testing perspective I chose to unit test the csv parsing and display formatting as those were explicitly created
as pure functions without side effects to help make unit testing of these easy and 

The address verification piece is more interesting from a testing perspective. The application code I've written for 
address verification is essentially a thin wrapper around Smarty SDK/API calls. I could have unit tested this wrapper
by mocking out the Smarty SDK, but then my tests would have just been proving my code works with the mock behavior I
wrote in my tests. This strategy can work well, but requires you (usually manually) also verify your mocks behavior matches that of the 
real API. 

In similar scenarios, such as tests against a database layer, I would generally write integration tests that test through
the dependency to verify my code actually integrates correctly with the dependency. That would be problematic in this case though
due to limited Smarty API calls.

So instead I chose to implement a test time only memoization layer on top of the call to send a request to Smarty that 
caches the output to the local filesystem. This cache is then committed to version control. This means the first time the test runs it verifies that the code under test 
integrates with the actual Smarty API, but on subsequent runs the memoization layer just returns the cached response thus
limiting the number of API calls being consumed while still validating the code under test. The test suite can also be run 
without this caching by omitting the caching environment variable or deleting the cache folder.

I've also set up the end-to-end test to utilize this caching. 

### Other Notes
- Smarty matches an input address to potentially multiple candidate addresses. Without asking the user to select the
correct address there isn't a trivial way to know which address is correct. So for the purposes of this exercise I've
done the simple thing and just selected the first candidate in every case. 

- Modeling addresses in an exhaustive manner is complicated. A quick look at Smarty's address components object shows 
that. For this exercise I decided to keep address simple and minimal to meet the requirements. It could be extended or 
refactored later if needed.

- For a production level application some better error handling around the user input and Smarty interaction 
would be desirable.