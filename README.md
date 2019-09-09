# The Enrolling Parties CLI

## Configuration

The Command Line Interface (CLI) for this POC is written in Node.js using Inquirer and Commander. The API's work by calling a rest server that runs locally on a port specified by the `EP_CLI_PORT` environment variable.

``` bash
EP_CLI_PORT=6000 npm start
```

## Starting the App

Build the JavaScript from Typescript

```bash
npm build
```

Start the program

```bash
EP_CLI_PORT=6000 npm start
```

## Using the App

The application allows you to sign in as a user representing an administrator at an Enrolling Party. The user that you log in with should match the organisation used by the REST server specified with `EP_CLI_PORT`.

```bash
# Create a CLI for Copenhagen Banking, who's REST server is running on port 6003
EP_CLI_PORT=6000 npm start

```
