# Network Impairment Gateway UI

This project is a web-based user interface for the Network Impairment Gateway. It allows users to configure and simulate Disrupted, Disconnected, Intermittent, and Limited (DDIL) network conditions. The UI is built using Angular 18+, providing an intuitive way to control network impairment settings of the [Network Impairment Gateway backend](https://github.com/dewcservices/network-impairment-gateway).

For full end to end usage head over to [cloud-native-edge-ddil-environment](https://github.com/dewcservices/cloud-native-edge-ddil-environment)

## Features

- **Configure Network Profiles**: Easily apply network profiles such as Sat Comm, Broadband, and 4G against various DDIL environments.
- **DDIL Scenarios**: Simulate different network impairments independently for uplink and downlink.
- **Integration**: Designed to work seamlessly with the backend APIs controlling the impairment gateway.
- **Visualization**: Real-time graphs for monitoring network traffic and impairment effects.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Angular CLI (v18 or later)
  - [Node.js compatibility](https://angular.dev/reference/versions)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dewcservices/network-impairment-gateway-ui.git
   cd network-impairment-gateway-ui
   ```

2. Install the dependencies:

```sh
npm install
```

### Running the Development Server

Start the Angular development server:

```sh
ng serve
```

Navigate to http://localhost:4200/ in your web browser. The app will automatically reload if you change any source files.

## Building for Production

To build the project for production, run:

```sh
ng build --prod
```

The build artifacts will be stored in the dist/ directory. Use a web server to serve these files for production deployments.

## Configuration

The UI can be configured using environment variables. Update the environment.ts and environment.prod.ts files for development and production configurations, respectively.

### Example Configuration File

```js
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Set the API URL for backend communication
}
```

## Development

This project uses Angular Material and [Golden Layout](https://github.com/golden-layout/golden-layout) for UI components and [Formly](https://github.com/ngx-formly/ngx-formly) for dynamic forms. Follow these steps to contribute:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Commit your changes with clear messages.
3. Push to your fork and submit a pull request.
